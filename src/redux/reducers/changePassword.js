import actionConstants from "../constants/ActionConstants";

const changePasswordState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  data: [],
  message: "",
};

const initialState = {
  changePasswordState: { ...changePasswordState },
};

export default function changePassword(state = initialState, action) {
  switch (action.type) {
    case actionConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordState: {
          ...state.changePasswordState,
          isSuccess: true,
          isError: false,
          isLoading: false,
          data: action.payload.response.result,
          message: action.payload.statusMessage,
        },
      };
    case actionConstants.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordState: {
          ...state.changePasswordState,
          isSuccess: false,
          isError: true,
          isLoading: false,
          data: [],
          message: action.payload.statusMessage,
        },
      };
    case actionConstants.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordState: {
          ...state.changePasswordState,
          isSuccess: false,
          isError: false,
          isLoading: true,
          data: [],
          message: "",
        },
      };
    case actionConstants.CHANGE_PASSWORD_CLEAR:
      return initialState;
    default:
      return state;
  }
}
