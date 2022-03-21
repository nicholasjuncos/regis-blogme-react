import axios from "axios";
import { setMessage } from "../../messageReducer";

const initialState = {
  loading: false,
  errorMessage: "",
};

// ************************ REDUCER ************************
export function likeReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_APP":
      return initialState;
    case "LIKE_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "LIKE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    case "LIKE_DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    case "LIKE_FAILURE":
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
  type: "LIKE_FAILURE",
  payload: errorMessage,
});

export const createLike = (likeForm) => (dispatch) => {
  dispatch({ type: "LIKE_LOADING" });
  const likeType = likeForm.type;
  const user = likeForm.user.pk;

  const data = {
    user,
  };
  data[likeType] = likeForm.objectID;

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
    .post(`${process.env.REACT_APP_DJANGO_BACKEND}api/blog/likes/`, data, headers)
    .then((response) => {
      dispatch({ type: "LIKE_SUCCESS", payload: response.data });
      dispatch(setMessage("success", `Successfully liked ${likeType}.`));
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

export const deleteLike = (likeForm) => (dispatch) => {
  const likeType = likeForm.type;
  const like = likeForm.user.likes.find((tempLike) => tempLike[likeType] === likeForm.objectID);

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
    .delete(`${process.env.REACT_APP_DJANGO_BACKEND}api/blog/likes/${like.id}/`, headers)
    .then((response) => {
      dispatch({ type: "LIKE_DELETE_SUCCESS", payload: response.data });
      dispatch(setMessage("success", `Successfully unliked ${likeType}.`));
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
