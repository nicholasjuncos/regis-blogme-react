import { useState } from "react";

// Component prop-types
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
// import MKPagination from "components/MKComponents/MKPagination";

// Material Kit 2 PRO React components
import ArticleCard from "routes/blog/article/components/ArticleCard";

// Images
import defaultPicture from "assets/images/default-profile-pic.jpeg";

function ArticleLargeList({ blogPosts, showLabel }) {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(6);

  const post1 =
    "https://images.unsplash.com/photo-1592489637182-8c172d6d7826?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80";

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <MKBox mt={3}>
                <ArticleCard
                  image={post.cover_image ? post.cover_image : post1}
                  category={{ color: "primary", label: `${post.get_status_display}`, showLabel }}
                  title={post.title}
                  description={post.text1.substring(0, 250)}
                  author={{
                    image: post.author.profile_photo ? post.author.profile_photo : defaultPicture,
                    name: `${post.author.username}`,
                    date: `Posted on ${post.post_date}`,
                  }}
                  action={{ type: "internal", route: `/blog/post-details/${post.id}` }}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>
        {/* <MKBox mt={5}> */}
        {/*  <MKPagination> */}
        {/*    <MKPagination item> */}
        {/*      <Icon>keyboard_arrow_left</Icon> */}
        {/*    </MKPagination> */}
        {/*    <MKPagination item active> */}
        {/*      1 */}
        {/*    </MKPagination> */}
        {/*    <MKPagination item>2</MKPagination> */}
        {/*    <MKPagination item>3</MKPagination> */}
        {/*    <MKPagination item>4</MKPagination> */}
        {/*    <MKPagination item>5</MKPagination> */}
        {/*    <MKPagination item> */}
        {/*      <Icon>keyboard_arrow_right</Icon> */}
        {/*    </MKPagination> */}
        {/*  </MKPagination> */}
        {/* </MKBox> */}
      </Container>
    </MKBox>
  );
}

// Typechecking props for the ArticleLargeList
ArticleLargeList.defaultProps = {
  showLabel: true,
};

ArticleLargeList.propTypes = {
  blogPosts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object])))
    .isRequired,
  showLabel: PropTypes.bool,
};

export default ArticleLargeList;
