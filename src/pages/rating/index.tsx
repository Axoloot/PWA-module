import Layout from "../../components/layout";
import Article from "../../components/article";
import ArticleList from "../../components/articlesList";
import { usePostContext } from "../../providers/postsProvider";

const Index = () => {
  const { posts } = usePostContext();
  return (
    <Layout menuIndex={2}>
      <ArticleList posts={posts} />
    </Layout>
  )
}

export default Index;
