import moment from "moment";

export function deepCloneObject(object = {}) {
  const stringifiedobject = JSON.stringify(object);
  return JSON.parse(stringifiedobject);
}

export function checkStringIsNumber(string = "") {
  return /^\d+$/.test(string);
}

export function isEmptyObject(object = {}) {
  return Object.keys(object).length === 0;
}

export function formatDate(date, format = "YYYY-MM-DD") {
  if (date) {
    return moment(date).format(format).toString();
  }
  return "";
}

export function formatDateTime(date, format = "YYYY-MM-DD, hh:mm:ss a") {
  if (date) {
    return moment(date).format(format).toString();
  }
  return "";
}

export default {
  deepCloneObject,
  checkStringIsNumber,
  formatDateTime,
  isEmptyObject,
  formatDate,
};
