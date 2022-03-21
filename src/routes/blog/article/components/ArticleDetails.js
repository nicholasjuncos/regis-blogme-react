// React components
import { useEffect, useRef } from "react";

// React-redux components
import { useSelector } from "react-redux";

// rellax
import Rellax from "rellax";

// Prop-types
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
import MKTypography from "components/MKComponents/MKTypography";

// Images
import bgImage from "assets/images/bg5.jpg";
import { Link } from "react-router-dom";
import MKButton from "components/MKComponents/MKButton";
import MKAlert from "components/MKComponents/MKAlert";
import ArticleDetailsImagesSlider from "./ArticleDetailsImagesSlider";
import ArticleSmallList from "./ArticleSmallList";
import LikeArticleButton from "./LikeButtons/LikePostButton";

// eslint-disable-next-line no-unused-vars
function ArticleDetails({ blogPost, includeStatus }) {
  const user = useSelector((state) => state.loginReducer.user);
  const messageType = useSelector((state) => state.messageReducer.type);
  const message = useSelector((state) => state.messageReducer.message);

  let userMatch = false;
  const headerRef = useRef(null);
  let coverImage = bgImage;
  if (blogPost.cover_image) {
    coverImage = blogPost.cover_image;
  }

  if (user) {
    if (user.id === blogPost.author.id) {
      userMatch = true;
    }
  }

  const slides = [];
  if (blogPost.image1) {
    slides.concat({
      image: blogPost.image1,
      title: blogPost.image1_title,
      description: blogPost.image1_text,
    });
  }
  if (blogPost.image2) {
    slides.concat({
      image: blogPost.image2,
      title: blogPost.image2_title,
      description: blogPost.image2_text,
    });
  }
  if (blogPost.image3) {
    slides.concat({
      image: blogPost.image3,
      title: blogPost.image3_title,
      description: blogPost.image3_text,
    });
  }

  // Setting up rellax
  useEffect(() => {
    const parallax = new Rellax(headerRef.current, {
      speed: -6,
    });

    return () => parallax.destroy();
  }, []);

  return (
    <>
      <MKBox
        ref={headerRef}
        minHeight="85vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={12}
            justifyContent="center"
            flexDirection="column"
            alignContent="center"
            textAlign="center"
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              {blogPost.title}
            </MKTypography>
            {blogPost.title_sub_text && (
              <MKTypography
                variant="body1"
                color="white"
                opacity={0.8}
                mb={2}
                mr={{ xs: 0, sm: 6 }}
                pr={{ xs: 0, sm: 6 }}
              >
                {blogPost.title_sub_text}
              </MKTypography>
            )}
            <MKTypography variant="body1" color="white" opacity={0.8}>
              By {blogPost.author.display_name}
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {message ? (
          <MKAlert color={messageType} dismissible>
            {message}
          </MKAlert>
        ) : null}
        <MKBox component="section" py={6} mt={6}>
          <Container>
            <Grid container spacing={3} item xs={12} lg={8} mx="auto">
              <Container>
                {userMatch ? (
                  <Link to={`/blog/edit-post/${blogPost.id}`} ml={3}>
                    <MKButton color="primary" size="small" ml={3}>
                      Edit
                    </MKButton>
                  </Link>
                ) : null}
                <LikeArticleButton article={blogPost} />
                <MKTypography variant="h3" mb={3}>
                  {blogPost.subtitle1}
                </MKTypography>
                <MKTypography variant="body2">{blogPost.text1}</MKTypography>
              </Container>
            </Grid>
          </Container>
        </MKBox>
        {slides.length > 1 ? <ArticleDetailsImagesSlider slides={slides} /> : null}
        {blogPost.text2 ? (
          <MKBox component="section" py={6} mt={6}>
            <Container>
              <Grid container spacing={3} item xs={12} lg={8} mx="auto">
                {blogPost.subtitle2 && (
                  <MKTypography variant="h3" mb={3}>
                    {blogPost.subtitle2}
                  </MKTypography>
                )}
                <MKTypography variant="body2">{blogPost.text2}</MKTypography>
              </Grid>
            </Container>
          </MKBox>
        ) : null}
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
              <MKTypography variant="h2" mb={3} textAlign="center">
                <Link to={`/blog/authors/${blogPost.author.username}`}>
                  Recent Posts by {blogPost.author.display_name}
                </Link>
              </MKTypography>
              <ArticleSmallList blogPosts={blogPost.author.last_three_articles} />
            </Grid>
          </Container>
        </MKBox>
      </Card>
    </>
  );
}

ArticleDetails.defaultProps = {
  includeStatus: false,
};

ArticleDetails.propTypes = {
  blogPost: PropTypes.oneOfType([PropTypes.object]).isRequired,
  includeStatus: PropTypes.bool,
};

export default ArticleDetails;
