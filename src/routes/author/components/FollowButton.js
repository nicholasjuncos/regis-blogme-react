import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import MKButton from "components/MKComponents/MKButton";

import { createFollow, deleteFollow } from "../reducers/followReducers";
import { checkAuthentication } from "../../auth/login/reducers/loginReducer";

function FollowButton({ author }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user);

  const handleFollow = (e) => {
    e.preventDefault();
    if (user) {
      let following = false;
      if (user.following_usernames.includes(author.username)) {
        following = true;
      }
      if (following) {
        dispatch(deleteFollow({ user, author }));
      } else {
        dispatch(createFollow({ user, author }));
      }
      dispatch(checkAuthentication());
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {!user ? (
        <MKButton variant="outlined" color="info" size="small" onClick={handleFollow}>
          Signup/Login to Follow
        </MKButton>
      ) : // eslint-disable-next-line no-nested-ternary
      user.username !== author.username ? (
        user.following_usernames.includes(author.username) ? (
          <MKButton variant="contained" color="info" size="small" onClick={handleFollow}>
            Unfollow
          </MKButton>
        ) : (
          <MKButton variant="outlined" color="info" size="small" onClick={handleFollow}>
            Follow
          </MKButton>
        )
      ) : null}
    </>
  );
}

FollowButton.propTypes = {
  author: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default FollowButton;
