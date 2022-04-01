import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 PRO React themes
import theme from "assets/theme";

// Material Kit 2 PRO React routes
import routes from "new_routes";

// Authenticated Route Component
import PrivateRoute from "./common/HOCs/PrivateRoute";

// Individual components for some routes
import Home from "./routes/home/index";
import AuthorContainer from "./routes/author/AuthorContainer";
import ArticleEditContainer from "./routes/blog/article/ArticleEditContainer";
import ArticleDetailsContainer from "./routes/blog/article/ArticleDetailsContainer";
import ArticleListContainer from "./routes/blog/article/ArticleListContainer";

// Login reducer resetAllStates
import { resetAllStates } from "./routes/auth/login/reducers/loginReducer";

export default function App() {
  const { pathname } = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  // REDUX
  const dispatch = useDispatch();

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_DJANGO_BACKEND}auth/token/verify/`,
        {
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_DJANGO_BACKEND}auth/user/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            dispatch({ type: "AUTHENTICATED", payload: response.data });
            setLoading(false);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error, error.response);
            dispatch({ type: "AUTHENTICATION_FAILED" });
            dispatch(resetAllStates());
            setLoading(false);
            localStorage.clear();
          });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error, error.response);
        dispatch({ type: "AUTHENTICATION_FAILED" });
        dispatch(resetAllStates());
        setLoading(false);
        localStorage.clear();
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuthentication();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.authRequired) {
          return (
            <Route
              exact
              path={route.route}
              key={route.key}
              element={<PrivateRoute>{route.component}</PrivateRoute>}
            />
          );
        }
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/authors/:username" exact element={<AuthorContainer />} />
        <Route path="/blog/authors/:username/posts" exact element={<ArticleListContainer />} />
        <Route
          path="/blog/edit-post/:blogPostID"
          exact
          element={
            <PrivateRoute>
              <ArticleEditContainer />
            </PrivateRoute>
          }
        />
        <Route path="/blog/post-details/:blogPostID" exact element={<ArticleDetailsContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
