// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-cycle
import SignupForm from "./components/SignupForm";

function SignupContainer() {
  // STATE
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  // REACT ROUTER DOM
  // eslint-disable-next-line no-unused-vars
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // REDUX
  const authenticated = useSelector((state) => state.loginReducer.authenticated);

  useEffect(() => {
    if (authenticated) {
      navigate("/", { replace: true });
    }
  }, [pathname]);

  return <SignupForm />;
}

export default SignupContainer;
