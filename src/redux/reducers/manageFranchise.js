import actionConstants from "../constants/ActionConstants";

const getFranchiseState = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  data: [],
  apiMsg: "",
};

const franchiseDetailState = {
  isError: false,
  isSuccess: false,
  isFetching: false,
  data: [],
  message: "",
};

const initialState = {
  getFranchiseState: { ...getFranchiseState },
  franchiseDetailState: { ...franchiseDetailState },
};

export default function manageFranchise(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_FRANCHISE_REQUEST:
      return {
        ...state,
        getFranchiseState: {
          ...initialState.getFranchiseState,
          isFetching: true,
        },
      };

    case actionConstants.GET_FRANCHISE_FAILURE:
      return {
        ...state,
        getFranchiseState: {
          ...state.getFranchiseState,
          isFetching: false,
          isError: true,
          isSuccess: false,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.GET_FRANCHISE_SUCCESS:
      return {
        ...state,
        getFranchiseState: {
          ...state.getFranchiseState,
          isFetching: false,
          isError: false,
          isSuccess: true,
          data: action.payload.response.result,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.GET_FRANCHISE_CLEAR:
      return {
        ...state,
        getFranchiseState: {
          ...initialState.getFranchiseState,
        },
      };

    case actionConstants.GET_FRANCHISE_DETAIL_REQUEST:
      return {
        ...state,
        franchiseDetailState: {
          ...initialState.franchiseDetailState,
          isFetching: true,
        },
      };

    case actionConstants.GET_FRANCHISE_DETAIL_FAILURE:
      return {
        ...state,
        franchiseDetailState: {
          ...state.franchiseDetailState,
          isFetching: false,
          isError: true,
          isSuccess: false,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.GET_FRANCHISE_DETAIL_SUCCESS:
      return {
        ...state,
        franchiseDetailState: {
          ...state.franchiseDetailState,
          isFetching: false,
          isError: false,
          isSuccess: true,
          data: action.payload.response.result,
          apiMsg: action.payload.statusMessage,
        },
      };

    case actionConstants.GET_FRANCHISE_DETAIL_CLEAR:
      return {
        ...state,
        franchiseDetailState: {
          ...initialState.franchiseDetailState,
        },
      };

    default:
      return {
        ...state,
      };
  }
}
