import { all, takeLatest } from "redux-saga/effects";
import actionConstants from "../constants/ActionConstants";
import workerSaga from "./workerSaga";

function* usersWatcher() {
  yield takeLatest(actionConstants.USERS_LIST_ACTION, workerSaga);
  yield takeLatest(
    actionConstants.GET_FRONTEND_USER_DETAILS_ACTION,
    workerSaga
  );
  yield takeLatest(actionConstants.ALL_STATES_CITIES_ACTION, workerSaga);
}

export default function* usersRootWatcher() {
  yield all([usersWatcher()]);
}
