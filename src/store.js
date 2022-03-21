import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import * as Sentry from "@sentry/react";

import rootReducer from "./routes/rootReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk), sentryReduxEnhancer)
);

export default store;
