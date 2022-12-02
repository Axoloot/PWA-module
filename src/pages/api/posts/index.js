import { Subscriptions } from "src/lib/database";
import Post from "../../../lib/models/Post";

import notify from "src/lib/notify";

export default function handler(req, res) {
  try {
    switch (req.method) {
      case ("GET"):
        const posts = Post.find();

        return (res.status(200).json(posts));

      case ("POST"):
        if (!req.body?.subscriber?.keys?.auth) {
          return (res.status(400).json({ error: "Bad Request" }));
        }

        const subscriber = Subscriptions.findOne({ "keys.auth": req.body.subscriber.keys.auth });

        if (!subscriber) {
          return (res.status(404).json({ error: "Subscriber Not Found" }));
        }

        const post = Posts.insert({ subscriber: subscriber, content: req.body?.content, likes: [] });

        notify.notifyAll({ title: "New post from " + subscriber?.keys?.p256dh?.slice(0, 8), message: post.content }, [subscriber]);

        return (res.status(201).json(post));

      default:
        return (res.status(405).json({ error: "Method Not Allowed" }));
    }
  } catch (err) {
    if ("statusCode" in err) {
      return (res.writeHead(err.statusCode, err.headers).json({ error: err.body }));
    } else {
      console.error(err);
      return (res.status(500).end());
    }
  }
};
