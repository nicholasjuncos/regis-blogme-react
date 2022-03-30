// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
import MKTypography from "components/MKComponents/MKTypography";
import MKAlert from "components/MKComponents/MKAlert";

// Common Components such as navbar and footer
import DefaultNavbar from "common/Navbar/index";
import SimpleFooter from "common/Footer/index";
import Spinner from "common/Spinner";

// Routes
// eslint-disable-next-line import/no-cycle
import routes from "new_routes";
// import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-rental.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ArticleLargeList from "../blog/article/components/ArticleLargeList";
import { getBlogPosts } from "../blog/reducers/blogReducers";

function Home() {
  // REDUX
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blogReducer.blogPosts);
  const messageType = useSelector((state) => state.messageReducer.type);
  const message = useSelector((state) => state.messageReducer.message);
  const today = new Date();

  useEffect(() => {
    dispatch(getBlogPosts({ status: "P", postDate: today.toISOString().split("T")[0] }));
  }, []);

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
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
            mx="auto"
            alignItems="center"
          >
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              alignItems="center"
              width="100%"
              textAlign="center"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              BlogMe
            </MKTypography>
            <MKTypography variant="body1" color="white" textAlign="center" px={6} mt={1}>
              Start documenting your life as you want to.
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
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {message ? (
          <MKAlert color={messageType} dismissible>
            {message}
          </MKAlert>
        ) : null}
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
                  <MKTypography variant="h3" mb={3} textAlign="center">
                    All Published Posts
                  </MKTypography>
                </Grid>
              </Container>
            </MKBox>
            <ArticleLargeList blogPosts={blogPosts} showLabel={false} />
          </>
        ) : (
          <Spinner />
        )}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default Home;
