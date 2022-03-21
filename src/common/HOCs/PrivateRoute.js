import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { resetAllStates } from "../../routes/auth/login/reducers/loginReducer";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  // REACT ROUTER DOM
  const { pathname } = useLocation();

  // REDUX
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.loginReducer.authenticated);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_DJANGO_BACKEND}api/auth/token/verify/`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_DJANGO_BACKEND}api/auth/user/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            dispatch({ type: "AUTHENTICATED", payload: response.data });
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error, error.response);
            dispatch({ type: "AUTHENTICATION_FAILED" });
            dispatch(resetAllStates());
            localStorage.clear();
          });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error, error.response);
        dispatch({ type: "AUTHENTICATION_FAILED" });
        dispatch(resetAllStates());
        localStorage.clear();
      });
  };

  useEffect(() => {
    if (!authenticated) {
      checkAuthentication();
    }
  }, [pathname]);

  return authenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
