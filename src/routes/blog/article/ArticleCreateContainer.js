// eslint-disable-next-line import/no-cycle
import Layout from "common/Layout";

// Images
import bgImage from "assets/images/city-profile.jpg";

import ArticleForm from "./components/ArticleForm";

function ArticleCreateContainer() {
  return (
    <Layout image={bgImage}>
      <ArticleForm />
    </Layout>
  );
}

export default ArticleCreateContainer;
