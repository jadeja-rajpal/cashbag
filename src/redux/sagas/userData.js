import { all, takeLatest } from "redux-saga/effects";
import actionConstants from "../constants/ActionConstants";
import workerSaga from "./workerSaga";

function* userDataWatcher() {
  yield takeLatest(actionConstants.GET_USER_DATA_ACTION, workerSaga);
  yield takeLatest(actionConstants.GET_USER_PERMISSIONS_ACTION, workerSaga);
  yield takeLatest(actionConstants.POST_PINCODE_ACTION, workerSaga);
}

export default function* userDataRootWatcher() {
  yield all([userDataWatcher()]);
}
