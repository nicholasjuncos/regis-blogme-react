/**
=========================================================
* Material Kit 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// React-redux components
import { useDispatch, useSelector } from "react-redux";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
import MKTypography from "components/MKComponents/MKTypography";
import MKInput from "components/MKComponents/MKInput";
import MKButton from "components/MKComponents/MKButton";
import MKAlert from "components/MKComponents/MKAlert";

// Authentication pages components
// eslint-disable-next-line import/no-cycle
import BasicLayout from "routes/auth/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Login Reducer
import { CircularProgress } from "@mui/material";
import { signup, setErrorMessage } from "../../login/reducers/loginReducer";

function SignupForm() {
  // STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tos, setTos] = useState(false);

  // REACT ROUTER DOM
  const navigate = useNavigate();

  // REDUX
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.loginReducer.errorMessage);
  const authenticating = useSelector((state) => state.loginReducer.authenticating);

  // HANDLE SUBMIT
  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !email || !password2) {
      return dispatch(
        setErrorMessage("Please fill out the email, username, password, and repeat password fields")
      );
    }
    if (password !== password2) {
      return dispatch(setErrorMessage("Please make sure that your passwords match."));
    }
    if (tos) {
      dispatch(signup({ firstName, lastName, email, username, password, password2 }, navigate));
    } else {
      dispatch(setErrorMessage("Please agree to the terms of service"));
    }
  };

  return (
    <BasicLayout image={bgImage}>
      {errorMessage ? <MKAlert color="error">{errorMessage}</MKAlert> : null}
      <Card>
        <MKBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MKTypography>
        </MKBox>
        <MKBox pt={4} pb={3} px={3}>
          <MKBox component="form" role="form" id="signup-form" onSubmit={handleSubmit}>
            <MKBox mb={2}>
              <MKInput
                value={firstName}
                label="First Name"
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                value={lastName}
                label="Last Name"
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                value={email}
                label="Email"
                type="email"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                value={username}
                label="Username"
                required
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                value={password}
                type="password"
                label="Password"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                value={password2}
                type="password"
                label="Verify Password"
                fullWidth
                required
                onChange={(e) => setPassword2(e.target.value)}
              />
            </MKBox>
            <MKBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={tos} onChange={() => setTos(!tos)} required />
              <MKTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={() => setTos(!tos)}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I accept to be a nice person and not do anything bad.
              </MKTypography>
            </MKBox>
            <MKBox mt={4} mb={1}>
              <MKButton variant="gradient" color="info" fullWidth type="submit">
                {authenticating ? (
                  <CircularProgress animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                  </CircularProgress>
                ) : (
                  "Signup"
                )}
              </MKButton>
            </MKBox>
            <MKBox mt={3} mb={1} textAlign="center">
              <MKTypography variant="button" color="text">
                Already have an account?{" "}
                <MKTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Log In
                </MKTypography>
              </MKTypography>
            </MKBox>
          </MKBox>
        </MKBox>
      </Card>
    </BasicLayout>
  );
}

export default SignupForm;
