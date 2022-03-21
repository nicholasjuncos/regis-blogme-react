const initialState = {
  type: "",
  message: "",
};

// ************************ REDUCER ************************
export function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        type: "",
        message: "",
      };
    default:
      return state;
  }
}

export const setMessage = (type, message) => (dispatch) => {
  dispatch({ type: "CLEAR_MESSAGE" });
  dispatch({ type: "SET_MESSAGE", payload: { type, message } });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: "CLEAR_MESSAGE" });
};
