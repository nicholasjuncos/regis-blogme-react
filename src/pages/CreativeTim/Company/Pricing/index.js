/*
=========================================================
* Material Kit 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
// import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Pricing page sections
import Header from "pages/CreativeTim/Company/Pricing/sections/Header";
import AboutUs from "pages/CreativeTim/Company/Pricing/sections/AboutUs";
import PricingSection from "pages/CreativeTim/Company/Pricing/sections/Pricing";
import LifetimeMembership from "pages/CreativeTim/Company/Pricing/sections/LifetimeMembership";
import Testimonials from "pages/CreativeTim/Company/Pricing/sections/Testimonials";
import Trust from "pages/CreativeTim/Company/Pricing/sections/Trust";
import Faq from "pages/CreativeTim/Company/Pricing/sections/Faq";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

function Pricing() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
        }}
        transparent
        light
      />
      <Header />
      <MKBox p={3}>
        <AboutUs />
        <PricingSection />
        <LifetimeMembership />
        <Testimonials />
        <Trust />
        <Faq />
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Pricing;
