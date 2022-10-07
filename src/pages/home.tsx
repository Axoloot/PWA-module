import Layout from "../components/layout";
import Article from "../components/article";
import ArticleList from "../components/articlesList";

const Home = () => (
  <Layout>
    <ArticleList articles={[() => <Article />, () => <Article />]} />
  </Layout>
);

export default Home;
