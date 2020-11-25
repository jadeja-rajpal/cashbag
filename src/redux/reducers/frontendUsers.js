import actionConstants from "../constants/ActionConstants";

const usersListState = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  data: [],
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  apiMsg: "",
};

const frontendUserDetail = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  data: null,
  message: "",
  apiMsg: "",
};

const statesCitiesListState = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  data: [],
  apiMsg: "",
};

const initialState = {
  statesCitiesListState: { ...statesCitiesListState },
  usersListState: { ...usersListState },
  frontendUserDetail: { ...frontendUserDetail },
};

let RESULT = {};

export default function frontendUsersReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.USERS_LIST_REQUEST:
      return {
        ...state,
        usersListState: {
          ...state.usersListState,
          isFetching: true,
          isSuccess: false,
          isError: false,
        },
      };
    case actionConstants.USERS_LIST_SUCCESS:
      RESULT =
        (action.payload.response && action.payload.response.result) || {};
      return {
        ...state,
        usersListState: {
          ...state.usersListState,
          isSuccess: true,
          isError: false,
          isFetching: false,
          data: RESULT.rows || [],
          totalItems: RESULT.totalItems || 0,
          totalPages: RESULT.totalPages || 0,
          currentPage: RESULT.currentPage || 0,
          apiMsg: action.payload.statusMessage,
        },
      };
    case actionConstants.USERS_LIST_FAILURE:
      return {
        ...state,
        usersListState: {
          ...state.usersListState,
          isError: true,
          isSuccess: false,
          isFetching: false,
          apiMsg: action.payload.statusMessage,
        },
      };
    case actionConstants.GET_FRONTEND_USER_DETAILS_REQUEST:
      return {
        ...state,
        frontendUserDetail: {
          ...state.frontendUserDetail,
          isFetching: true,
          isSuccess: false,
          isError: false,
        },
      };
    case actionConstants.GET_FRONTEND_USER_DETAILS_SUCCESS:
      return {
        ...state,
        frontendUserDetail: {
          ...state.frontendUserDetail,
          isSuccess: true,
          isError: false,
          isFetching: false,
          data: action.payload.response.result,
        },
      };
    case actionConstants.GET_FRONTEND_USER_DETAILS_FAILURE:
      return {
        ...state,
        frontendUserDetail: {
          ...state.frontendUserDetail,
          isError: true,
          isSuccess: false,
          isFetching: false,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.GET_FRONTEND_USER_DETAILS_CLEAR:
      return {
        ...state,
        frontendUserDetail,
      };
    case actionConstants.USERS_LIST_CLEAR:
      return {
        ...state,
        usersListState: {
          ...usersListState,
        },
      };

    case actionConstants.ALL_STATES_CITIES_REQUEST:
      return {
        ...state,
        statesCitiesListState: {
          ...statesCitiesListState,
          isFetching: true,
        },
      };
    case actionConstants.ALL_STATES_CITIES_SUCCESS:
      return {
        ...state,
        statesCitiesListState: {
          ...initialState.statesCitiesListState,
          isSuccess: true,
          data: action.payload.response && action.payload.response.result,
          apiMsg: action.payload.statusMessage,
        },
      };
    case actionConstants.ALL_STATES_CITIES_FAILURE:
      return {
        ...state,
        statesCitiesListState: {
          ...initialState.statesCitiesListState,
          isError: true,
          apiMsg: action.payload.statusMessage,
        },
      };
    case actionConstants.ALL_STATES_CITIES_CLEAR:
      return {
        ...state,
        statesCitiesListState: {
          ...initialState.statesCitiesListState,
        },
      };

    default:
      return { ...state };
  }
}
