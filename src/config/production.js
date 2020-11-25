const API = {
  BASE_URL: process.env.REACT_APP_PROD_API,
  PLATFORM: process.env.REACT_APP_PLATFORM,
  API_ID: process.env.REACT_APP_API_SITE_ID,
  VERSION: process.env.REACT_APP_VERSION,
};

const DEV_TOOLS = {
  logError: true,
};

module.exports = {
  API,
  DEV_TOOLS,
};
