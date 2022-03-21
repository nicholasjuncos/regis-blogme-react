import { useEffect, useState } from "react";

// React-router-dom components
import { useParams, useLocation } from "react-router-dom";

// React-redux components
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line import/no-cycle
import Layout from "common/Layout";
import Spinner from "common/Spinner";

// Images
import bgImage from "assets/images/city-profile.jpg";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getBlogPosts } from "../reducers/blogReducers";
import ArticleLargeList from "./components/ArticleLargeList";
import MKTypography from "../../../components/MKComponents/MKTypography";
import MKBox from "../../../components/MKComponents/MKBox";

function ArticleListContainer() {
  const params = useParams();
  // STATE
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [postAuthor, setPostAuthor] = useState("");

  // React-router-dom
  const { pathname } = useLocation();

  // REDUX
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blogReducer.blogPosts);
  const user = useSelector((state) => state.loginReducer.user);

  useEffect(() => {
    let author = "";
    let status = "";
    if (pathname === "/blog/my-posts") {
      setPostAuthor(user.username);
      author = user.username;
    } else if (pathname === "/") {
      status = "P";
    } else {
      const { username } = params;
      setPostAuthor(username);
      author = username;
      status = "P";
    }
    dispatch(getBlogPosts({ author, status }));
  }, [pathname]);

  return (
    <Layout image={bgImage}>
      {blogPosts ? (
        <>
          <MKBox component="section" py={6} mt={6}>
            <Container>
              <Grid
                container
                item
                xs={12}
                lg={12}
                mx="auto"
                justifyContent="center"
                flexDirection="column"
                alignContent="center"
              >
                {postAuthor ? (
                  <MKTypography variant="h3" mb={3} textAlign="center">
                    {pathname === "/blog/my-posts" ? "My posts" : `Posts by ${postAuthor}`}
                  </MKTypography>
                ) : null}
              </Grid>
            </Container>
          </MKBox>
          <ArticleLargeList blogPosts={blogPosts} showLabel={pathname === "/blog/my-posts"} />
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default ArticleListContainer;
