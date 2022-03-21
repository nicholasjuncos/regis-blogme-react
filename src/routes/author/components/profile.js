// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
import MKAvatar from "components/MKComponents/MKAvatar";
import MKTypography from "components/MKComponents/MKTypography";

import defaultPicture from "assets/images/default-profile-pic.jpeg";
import FollowButton from "./FollowButton";

function Profile({ author }) {
  let profilePicture = defaultPicture;
  if (author) {
    if (author.profile_photo) {
      profilePicture = author.profile_photo;
    }
  }

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={profilePicture} alt="profile_picture" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center" pb={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                alignItems="center"
                mb={1}
              >
                <FollowButton author={author} />
                {author.full_name ? (
                  <MKTypography variant="h4">Full name: {author.full_name}</MKTypography>
                ) : null}
                <MKTypography variant="h4">Username: {author.username}</MKTypography>
              </MKBox>
              <Grid container spacing={3} mb={3} justifyContent="center">
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {author.published_posts.length}&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    Posts
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {author.followers.length}&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    Followers
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {author.authors_following.length}&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    Following
                  </MKTypography>
                </Grid>
              </Grid>
              {author.bio ? (
                <MKTypography variant="body1" fontWeight="light" color="text">
                  Bio: <br />
                  {author.bio}
                </MKTypography>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

Profile.propTypes = {
  author: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Profile;
