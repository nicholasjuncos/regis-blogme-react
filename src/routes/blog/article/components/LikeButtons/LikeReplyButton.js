import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import MKButton from "components/MKComponents/MKButton";

import { createLike, deleteLike } from "../../../reducers/likeReducers";
import { checkAuthentication } from "../../../../auth/login/reducers/loginReducer";

function LikeReplyButton({ reply }) {
  const type = "reply";
  const objectID = reply.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user);

  const handleLike = (e) => {
    e.preventDefault();
    if (user) {
      if (user.username !== reply.user.username) {
        let liked = false;
        if (user.replies_liked.includes(objectID)) {
          liked = true;
        }
        if (liked) {
          dispatch(deleteLike({ user, type, objectID }));
        } else {
          dispatch(createLike({ user, type, objectID }));
        }
        dispatch(checkAuthentication());
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {!user ? (
        <MKButton variant="outlined" color="info" size="small" onClick={handleLike}>
          Signup/Login to Like
        </MKButton>
      ) : // eslint-disable-next-line no-nested-ternary
      user.username !== reply.user.username ? (
        user.replies_liked.includes(objectID) ? (
          <MKButton variant="contained" color="info" size="small" onClick={handleLike}>
            Unlike
          </MKButton>
        ) : (
          <MKButton variant="outlined" color="info" size="small" onClick={handleLike}>
            Like
          </MKButton>
        )
      ) : null}
    </>
  );
}

LikeReplyButton.propTypes = {
  reply: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LikeReplyButton;
