import {
  getFrontendUserDetailsApi,
  getAllStatesCitiesApi,
  getUsersListApi,
} from "api/frontendUsers";
import actionConstants from "../constants/ActionConstants";

export const getUsersListAction = (value) => {
  const payload = {
    serviceMethod: getUsersListApi.bind(null, value),
    actionTypeSuccess: actionConstants.USERS_LIST_SUCCESS,
    actionTypeFailure: actionConstants.USERS_LIST_FAILURE,
    actionTypeRequest: actionConstants.USERS_LIST_REQUEST,
  };
  return { type: actionConstants.USERS_LIST_ACTION, payload };
};

export const getFrontendUserDetails = (id) => {
  const payload = {
    serviceMethod: getFrontendUserDetailsApi.bind(null, id),
    actionTypeSuccess: actionConstants.GET_FRONTEND_USER_DETAILS_SUCCESS,
    actionTypeFailure: actionConstants.GET_FRONTEND_USER_DETAILS_FAILURE,
    actionTypeRequest: actionConstants.GET_FRONTEND_USER_DETAILS_REQUEST,
  };
  return { type: actionConstants.GET_FRONTEND_USER_DETAILS_ACTION, payload };
};

export const clearFrontendUserDetails = () => {
  return { type: actionConstants.GET_FRONTEND_USER_DETAILS_CLEAR };
};

export const clearUsersListAction = () => {
  return { type: actionConstants.USERS_LIST_CLEAR };
};

export const getAllStatesCitiesAction = () => {
  const payload = {
    serviceMethod: getAllStatesCitiesApi.bind(null),
    actionTypeSuccess: actionConstants.ALL_STATES_CITIES_SUCCESS,
    actionTypeFailure: actionConstants.ALL_STATES_CITIES_FAILURE,
    actionTypeRequest: actionConstants.ALL_STATES_CITIES_REQUEST,
  };
  return { type: actionConstants.ALL_STATES_CITIES_ACTION, payload };
};

export const clearAllStatesCitiesAction = () => {
  return { type: actionConstants.ALL_STATES_CITIES_CLEAR };
};
