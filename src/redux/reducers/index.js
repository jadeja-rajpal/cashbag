import { combineReducers } from "redux";
import authentication from "./auth";
import changePassword from "./changePassword";
import userData from "./userData";
import frontendUsersReducer from "./frontendUsers";
import manageFranchise from "./manageFranchise";

const reducer = combineReducers({
  authentication,
  changePassword,
  userData,
  frontendUsersReducer,
  manageFranchise,
});

export default reducer;
