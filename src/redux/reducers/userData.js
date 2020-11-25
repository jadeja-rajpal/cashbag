import actionConstants from "../constants/ActionConstants";

const userDataState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  data: null,
  message: "",
  statusCode: "",
};

const postPincodeState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  data: null,
  message: "",
  statusCode: "",
};

const initialState = {
  userDataState: { ...userDataState },
  postPincodeState: { ...postPincodeState },
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userDataState: {
          ...state.userDataState,
          isSuccess: true,
          isError: false,
          isLoading: false,
          data: action.payload.response.result,
          message: "",
        },
      };
    case actionConstants.GET_USER_DATA_FAILURE:
      return {
        ...state,
        userDataState: {
          ...state.userDataState,
          isSuccess: false,
          isError: true,
          isLoading: false,
          data: null,
          message: action.payload.statusMessage,
        },
      };
    case actionConstants.GET_USER_DATA_REQUEST:
      return {
        ...state,
        userDataState: {
          ...state.userDataState,
          isSuccess: false,
          isError: false,
          isLoading: true,
          data: null,
          message: "",
        },
      };
    case actionConstants.POST_PINCODE_SUCCESS:
      return {
        ...state,
        postPincodeState: {
          ...state.postPincodeState,
          isSuccess: true,
          isError: false,
          isLoading: false,
          data: action.payload.response.result,
          message: "",
          key: action.payload.extra.key,
        },
      };
    case actionConstants.POST_PINCODE_FAILURE:
      return {
        ...state,
        postPincodeState: {
          ...state.postPincodeState,
          isSuccess: false,
          isError: true,
          isLoading: false,
          data: null,
          message: action.payload.statusMessage,
          key: action.payload.extra.key,
        },
      };
    case actionConstants.POST_PINCODE_REQUEST:
      return {
        ...state,
        postPincodeState: {
          ...state.postPincodeState,
          isSuccess: false,
          isError: false,
          isLoading: true,
          data: null,
          message: "",
        },
      };
    case actionConstants.POST_PINCODE_CLEAR:
      return {
        ...state,
        postPincodeState: { postPincodeState },
      };
    default:
      return state;
  }
}
