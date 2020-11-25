import { all, takeLatest } from "redux-saga/effects";
import ActionConstants from "../constants/ActionConstants";
import workerSaga from "./workerSaga";

// ------------------------------------
// Watchers
// ------------------------------------
function* LoginWatcher() {
  yield takeLatest(ActionConstants.LOGIN_ACTION, workerSaga);
  yield takeLatest(ActionConstants.VERIFY_OTP_ACTION, workerSaga);
  yield takeLatest(ActionConstants.RESEND_OTP_ACTION, workerSaga);
  yield takeLatest(ActionConstants.RESET_PASSWORD_ACTION, workerSaga);
  yield takeLatest(ActionConstants.FORGOT_PASSWORD_ACTION, workerSaga);
}

export default function* loginRootWatcher() {
  yield all([LoginWatcher()]);
}
