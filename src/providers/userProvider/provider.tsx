import React, { useCallback, useState, useEffect } from 'react';
import UserContext from './context';

export interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback((): void => {
  }, []);

  const signup = useCallback(
    async (email: string, password: string, pseudo: string): Promise<boolean> => {
      setUser({
        email,
        pseudo,
      });
      return true;
    },
    []);

  const login = useCallback(async (): Promise<boolean> => {
    setUser({
      email: 'cyril@hotmail.fr',
      pseudo: 'axoloot',
    });
    return true;
  }, []);

  useEffect(() => {
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
