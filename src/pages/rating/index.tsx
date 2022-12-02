import Layout from "../../components/layout";
import Article from "../../components/article";
import ArticleList from "../../components/articlesList";

const Index = () => {
  return (
    <Layout menuIndex={2}>
      <ArticleList articles={[
        () => <Article fav={false} />,
        () => <Article fav={true} />,
        () => <Article fav={false} />,
        () => <Article fav={true} />,
        () => <Article fav={false} />,
        () => <Article fav={true} />,
        () => <Article fav={false} />,
        () => <Article fav={true} />,
      ]}
      />
    </Layout>
  )
}

export default Index;
