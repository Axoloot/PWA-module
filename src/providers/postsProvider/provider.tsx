import React, { useCallback, useState, useEffect } from 'react';
import base64ToUint8Array from '../../lib/base64ToUint8Array';
import { IPost } from '../../lib/models/Post';
import PostContext from './context';

export interface PostProviderProps {
  children: React.ReactNode;
}

function PostProvider({ children }: PostProviderProps): JSX.Element {
  const [subscription, setSubscription] = useState<PushSubscription | undefined | null>(null);
  const [channel, setChannel] = useState(new BroadcastChannel("notifications"));

  const [subscriptionData, setSubscriptionData] = useState<null | any[]>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [posts, setPosts] = useState([]);

  /*
  **  POSTS
  */
  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function submitPost(post: IPost) {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  }

  /*
  **  LIKES
  */

  async function like(id: string) {
    try {
      const data = {
        ...subscriptionData
      };
      const res = await fetch("/api/posts/" + id + "/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function unlike(id: string) {
    try {
      const data = {
        ...subscriptionData
      };
      const res = await fetch("/api/posts/" + id + "/like", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  }

  /*
  **  SUBSCRIPTIONS
  */
  async function subscribe() {
    try {
      const sub = await registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
      });
      setSubscription(sub);
    } catch (err) {
      console.error(err);
    }
  }

  async function unsubscribe() {
    try {
      if (!subscription) { return; }

      const res = await fetch("/api/subscriptions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
      });
      await subscription.unsubscribe();
      setSubscription(null);
      if (res.ok) {
        setSubscriptionData(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchSubscriptionData() {
    try {
      if (!subscription) { return; }

      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
      });

      if (res.ok) {
        const data = await res.json();
        setSubscriptionData(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /*
  **  HOOKS
  */
  useEffect(() => {
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.getSubscription().then(sub => {
        // if (sub && sub.expirationTime && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
          setSubscription(sub);
        // }
      });
      setRegistration(reg);
    });
    fetchPosts();
    channel.addEventListener("message", event => {
      fetchPosts();
    });
  }, []);

  useEffect(() => {
    fetchSubscriptionData();
  }, [subscription]);


  return (
    <PostContext.Provider value={{
      subscribe,
      unsubscribe,
      like,
      unlike,
      fetchPosts,
      submitPost,
      posts
    }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
