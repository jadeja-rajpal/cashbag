import actionConstants from "../constants/ActionConstants";
import {
  loginApi,
  verifyOtpApi,
  resendOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../../api/auth";

const loginAction = ({ email, password, fcmToken = "" }) => {
  const payload = {
    serviceMethod: loginApi.bind(null, email, password, fcmToken),
    actionTypeSuccess: actionConstants.LOGIN_SUCCESS,
    actionTypeFailure: actionConstants.LOGIN_FAILURE,
    actionTypeRequest: actionConstants.LOGIN_REQUEST,
    extra: email,
  };
  return { type: actionConstants.LOGIN_ACTION, payload };
};

export const verifyOtpAction = (data) => {
  const payload = {
    serviceMethod: verifyOtpApi.bind(null, data),
    actionTypeSuccess: actionConstants.VERIFY_OTP_SUCCESS,
    actionTypeFailure: actionConstants.VERIFY_OTP_FAILURE,
    actionTypeRequest: actionConstants.VERIFY_OTP_REQUEST,
    extra: null,
  };
  return { type: actionConstants.VERIFY_OTP_ACTION, payload };
};

export const verifyOtpClearAction = () => {
  return { type: actionConstants.VERIFY_OTP_CLEAR };
};

export const resendOtpAction = (data) => {
  const payload = {
    serviceMethod: resendOtpApi.bind(null, data),
    actionTypeSuccess: actionConstants.RESEND_OTP_SUCCESS,
    actionTypeFailure: actionConstants.RESEND_OTP_FAILURE,
    actionTypeRequest: actionConstants.RESEND_OTP_REQUEST,
    extra: null,
  };
  return { type: actionConstants.RESEND_OTP_ACTION, payload };
};

export const resendOtpClearAction = () => {
  return { type: actionConstants.RESEND_OTP_CLEAR };
};
export const forgotPasswordAction = (data) => {
  const payload = {
    serviceMethod: forgotPasswordApi.bind(null, data),
    actionTypeSuccess: actionConstants.FORGOT_PASSWORD_SUCCESS,
    actionTypeFailure: actionConstants.FORGOT_PASSWORD_FAILURE,
    actionTypeRequest: actionConstants.FORGOT_PASSWORD_REQUEST,
    extra: null,
  };
  return { type: actionConstants.FORGOT_PASSWORD_ACTION, payload };
};

export const forgotPasswordClearAction = () => {
  return { type: actionConstants.FORGOT_PASSWORD_CLEAR };
};
export const resetPasswordAction = (id, data) => {
  const payload = {
    serviceMethod: resetPasswordApi.bind(null, id, data),
    actionTypeSuccess: actionConstants.RESET_PASSWORD_SUCCESS,
    actionTypeFailure: actionConstants.RESET_PASSWORD_FAILURE,
    actionTypeRequest: actionConstants.RESET_PASSWORD_REQUEST,
    extra: null,
  };
  return { type: actionConstants.RESET_PASSWORD_ACTION, payload };
};

export const resetPasswordClearAction = () => {
  return { type: actionConstants.RESET_PASSWORD_CLEAR };
};

export default loginAction;
