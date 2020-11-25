import apiCall from "./apiRequest";
import endpoint from "./endpoints";

export const getUsersListApi = (values) => {
  return apiCall({
    method: "get",
    endpoint: endpoint.usersList,
    query: {
      ...values,
    },
  });
};

export const getFrontendUserDetailsApi = (id) => {
  return apiCall({
    method: "get",
    endpoint: endpoint.userDetail(id),
  });
};

export const getAllStatesCitiesApi = () => {
  return apiCall({
    method: "get",
    endpoint: endpoint.allStatesCities,
  });
};

export const getAllStatesApi = () => {
  return apiCall({
    method: "get",
    endpoint: endpoint.allStates,
  });
};
