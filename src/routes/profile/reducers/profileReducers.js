import axios from "axios";
import { setMessage } from "../../messageReducer";

const initialState = {
  loading: false,
  errorMessage: "",
};

// ************************ REDUCER ************************
export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    case "FAILURE":
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
  type: "FAILURE",
  payload: errorMessage,
});

export const setUser = (userForm) => (dispatch) => {
  dispatch({ type: "LOADING" });
  let headers = {};
  const token = localStorage.getItem("token");
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  axios
    .put(
      `${process.env.REACT_APP_DJANGO_BACKEND}api/auth/user/`,
      {
        first_name: userForm.firstName,
        last_name: userForm.lastName,
        bio: userForm.bio,
      },
      headers
    )
    .then((response) => {
      dispatch({ type: "SUCCESS", payload: response.data });
      dispatch(setMessage("success", "Successfully updated profile."));
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
