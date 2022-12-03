import React, { useCallback, useState, useEffect } from 'react';
import UserContext from './context';
import { signIn, getSession, signOut } from "next-auth/react";
import base64ToUint8Array from "../../lib/base64ToUint8Array";
export interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback((): void => {
    signOut();
    setUser(null);
  }, [signOut]);

  const signup = useCallback(
    async (payload: SignUpPayload): Promise<boolean> => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      return !!res;
    },
    [setUser]);

  const login = useCallback(async (email: string, password: string, redirect = true, callbackUrl = "/home"): Promise<boolean> => {
    const signin = await signIn("credentials", { email, password, redirect, callbackUrl });
    if (signin?.ok) {
      const session = await getSession();

      if (session?.user) {
        const newUser = session.user as unknown as User;
        setUser(newUser);
      }
      return true;
    }
    return false;
  }, []);

  const subscribe = async (reg: any) => {
    try {
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
      });
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sub)
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session?.user) {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      }
    }
    loadSession();
  }, []);

  useEffect(() => {
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.getSubscription().then(sub => {
        if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
          
        }
        else {
          subscribe(reg);
        }
      });
    });
  }, [ user ])


  return (
    <UserContext.Provider value={{
      user,
      error,
      isAuthenticated: !!user,
      login,
      logout,
      signup,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
