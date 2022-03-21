// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// React-redux
import { useSelector } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";

// Project Navbar & Footer
import DefaultNavbar from "common/Navbar/index";
import SimpleFooter from "common/Footer/index";

// Material kit 2 PRO React page layout routes
import routes from "new_routes";
import bgImage from "../assets/images/city-profile.jpg";
import MKAlert from "../components/MKComponents/MKAlert";

function Layout({ image, children }) {
  let coverImage = image;
  if (!image) {
    coverImage = bgImage;
  }

  const messageType = useSelector((state) => state.messageReducer.type);
  const message = useSelector((state) => state.messageReducer.message);

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox bgColor="white" minHeight="97vh">
        <MKBox
          minHeight="25rem"
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
        />
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
          {children}
        </Card>
      </MKBox>
      <SimpleFooter />
    </>
  );
}

// Typechecking props for the BasicLayout
Layout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
