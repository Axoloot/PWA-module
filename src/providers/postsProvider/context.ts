import { IPost } from '../../lib/models/Post';
import createCtx from '../createCtx';

declare global {

  type PostCtxValue = {
    subscribe: () => Promise<void>;
    unsubscribe: () => Promise<void>
    like: (id: string) => Promise<void>;
    unlike: (id: string) => Promise<void>;
    fetchPosts: () => Promise<void>;
    submitPost: (post: IPost) => Promise<void>;
    posts: IPost[];
  };
}

const { ctx: PostContext, useCtx: usePostContext } = createCtx<PostCtxValue>();

export { usePostContext };
export default PostContext;