import React from 'react';
import createCtx from '../createCtx';

declare global {
  interface User {
    id: { type: String, required: true },
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: String
  }
  interface SignUpPayload {
    email: string;
    password: string;
    pseudo: string;
    profilUrl?: string;
  }

  type UserCtxValue = {
    user: User | null;
    error: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, redirect?: boolean, callback?: string) => Promise<boolean>;
    signup: (payload: SignUpPayload) => Promise<boolean>;
    logout: () => void;
  };
}

const { ctx: UserContext, useCtx: useUserContext } = createCtx<UserCtxValue>();

export { useUserContext };
export default UserContext;