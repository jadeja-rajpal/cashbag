import apiCall from "./apiRequest";
import endpoint from "./endpoints";

export const getUserDataApi = () => {
  return apiCall({
    method: "get",
    endpoint: `${endpoint.userData}`,
  });
};

export const getUserPermissionsApi = () => {
  return apiCall({
    method: "get",
    endpoint: `${endpoint.userPermissions}`,
  });
};

export const postPincodeApi = (query) => {
  return apiCall({
    method: "get",
    endpoint: `${endpoint.postPincode}`,
    query,
  });
};
