import getFranchiseApi from "api/manageFranchise";
import { PAGE_SIZE } from "libs/constants";
import actionConstants from "../constants/ActionConstants";

export const getFranchise = ({ userRole, page, id }) => {
  let queryPayload = {};
  if (userRole) {
    queryPayload = { ...queryPayload, userRole };
  }
  if (page) {
    queryPayload = { ...queryPayload, page, limit: PAGE_SIZE };
  }
  if (id) {
    queryPayload = { ...queryPayload, id };
  }
  const payload = {
    serviceMethod: getFranchiseApi.bind(null, queryPayload),
    actionTypeSuccess: actionConstants.GET_FRANCHISE_SUCCESS,
    actionTypeFailure: actionConstants.GET_FRANCHISE_FAILURE,
    actionTypeRequest: actionConstants.GET_FRANCHISE_REQUEST,
    extra: null,
  };
  return { type: actionConstants.GET_FRANCHISE_ACTION, payload };
};

export const clearGetFranchise = () => {
  return {
    type: actionConstants.GET_FRANCHISE_CLEAR,
  };
};

export const getFranchiseDetail = (queryPayload) => {
  const payload = {
    serviceMethod: getFranchiseApi.bind(null, queryPayload),
    actionTypeSuccess: actionConstants.GET_FRANCHISE_DETAIL_SUCCESS,
    actionTypeFailure: actionConstants.GET_FRANCHISE_DETAIL_FAILURE,
    actionTypeRequest: actionConstants.GET_FRANCHISE_DETAIL_REQUEST,
    extra: null,
  };
  return { type: actionConstants.GET_FRANCHISE_DETAIL_ACTION, payload };
};

export const clearFranchiseDetail = () => {
  return {
    type: actionConstants.GET_FRANCHISE_DETAIL_CLEAR,
  };
};
