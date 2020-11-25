import { all } from "redux-saga/effects";
import loginRootWatcher from "./login";
import usersRootWatcher from "./frontendUsers";
import userDataRootWatcher from "./userData";
import changePasswordRootWatcher from "./changePassword";
import manageFranchiseRootWatcher from "./manageFranchise";

export default function* rootSaga() {
  yield all([
    loginRootWatcher(),
    usersRootWatcher(),
    userDataRootWatcher(),
    changePasswordRootWatcher(),
    manageFranchiseRootWatcher(),
  ]);
}
