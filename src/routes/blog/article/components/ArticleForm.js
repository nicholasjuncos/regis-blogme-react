import { useEffect, useState } from "react";

// React-redux components
import { useDispatch, useSelector } from "react-redux";

// React-router-dom components
import { useNavigate } from "react-router-dom";

// proptypes to define variables
import PropTypes from "prop-types";

// material ui components
import { CircularProgress } from "@mui/material";
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import MKBox from "components/MKComponents/MKBox";
import MKTypography from "components/MKComponents/MKTypography";
import MKInput from "components/MKComponents/MKInput";
import MKButton from "components/MKComponents/MKButton";
import MKAlert from "components/MKComponents/MKAlert";
import MKDatePicker from "components/MKComponents/MKDatePicker";

// Blog reducers
import { setBlogPost, deleteBlogPost } from "../../reducers/blogReducers";
import { clearMessage } from "../../../messageReducer";

function ArticleForm({
  blogID,
  oldStatus,
  oldPostDate,
  oldTitle,
  oldTitleSubText,
  oldSubTitle1,
  oldSubTitle2,
  oldText1,
  oldText2,
}) {
  // STATE
  const deleteButton = !!blogID;
  const [published, setPublished] = useState(false);
  const [postDate, setPostDate] = useState(oldPostDate);
  const [title, setTitle] = useState(oldTitle);
  const [titleSubText, setTitleSubText] = useState(oldTitleSubText);
  const [subTitle1, setSubTitle1] = useState(oldSubTitle1);
  const [subTitle2, setSubTitle2] = useState(oldSubTitle2);
  const [text1, setText1] = useState(oldText1);
  const [text2, setText2] = useState(oldText2);

  // Navigate
  const navigate = useNavigate();

  // REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginReducer.user);
  const errorMessage = useSelector((state) => state.blogReducer.errorMessage);
  const loading = useSelector((state) => state.blogReducer.loading);

  // handle delete
  const handleDelete = () => {
    dispatch(deleteBlogPost(blogID, navigate));
  };

  // HANDLE SUBMIT
  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();
    let status = "D";
    if (published) {
      status = "P";
    }
    dispatch(clearMessage());
    dispatch(
      setBlogPost(
        {
          blogID,
          user,
          status,
          postDate,
          title,
          titleSubText,
          subTitle1,
          subTitle2,
          text1,
          text2,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (oldStatus === "P") {
      setPublished(true);
    }
  }, []);

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
          {blogID ? "Update Post" : "Create Post"}
        </MKTypography>
        {deleteButton ? (
          <MKButton color="primary" size="small" ml={3} onClick={() => handleDelete()}>
            Delete
          </MKButton>
        ) : null}
      </MKBox>
      <MKBox pt={4} pb={3} px={3}>
        <MKBox component="form" role="form" id="signup-form" onSubmit={handleSubmit}>
          <MKBox display="flex" alignItems="center" ml={-1} mb={2}>
            <Switch checked={published} onChange={() => setPublished(!published)} />
            <MKTypography
              variant="button"
              fontWeight="regular"
              color="text"
              onClick={() => setPublished(!published)}
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Publish for public view.
            </MKTypography>
          </MKBox>
          <MKBox mb={2}>
            <MKDatePicker
              input={{
                label: "Select a Post Date",
                value: postDate,
                fullWidth: true,
                type: "date",
                required: true,
                onChange: (e) => setPostDate(e.target.value),
              }}
              onChange={(e) => setPostDate(e[0].toISOString().split("T")[0])}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              value={title}
              label="Title"
              fullWidth
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              value={titleSubText}
              label="Title Sub-Text"
              fullWidth
              onChange={(e) => setTitleSubText(e.target.value)}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              value={subTitle1}
              label="Sub-Title 1"
              fullWidth
              required
              onChange={(e) => setSubTitle1(e.target.value)}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              value={text1}
              label="Text 1"
              type="text"
              fullWidth
              required
              multiline
              rows={5}
              onChange={(e) => setText1(e.target.value)}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              value={subTitle2}
              label="Sub-Title 2"
              fullWidth
              onChange={(e) => setSubTitle2(e.target.value)}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              value={text2}
              label="Text 2"
              type="text"
              fullWidth
              multiline
              rows={5}
              onChange={(e) => setText2(e.target.value)}
            />
          </MKBox>
          <MKBox mt={4} mb={1}>
            <MKButton variant="gradient" color="info" fullWidth type="submit">
              {/* eslint-disable-next-line no-nested-ternary */}
              {loading ? (
                <CircularProgress animation="border" role="status" size="sm">
                  <span className="sr-only">Loading...</span>
                </CircularProgress>
              ) : blogID ? (
                "Update"
              ) : (
                "Create"
              )}
            </MKButton>
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

ArticleForm.defaultProps = {
  blogID: null,
  oldStatus: "draft",
  oldPostDate: "",
  oldTitle: "",
  oldTitleSubText: "",
  oldSubTitle1: "",
  oldSubTitle2: "",
  oldText1: "",
  oldText2: "",
};

ArticleForm.propTypes = {
  blogID: PropTypes.number,
  oldStatus: PropTypes.string,
  oldPostDate: PropTypes.string,
  oldTitle: PropTypes.string,
  oldTitleSubText: PropTypes.string,
  oldSubTitle1: PropTypes.string,
  oldSubTitle2: PropTypes.string,
  oldText1: PropTypes.string,
  oldText2: PropTypes.string,
};

export default ArticleForm;
