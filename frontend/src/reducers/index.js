import { combineReducers } from "redux";
import { authR } from "./authReducers";
import { errorR } from "./errorReducers";
import { manR } from ".managerReducers";

export default combineReducers({
  auth: authR,
  errors: errorR
  man: manR
});