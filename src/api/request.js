import apiCall from "./apiRequest";
// import { clearToken } from '../libs/token'; TODO at the time of api call

function handleError(e) {
  if (
    e.response &&
    (e.response.body.errorCode === "UNAUTHORIZED" ||
      e.response.body.code === "UNAUTHORIZED")
  ) {
    // clearToken();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  throw e;
}

export const GETRequest = (endpoint, query) =>
  apiCall({
    method: "GET",
    endpoint,
    query,
  }).catch((e) => {
    handleError(e);
  });

export const POSTRequest = (endpoint, payload) =>
  apiCall({
    method: "POST",
    payload,
    endpoint,
  }).catch((e) => {
    handleError(e);
  });

export const POSTRequestFile = (endpoint, payload) =>
  apiCall({
    method: "POST",
    payload,
    endpoint,
    type: "multipart/form-data",
  }).catch((e) => {
    handleError(e);
  });

export const POSTRequestFileCsv = (endpoint, payload) =>
  apiCall({
    method: "POST",
    payload,
    endpoint,
    type: "fileCsv",
  }).catch((e) => {
    handleError(e);
  });

export const PUTRequest = (endpoint, payload) =>
  apiCall({
    method: "PUT",
    payload,
    endpoint,
  }).catch((e) => {
    handleError(e);
  });

export const DeleteRequest = (endpoint, payload) =>
  apiCall({
    method: "DELETE",
    payload,
    endpoint,
  }).catch((e) => {
    handleError(e);
  });

export default {
  GETRequest,
  POSTRequest,
  PUTRequest,
};
