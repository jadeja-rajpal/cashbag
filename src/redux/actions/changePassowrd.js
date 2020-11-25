import { changePasswordApi } from "api/auth";
import actionConstants from "../constants/ActionConstants";

export const changePassword = (data) => {
  const payload = {
    serviceMethod: changePasswordApi.bind(null, data),
    actionTypeSuccess: actionConstants.CHANGE_PASSWORD_SUCCESS,
    actionTypeFailure: actionConstants.CHANGE_PASSWORD_FAILURE,
    actionTypeRequest: actionConstants.CHANGE_PASSWORD_REQUEST,
    extra: null,
  };
  return { type: actionConstants.CHANGE_PASSWORD_ACTION, payload };
};

export const clearChangePasswordState = () => {
  return { type: actionConstants.CHANGE_PASSWORD_CLEAR };
};
