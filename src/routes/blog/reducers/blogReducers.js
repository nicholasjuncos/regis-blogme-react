import axios from "axios";
import { setMessage } from "../../messageReducer";

const initialState = {
  loading: false,
  errorMessage: "",
  blogPost: null,
  blogPosts: [],
};

// ************************ REDUCER ************************
export function blogReducer(state = initialState, action) {
  switch (action.type) {
    case "BLOG_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
        blogPost: null,
        blogPosts: [],
      };
    case "BLOG_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
        blogPost: action.payload,
      };
    case "BLOG_DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
        blogPost: null,
      };
    case "BLOG_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
        blogPosts: action.payload,
      };
    case "BLOG_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

// ************************ ACTIONS ************************
export const setErrorMessage = (errorMessage) => ({
  type: "BLOG_FAILURE",
  payload: errorMessage,
});

export const setBlogPost = (blogForm, navigate) => (dispatch) => {
  dispatch({ type: "BLOG_LOADING" });
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  let action = "created";
  let postURL = `${process.env.REACT_APP_DJANGO_BACKEND}blog/posts/`;
  if (blogForm.blogID) {
    postURL += blogForm.blogID.toString();
    postURL += "/";
    action = "updated";
  }
  axios
    .post(
      postURL,
      {
        author: blogForm.user.pk,
        status: blogForm.status,
        post_date: blogForm.postDate,
        title: blogForm.title,
        title_sub_text: blogForm.titleSubText,
        subtitle1: blogForm.subTitle1,
        text1: blogForm.text1,
        subtitle2: blogForm.subTitle2,
        text2: blogForm.text2,
      },
      headers
    )
    .then((response) => {
      dispatch({ type: "BLOG_SUCCESS", payload: response.data });
      dispatch(setMessage("success", `Successfully ${action} blog post.`));
      navigate("/");
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === "object") {
          if (errorMessage !== "") {
            errorMessage += "\n";
          }
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const x in error.response.data) {
            errorMessage += `${x}: `;
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const y in error.response.data[x]) {
              errorMessage += `${error.response.data[x][y]} `;
            }
          }
        } else if (error.response.data.non_field_errors) {
          // eslint-disable-next-line prefer-destructuring
          errorMessage = error.response.data.non_field_errors[0];
        }
      } else {
        errorMessage = "There was an error with the server. Please contact support.";
      }
      // eslint-disable-next-line no-console
      console.log(error, error.response, errorMessage);
      dispatch(setErrorMessage(errorMessage));
    });
};

export const getBlogPost = (articleID) => (dispatch) => {
  dispatch({ type: "BLOG_LOADING" });
  const POST_URL = `${process.env.REACT_APP_DJANGO_BACKEND}blog/posts/${articleID}/`;
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  axios
    .get(POST_URL, headers)
    .then((response) => {
      dispatch({ type: "BLOG_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === "object") {
          if (errorMessage !== "") {
            errorMessage += "\n";
          }
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const x in error.response.data) {
            errorMessage += `${x}: `;
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const y in error.response.data[x]) {
              errorMessage += `${error.response.data[x][y]} `;
            }
          }
        } else if (error.response.data.non_field_errors) {
          // eslint-disable-next-line prefer-destructuring
          errorMessage = error.response.data.non_field_errors[0];
        }
      } else {
        errorMessage = "There was an error with the server. Please contact support.";
      }
      // eslint-disable-next-line no-console
      console.log(error, error.response, errorMessage);
      dispatch(setErrorMessage(errorMessage));
    });
};

export const getBlogPosts = (extraArgs) => (dispatch) => {
  const author = extraArgs.author ? extraArgs.author : "";
  const status = extraArgs.status ? extraArgs.status : "";
  const postDate = extraArgs.postDate ? extraArgs.postDate : "";
  dispatch({ type: "BLOG_LOADING" });
  const POST_URL = `${process.env.REACT_APP_DJANGO_BACKEND}blog/posts/?author__username=${author}&status=${status}&post_date__lte=${postDate}`;
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  axios
    .get(POST_URL, headers)
    .then((response) => {
      dispatch({ type: "BLOG_LIST_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === "object") {
          if (errorMessage !== "") {
            errorMessage += "\n";
          }
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const x in error.response.data) {
            errorMessage += `${x}: `;
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const y in error.response.data[x]) {
              errorMessage += `${error.response.data[x][y]} `;
            }
          }
        } else if (error.response.data.non_field_errors) {
          // eslint-disable-next-line prefer-destructuring
          errorMessage = error.response.data.non_field_errors[0];
        }
      } else {
        errorMessage = "There was an error with the server. Please contact support.";
      }
      // eslint-disable-next-line no-console
      console.log(error, error.response, errorMessage);
      dispatch(setErrorMessage(errorMessage));
    });
};

export const deleteBlogPost = (articleID, navigate) => (dispatch) => {
  dispatch({ type: "BLOG_LOADING" });
  const POST_URL = `${process.env.REACT_APP_DJANGO_BACKEND}blog/posts/${articleID}/`;
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  axios
    .delete(POST_URL, headers)
    .then((response) => {
      dispatch({ type: "BLOG_DELETE_SUCCESS", payload: response.data });
      dispatch(setMessage("success", "Successfully deleted blog post."));
      navigate("/");
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === "object") {
          if (errorMessage !== "") {
            errorMessage += "\n";
          }
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const x in error.response.data) {
            errorMessage += `${x}: `;
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const y in error.response.data[x]) {
              errorMessage += `${error.response.data[x][y]} `;
            }
          }
        } else if (error.response.data.non_field_errors) {
          // eslint-disable-next-line prefer-destructuring
          errorMessage = error.response.data.non_field_errors[0];
        }
      } else {
        errorMessage = "There was an error with the server. Please contact support.";
      }
      // eslint-disable-next-line no-console
      console.log(error, error.response, errorMessage);
      dispatch(setErrorMessage(errorMessage));
    });
};
