import { all, takeLatest } from "redux-saga/effects";
import actionConstants from "../constants/ActionConstants";
import workerSaga from "./workerSaga";

function* changePasswordWatcher() {
  yield takeLatest(actionConstants.CHANGE_PASSWORD_ACTION, workerSaga);
}

export default function* changePasswordRootWatcher() {
  yield all([changePasswordWatcher()]);
}
