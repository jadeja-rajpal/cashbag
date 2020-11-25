import moment from "moment";

export const AUTH_ACCESS_TOKEN = "TOKEN_CASHBAG";

export const setToken = (token) => {
  localStorage.setItem(AUTH_ACCESS_TOKEN, token);
};

export const checkIsToken = () => {
  return Boolean(localStorage.getItem(AUTH_ACCESS_TOKEN));
};

export const getToken = () => {
  return localStorage.getItem(AUTH_ACCESS_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_ACCESS_TOKEN);
  localStorage.removeItem("adminId"); // TODO remove it from local storage afterwards
};

export function toUpperCase(str) {
  if (str) {
    const array = str.split(" ");
    const newArr = array.map((data) => {
      return data && data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    });
    return newArr.join(" ");
  }
  return "";
}

export function toUpperCaseFirstLetter(str) {
  return str && str.charAt(0).toUpperCase();
}

export function removeEmptyObject(data, byPassKey) {
  const newObj = {};
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      if (
        typeof data[key] === "string" ||
        typeof data[key] === "number" ||
        typeof data[key] === "boolean"
      ) {
        newObj[key] = data[key];
      } else if (Object.keys(data[key]).length) {
        newObj[key] = data[key];
      } else if (key === byPassKey) {
        newObj[key] = data[key];
      }
    }
  });
  return newObj;
}

export function removeUneditedFields(currentData, prevData) {
  const newObj = {};
  const keysCurrent = Object.keys(currentData);
  keysCurrent.forEach((key) => {
    if (currentData[key] !== prevData[key]) {
      newObj[key] = currentData[key];
    }
  });
  return newObj;
}

export const urlToParamsObj = (str) => {
  const array1 = str.split("?");
  const array2 = array1.map((data) => {
    return data.split("&");
  });
  const obj = {};
  array2[1].forEach((data) => {
    const temp = data.split("=");
    obj[temp[0]] = [...temp[1]];
  });
  return obj;
};

export function totalPage(count, limit = 10) {
  const total = Math.ceil(count / limit);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(total) ? 1 : total;
}

export function apiDateFormat(date, format = "YYYYMMDD") {
  if (date) {
    return moment(date).format(format).toString();
  }
  return "";
}
export const calculateOffSetWithPage = (page, limit = 10) => {
  const offSet = (page - 1) * limit;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(offSet)) {
    return 0;
  }
  return offSet;
};

export const timeFormatorTextField = (time) => {
  if (time && time.length) {
    return time.slice(0, 16);
  }
  return null;
};
