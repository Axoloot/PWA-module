import Layout from "../../components/layout";
import Article from "../../components/article";
import ArticleList from "../../components/articlesList";
import {useState} from "react";
import {Text} from "@nextui-org/react";

const Index = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  console.log(desc);

  return (
    <Layout menuIndex={-1}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text h4 color="#480048" style={{ marginTop: 100 }}>
          Titre
        </Text>
        <textarea
          className="post-input"
          style={{ width: 200, height: 50 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text h4 color="#480048">
          Description
        </Text>
        <textarea
          className="post-input"
          style={{ width: 400, height: 100 }}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button style={{ backgroundColor: '#380038', cursor: 'pointer', width: 150, height: 40, borderRadius: 5, marginTop: 60 }}>
          <Text h4 color="#F2F2F2" style={{ padding: 0, margin: 0 }}>
            POSTER
          </Text>
        </button>
      </div>
    </Layout>
  )
}

export default Index;
