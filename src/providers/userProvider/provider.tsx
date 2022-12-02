import React, { useCallback, useState, useEffect } from 'react';
import UserContext from './context';
import { signIn, getSession, signOut } from "next-auth/react";
export interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback((): void => {
    signOut();
  }, [signOut]);

  const signup = useCallback(
    async (email: string, password: string, pseudo: string): Promise<boolean> => {
      return true;
    },
    []);

  const login = useCallback(async (email: string, password: string, redirect = true, callback = "/home"): Promise<boolean> => {
    const signin = await signIn("credentials", { email, password, redirect, callback });
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

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();

      if (session?.user) {
        const newUser = session.user as unknown as User;
        console.log(newUser);
        setUser(newUser);
      }
    }
    loadSession();
  }, []);


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
