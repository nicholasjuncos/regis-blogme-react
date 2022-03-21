import { combineReducers } from "redux";
import { loginReducer } from "./auth/login/reducers/loginReducer";
import { profileReducer } from "./profile/reducers/profileReducers";
import { authorReducer } from "./author/reducers/authorReducers";
import { blogReducer } from "./blog/reducers/blogReducers";
import { followReducer } from "./author/reducers/followReducers";
import { messageReducer } from "./messageReducer";

const rootReducer = combineReducers({
  loginReducer,
  profileReducer,
  authorReducer,
  blogReducer,
  followReducer,
  messageReducer,
});

export default rootReducer;
