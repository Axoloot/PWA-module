import Layout from "../../components/layout";
import Article from "../../components/article";
import ArticleList from "../../components/articlesList";
import { usePostContext } from "../../providers/postsProvider";

const Index = () => {
  const { posts } = usePostContext();
  const newPost = [...posts];

  return (
    <Layout menuIndex={0}>
      <ArticleList posts={newPost.sort((a, b) => {
        const aLikes = a.likes || 0;
        const bLikes = b.likes || 0;
        return aLikes - bLikes;
      })} />
    </Layout>
  )
}

export default Index;
