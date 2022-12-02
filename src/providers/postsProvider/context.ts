import createCtx from '../createCtx';

declare global {
  interface Post {
    email: string,
    pseudo: string,
    profilImg?: string,
  }

  interface Post {
    title: string;
    author: string;
    date: string;
    content: string;
  }

  type PostCtxValue = {
    subscribe: () => Promise<void>;
    unsubscribe: () => Promise<void>
    like: (id: string) => Promise<void>;
    unlike: (id: string) => Promise<void>;
    fetchPosts: () => Promise<void>;
    submitPost: (e: any) => Promise<void>;
    posts: Post[];
  };
}

const { ctx: PostContext, useCtx: usePostContext } = createCtx<PostCtxValue>();

export { usePostContext };
export default PostContext;