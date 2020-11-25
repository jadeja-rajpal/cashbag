import apiCall from "./apiRequest";
import endpoint from "./endpoints";
import { removeToken } from "./helperFunction";

export const loginApi = (email, password, fcmToken) => {
  return apiCall({
    method: "post",
    endpoint: endpoint.login,
    payload: {
      email,
      password,
      fcmToken,
      deviceId: "6d8a0cc9066a56b3", // TODO: remove this on api change
    },
  });
};

export const forgotPasswordApi = (payload) => {
  return apiCall({
    method: "post",
    endpoint: endpoint.forgotPassword,
    payload: {
      ...payload,
      deviceId: "6d8a0cc9066a56b3", // TODO: remove this on api change
    },
  });
};

export const resetPasswordApi = (id, payload) => {
  return apiCall({
    method: "post",
    endpoint: `${endpoint.resetPassword}?token=${id}`,
    payload,
  });
};

export const verifyOtpApi = (payload) => {
  return apiCall({
    method: "post",
    endpoint: endpoint.verifyOtp,
    payload: {
      ...payload,
      deviceId: "6d8a0cc9066a56b3", // TODO: remove this on api change
    },
  });
};

export const resendOtpApi = (payload) => {
  return apiCall({
    method: "post",
    endpoint: endpoint.resendOtp,
    payload: {
      ...payload,
      deviceId: "6d8a0cc9066a56b3", // TODO: remove this on api change
    },
  });
};

export const changePasswordApi = (payload) => {
  return apiCall({
    method: "put",
    endpoint: endpoint.changePassword(payload.id),
    payload: {
      email: payload.email,
      password: payload.password,
      newPassword: payload.newPassword,
    },
  });
};

const logoutApi = () => {
  removeToken();
};

export default {
  loginApi,
  logoutApi,
};
