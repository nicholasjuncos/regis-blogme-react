import { useEffect, useState } from "react";

// React-router-dom components
import { useLocation, useParams } from "react-router-dom";

// React-redux components
import { useDispatch, useSelector } from "react-redux";

// Project Navbar and Footer
import DefaultNavbar from "common/Navbar/index";
import SimpleFooter from "common/Footer/index";
import Spinner from "common/Spinner";

// Import routes
import routes from "new_routes";

import MKBox from "../../../components/MKComponents/MKBox";

// Article Form Component
import ArticleDetails from "./components/ArticleDetails";

// Blog reducers
import { getBlogPost } from "../reducers/blogReducers";

function ArticleDetailsContainer() {
  const params = useParams();

  const { pathname } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const { blogPostID } = params;

  // REDUX
  const dispatch = useDispatch();
  const blogPost = useSelector((state) => state.blogReducer.blogPost);

  useEffect(() => {
    dispatch(getBlogPost(blogPostID));
  }, [pathname]);

  return (
    <>
      <MKBox bgColor="white" py={0.25}>
        <DefaultNavbar routes={routes} transparent light />
      </MKBox>
      {blogPost ? <ArticleDetails blogPost={blogPost} /> : <Spinner />}
      <MKBox pt={6} px={1} mt={6}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default ArticleDetailsContainer;
