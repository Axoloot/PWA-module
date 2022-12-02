import React from 'react';
import createCtx from '../createCtx';

declare global {
  interface User {
    email: string,
    pseudo: string,
    profilImg?: string,
  }

  type UserCtxValue = {
    user: User | null;
    error: string | null;
    isAuthenticated: boolean;
    login: () => Promise<boolean>;
    signup: (email: string, password: string, pseudo: string) => Promise<boolean>;
    logout: () => void;
  };
}

const { ctx: UserContext, useCtx: useUserContext } = createCtx<UserCtxValue>();

export { useUserContext };
export default UserContext;