// TODO correct endpoints
export default {
  login: "CUMS/api/v1/franchise/login",
  verifyOtp: "CUMS/api/v1/franchise/login/verifyOtp",
  resendOtp: "CUMS/api/v1//franchise/login/resendOtp",
  forgotPassword: "CUMS/api/v1/franchise/forgotpassword",
  resetPassword: "CUMS/api/v1/franchise/resetPassword",
  changePassword: (id) => `CUMS/api/v1/franchise/updatePassword/${id}`,
  userListByRole: "CUMS/api/v1/user",
  usersList: "CUMS/api/v1/user/list",
  userDetail: (id) => `CUMS/api/v1/user/${id}`,
  allStatesCities: "CUMS/api/v1/generic/list/statecity",
  userData: "CUMS/api/v1/user/userDetail",
  userPermissions: "CUMS/api/v1/admin/userPermissions",
  postPincode: "CUMS/api/v1/generic/statecity",
  getFranchise: "CUMS/api/v1/franchise/list",
};
