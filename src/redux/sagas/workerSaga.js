import { put, call } from "redux-saga/effects";
// import helper from "../../libs/helper";

// ------------------------------------
// Common Worker Saga
// ------------------------------------

export default function* workerSaga(action) {
  const {
    serviceMethod,
    actionTypeSuccess,
    actionTypeFailure,
    actionTypeRequest,
    extra,
    callback,
    showNotification,
    // successMsg,
    // errrorMsg,
  } = action.payload;
  try {
    yield put({
      type: actionTypeRequest,
      payload: extra,
    });
    const apiResponse = yield call(serviceMethod);
    const {
      body: { statusCode, statusMessage, response },
    } = apiResponse;
    yield put({
      type: actionTypeSuccess,
      payload: { statusCode, statusMessage, response, extra },
    });
    if (showNotification) {
      // TODO helper.displayNotifications(successMsg, "success");
    }
    if (callback) callback();
  } catch (error) {
    const {
      body: { statusCode, statusMessage, response },
    } = error.response;
    yield put({
      type: actionTypeFailure,
      payload: { statusCode, statusMessage, response, extra },
    });
    if (showNotification) {
      // TODO helper.displayNotifications(errrorMsg, "danger");
    }
    if (callback) callback();
  }
}
