import axios from "axios";

const initialState = {
  loading: false,
  author: null,
  errorMessage: "",
};

// ************************ REDUCER ************************
export function authorReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_APP":
      return initialState;
    case "USER_RETRIEVAL":
      return {
        ...state,
        loading: true,
        errorMessage: "",
        author: null,
      };
    case "USER_RETRIEVED":
      return {
        ...state,
        loading: false,
        author: action.payload,
        errorMessage: "",
      };
    case "USER_RETRIEVAL_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
        author: null,
      };
    default:
      return state;
  }
}

// ************************ ACTIONS ************************
export const setErrorMessage = (errorMessage) => ({
  type: "USER_RETRIEVAL_FAILURE",
  payload: errorMessage,
});

export const getAuthor = (username) => (dispatch) => {
  dispatch({ type: "USER_RETRIEVAL" });
  const USER_URL = `${process.env.REACT_APP_DJANGO_BACKEND}users/${username}/`;
  axios
    .get(USER_URL)
    .then((response) => {
      dispatch({ type: "USER_RETRIEVED", payload: response.data });
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
