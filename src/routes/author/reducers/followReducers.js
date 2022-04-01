import axios from "axios";
import { setMessage } from "../../messageReducer";

const initialState = {
  loading: false,
  errorMessage: "",
  following: false,
  follow: null,
};

// ************************ REDUCER ************************
export function followReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_APP":
      return initialState;
    case "FOLLOW_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
        following: false,
        follow: null,
      };
    case "FOLLOW_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
        following: true,
        follow: action.payload,
      };
    case "FOLLOW_DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
        following: false,
        follow: null,
      };
    case "FOLLOW_FAILURE":
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
  type: "FOLLOW_FAILURE",
  payload: errorMessage,
});

export const createFollow = (followForm) => (dispatch) => {
  dispatch({ type: "FOLLOW_LOADING" });

  const data = {
    user_follower: followForm.user.pk,
    author_followed: followForm.author.pk,
  };

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
    .post(`${process.env.REACT_APP_DJANGO_BACKEND}blog/follows/`, data, headers)
    .then((response) => {
      dispatch({ type: "FOLLOW_SUCCESS", payload: response.data });
      dispatch(setMessage("success", `Successfully followed ${followForm.author.display_name}.`));
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

export const deleteFollow = (followForm) => (dispatch) => {
  const follow = followForm.user.authors_following.find(
    (tempAuthor) => tempAuthor.author_followed === followForm.author.pk
  );

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
    .delete(`${process.env.REACT_APP_DJANGO_BACKEND}blog/follows/${follow.id}/`, headers)
    .then(() => {
      dispatch({ type: "FOLLOW_DELETE_SUCCESS" });
      dispatch(setMessage("success", `Successfully unfollowed ${followForm.author.display_name}.`));
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
