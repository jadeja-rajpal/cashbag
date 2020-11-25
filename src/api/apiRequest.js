import superagent from "superagent";
import config from "config";
import { getToken } from "./helperFunction";

const { API } = config;

/*
 * @function "call" common method that makes api requests
 * @param {object} "request" stores the request 'method','endpoint', 'payload', 'query',
 * 'token' as keys...'
 */
export default function call({
  method = "get",
  url,
  endpoint,
  payload,
  query,
  type = "application/json",
  requestType = "json",
}) {
  const _url = `${API.BASE_URL}/${endpoint}`;
  const request = superagent(method, endpoint ? _url : url);
  if (requestType !== "image") {
    request.set("Content-Type", type);
    request.set("cb-site-id", API.API_ID);
    request.set("cb-platform", API.PLATFORM);
    request.set("cb-version", API.VERSION);
    request.set("cb-access-token", getToken());
  }
  return request.send(payload).query(query);
}
