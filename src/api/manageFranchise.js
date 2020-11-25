import apiCall from "./apiRequest";
import endpoint from "./endpoints";

const getFranchiseApi = (query) => {
  return apiCall({
    method: "get",
    endpoint: `${endpoint.getFranchise}`,
    query: {
      ...query,
    },
  });
};

export default getFranchiseApi;
