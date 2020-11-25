import actionConstants from "../constants/ActionConstants";

const loginState = {
  isError: false,
  isSuccess: false,
  user: {},
  isFetching: false,
  loggedIn: false,
  statusCode: null,
  hasVerified: false,
  isTempPassword: false,
  isActive: false,
  apiMsg: "",
};

const userState = {
  isError: false,
  isSuccess: false,
  user: {},
  isFetching: false,
};

const resendOtpState = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  loggedIn: false,
  statusCode: null,
  apiMsg: "",
};

const verifyOtpState = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  loggedIn: false,
  statusCode: null,
  apiMsg: "",
};

const forgotPassword = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  statusCode: null,
  apiMsg: "",
};

const resetPassword = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  statusCode: null,
  apiMsg: "",
};

const initialState = {
  loginState: { ...loginState },
  resendOtpState: { ...resendOtpState },
  verifyOtpState: { ...verifyOtpState },
  forgotPassword: { ...forgotPassword },
  resetPassword: { ...resetPassword },
  userState: { ...userState },
  loggedIn: false,
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case actionConstants.LOGIN_REQUEST:
      return {
        ...state,
        loginState: {
          ...initialState.loginState,
          isFetching: true,
        },
        loggedIn: false,
      };

    case actionConstants.LOGIN_FAILURE:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          isSuccess: false,
          isError: true,
          user: action.payload.response.result,
          isFetching: false,
          error: action.payload.statusMessage,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
        loggedIn: Boolean(
          action.payload.response &&
            action.payload.response.result &&
            action.payload.response.result.token
        ),
      };

    case actionConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          user: action.payload.response.result,
          isError: false,
          isSuccess: true,
          isFetching: false,
          statusCode: action.payload.statusCode,
          apiMsg: action.payload.statusMessage,
          hasVerified: Boolean(
            action.payload.response &&
              action.payload.response.result &&
              action.payload.response.result.token
          ),
          isTempPassword: action.payload.response.result.isTempPassword,
          isActive: action.payload.response.result.isActive,
        },
        loggedIn: Boolean(
          action.payload.response &&
            action.payload.response.result &&
            action.payload.response.result.token
        ),
      };

    case actionConstants.VERIFY_OTP_REQUEST:
      return {
        ...state,
        verifyOtpState: {
          ...initialState.verifyOtpState,
          isFetching: true,
        },
      };

    case actionConstants.VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifyOtpState: {
          ...state.verifyOtpState,
          isFetching: false,
          isError: true,
          isSuccess: false,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
        loggedIn: false,
      };

    case actionConstants.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpState: {
          ...state.verifyOtpState,
          isFetching: false,
          isError: false,
          isSuccess: true,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
        loginState: {
          ...state.loginState,
          user: action.payload.response.result,
          hasVerified: Boolean(
            action.payload.response &&
              action.payload.response.result &&
              action.payload.response.result.token
          ),
          isTempPassword: action.payload.response.result.isTempPassword,
          isActive: action.payload.response.result.isActive,
        },
        loggedIn: true,
      };

    case actionConstants.VERIFY_OTP_CLEAR:
      return {
        ...state,
        verifyOtpState: {
          ...initialState.verifyOtpState,
        },
      };

    case actionConstants.RESEND_OTP_REQUEST:
      return {
        ...state,
        resendOtpState: {
          ...initialState.resendOtpState,
          isFetching: true,
        },
      };

    case actionConstants.RESEND_OTP_FAILURE:
      return {
        ...state,
        resendOtpState: {
          ...state.resendOtpState,
          isFetching: false,
          isError: true,
          isSuccess: false,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.RESEND_OTP_SUCCESS:
      return {
        ...state,
        resendOtpState: {
          ...state.resendOtpState,
          isFetching: false,
          isError: false,
          isSuccess: true,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassword: {
          ...initialState.forgotPassword,
          isFetching: true,
        },
      };

    case actionConstants.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isFetching: false,
          isSuccess: false,
          isError: true,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isFetching: false,
          isSuccess: true,
          isError: false,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.FORGOT_PASSWORD_CLEAR:
      return {
        ...state,
        forgotPassword: {
          ...initialState.forgotPassword,
        },
      };

    case actionConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassword: {
          ...initialState.resetPassword,
          isFetching: true,
        },
      };

    case actionConstants.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isFetching: false,
          isSuccess: false,
          isError: true,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isFetching: false,
          isSuccess: true,
          isError: false,
          statusCode: action.payload.statusMessage,
          apiMsg: action.payload.statusMessage,
        },
        loginState: {
          ...state.loginState,
          isFetching: false,
          isSuccess: false,
          isError: false,
          user: action.payload.response.result,
          hasVerified: Boolean(
            action.payload.response &&
              action.payload.response.result &&
              action.payload.response.result.token
          ),
          isTempPassword: action.payload.response.result.isTempPassword,
          isActive: action.payload.response.result.isActive,
        },
        loggedIn: true,
      };
    case actionConstants.RESET_PASSWORD_CLEAR:
      return {
        ...state,
        resetPassword: {
          ...initialState.resetPassword,
        },
      };

    case actionConstants.GET_USER_PERMISSIONS_REQUEST:
      return {
        ...state,
        userState: {
          ...userState,
          isFetching: true,
        },
      };
    case actionConstants.GET_USER_PERMISSIONS_SUCCESS:
      return {
        ...state,
        userState: {
          ...userState,
          isSuccess: true,
          user: action.payload.response && action.payload.response.result,
          apiMsg: action.payload.statusMessage,
        },
      };
    case actionConstants.GET_USER_PERMISSIONS_FAILURE:
      return {
        ...state,
        userState: {
          ...userState,
          isError: true,
          apiMsg: action.payload.statusMessage,
        },
      };
    case actionConstants.GET_USER_PERMISSIONS_CLEAR:
      return {
        ...state,
        userState: {
          ...userState,
        },
      };

    case actionConstants.LOGIN_CLEAR_STATE:
    case actionConstants.RESET_ALL_REDUCERS:
      return initialState;

    default:
      return state;
  }
}
