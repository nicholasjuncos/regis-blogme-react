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

import PropTypes from "prop-types";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
import MKTypography from "components/MKComponents/MKTypography";
import MKInput from "components/MKComponents/MKInput";
import MKButton from "components/MKComponents/MKButton";
import MKAlert from "components/MKComponents/MKAlert";

import { CircularProgress } from "@mui/material";

import { setUser } from "../reducers/profileReducers";
import { clearMessage } from "../../messageReducer";

function ProfileForm({ oldFirstName, oldLastName, oldBio }) {
  // STATE
  const [firstName, setFirstName] = useState(oldFirstName);
  const [lastName, setLastName] = useState(oldLastName);
  const [bio, setBio] = useState(oldBio);

  // REDUX
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.profileReducer.errorMessage);
  const loading = useSelector((state) => state.profileReducer.loading);

  // HANDLE SUBMIT
  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessage());
    dispatch(setUser({ firstName, lastName, bio }));
  };

  return (
    <>
      {errorMessage ? <MKAlert color="error">{errorMessage}</MKAlert> : null}
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
          My info
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
              value={bio}
              label="My Bio"
              type="text"
              fullWidth
              multiline
              rows={5}
              onChange={(e) => setBio(e.target.value)}
            />
          </MKBox>
          <MKBox mt={4} mb={1}>
            <MKButton variant="gradient" color="info" fullWidth type="submit">
              {loading ? (
                <CircularProgress animation="border" role="status" size="sm">
                  <span className="sr-only">Loading...</span>
                </CircularProgress>
              ) : (
                "Update"
              )}
            </MKButton>
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

ProfileForm.defaultProps = {
  oldFirstName: "",
  oldLastName: "",
  oldBio: "",
};

ProfileForm.propTypes = {
  oldFirstName: PropTypes.string,
  oldLastName: PropTypes.string,
  oldBio: PropTypes.string,
};

export default ProfileForm;
