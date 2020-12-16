import { combineReducers } from "redux";
import { authR } from "./authReducers";
import { errorR } from "./errorReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});