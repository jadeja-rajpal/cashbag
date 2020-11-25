import { all, takeLatest } from "redux-saga/effects";
import ActionConstants from "../constants/ActionConstants";
import workerSaga from "./workerSaga";

// ------------------------------------
// Watchers
// ------------------------------------
function* ManageFranchiseWatcher() {
  yield takeLatest(ActionConstants.GET_FRANCHISE_ACTION, workerSaga);
  yield takeLatest(ActionConstants.GET_FRANCHISE_DETAIL_ACTION, workerSaga);
}

export default function* manageFranchiseRootWatcher() {
  yield all([ManageFranchiseWatcher()]);
}
