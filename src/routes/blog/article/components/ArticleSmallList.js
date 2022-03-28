// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";

// Article Card component
import ArticleCard from "routes/blog/article/components/ArticleCard";

// Images
import defaultProfilePicture from "assets/images/default-profile-pic.jpeg";
import PropTypes from "prop-types";

function ArticleSmallList({ blogPosts }) {
  const post1 =
    "https://images.unsplash.com/photo-1592489637182-8c172d6d7826?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80";

  return (
    <MKBox component="section" py={7}>
      <Container>
        <Grid container spacing={3}>
          {blogPosts.map((post) => (
            <Grid item xs={12} lg={4} mb={{ xs: 3, lg: 0 }} key={post.id}>
              <ArticleCard
                image={post.cover_image ? post.cover_image : post1}
                title={post.title}
                description={post.text1.substring(0, 250)}
                author={{
                  image: post.author.profile_photo
                    ? post.author.profile_photo
                    : defaultProfilePicture,
                  name: `${post.author.username}`,
                  date: `Posted on ${post.post_date}`,
                }}
                action={{ type: "internal", route: `/blog/post-details/${post.id}` }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

ArticleSmallList.propTypes = {
  blogPosts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object])))
    .isRequired,
};

export default ArticleSmallList;
