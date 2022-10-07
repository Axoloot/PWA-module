const ArticlesList = ({ articles }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', }}>
    {articles.map((Article: any) => (
      <div style={{ paddingBottom: 20 }}>
        <Article />
      </div>
    ))}
  </div>
);

export default ArticlesList;
