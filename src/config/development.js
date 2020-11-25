const API = {
  BASE_URL: process.env.REACT_APP_DEV_API,
  PLATFORM: process.env.REACT_APP_PLATFORM,
  API_ID: process.env.REACT_APP_API_SITE_ID,
  VERSION: process.env.REACT_APP_VERSION,
};

const DEV_TOOLS = {
  enableReduxDevTools: true,
  logError: true,
};

module.exports = {
  API,
  DEV_TOOLS,
};
