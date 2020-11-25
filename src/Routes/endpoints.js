export default {
  default: "/",
  admin: "/admin",
  login: "/login",
  forgotPassword: "/forgot-password",
  changePassword: "/change-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  frontendUsers: "/frontend-users",
  frontendUserDetails: "/frontend-users/details",
  manageFranchise: "/franchise",
  viewFranchise: (franchiseId) => `/franchise/details/${franchiseId}`,
};
