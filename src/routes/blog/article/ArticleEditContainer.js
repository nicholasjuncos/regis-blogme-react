import { useEffect, useState } from "react";

// React-router-dom components
import { useParams } from "react-router-dom";

// React-redux components
import { useDispatch, useSelector } from "react-redux";

import Layout from "common/Layout";
import Spinner from "common/Spinner";

// Images
import bgImage from "assets/images/city-profile.jpg";

import ArticleForm from "./components/ArticleForm";
import { getBlogPost } from "../reducers/blogReducers";

function ArticleEditContainer() {
  const params = useParams();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const { blogPostID } = params;

  // REDUX
  const dispatch = useDispatch();
  const blogPost = useSelector((state) => state.blogReducer.blogPost);

  useEffect(() => {
    dispatch(getBlogPost(blogPostID));
  }, []);

  return (
    <Layout image={bgImage}>
      {blogPost ? (
        <ArticleForm
          blogID={blogPost.id}
          oldStatus={blogPost.status}
          oldPostDate={blogPost.post_date}
          oldTitle={blogPost.title}
          oldTitleSubText={blogPost.title_sub_text}
          oldSubTitle1={blogPost.subtitle1}
          oldSubTitle2={blogPost.subtitle2}
          oldText1={blogPost.text1}
          oldText2={blogPost.text2}
        />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default ArticleEditContainer;
