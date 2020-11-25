import {
  getUserDataApi,
  getUserPermissionsApi,
  postPincodeApi,
} from "api/userData";
import actionConstants from "../constants/ActionConstants";

export const getUserData = () => {
  const payload = {
    serviceMethod: getUserDataApi.bind(null),
    actionTypeSuccess: actionConstants.GET_USER_DATA_SUCCESS,
    actionTypeFailure: actionConstants.GET_USER_DATA_FAILURE,
    actionTypeRequest: actionConstants.GET_USER_DATA_REQUEST,
    extra: null,
  };
  return { type: actionConstants.GET_USER_DATA_ACTION, payload };
};

export const getUserPermissions = () => {
  const payload = {
    serviceMethod: getUserPermissionsApi.bind(null),
    actionTypeSuccess: actionConstants.GET_USER_PERMISSIONS_SUCCESS,
    actionTypeFailure: actionConstants.GET_USER_PERMISSIONS_FAILURE,
    actionTypeRequest: actionConstants.GET_USER_PERMISSIONS_REQUEST,
    extra: null,
  };
  return { type: actionConstants.GET_USER_PERMISSIONS_ACTION, payload };
};

export const clearUserPermissions = () => {
  return { type: actionConstants.GET_USER_PERMISSIONS_CLEAR };
};

export const postPincode = (pincode, key) => {
  const payload = {
    serviceMethod: postPincodeApi.bind(null, { pinCode: pincode }),
    actionTypeSuccess: actionConstants.POST_PINCODE_SUCCESS,
    actionTypeFailure: actionConstants.POST_PINCODE_FAILURE,
    actionTypeRequest: actionConstants.POST_PINCODE_REQUEST,
    extra: { key },
  };
  return { type: actionConstants.POST_PINCODE_ACTION, payload };
};

export const clearPincodeState = () => {
  return { type: actionConstants.POST_PINCODE_CLEAR };
};
