import { IPost } from "../../lib/models/Post";
import Article from "../article";

const ArticlesList = ({ posts }: { posts: IPost[]}) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
    {posts.map((post: any) => (
      <div style={{ paddingBottom: 20 }}>
        <Article post={post} fav />
      </div>
    ))}
  </div>
);

export default ArticlesList;
