import MEMBERSHIP_TYPES from '../../types/membership.types';

const initialState = {
  memberships: [],
  isLoading: false,
  error: null,
  filters: {
    search: null,
  },
};

const membershipReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case (MEMBERSHIP_TYPES.GET_MEMBERSHIP_STARTED,
    MEMBERSHIP_TYPES.UPDATE_MEMBERSHIP_STARTED,
    MEMBERSHIP_TYPES.CREATE_MEMBERSHIP_STARTED):
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MEMBERSHIP_TYPES.GET_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        memberships: action.memberships,
      };
    case (MEMBERSHIP_TYPES.GET_MEMBERSHIP_ERROR,
    MEMBERSHIP_TYPES.UPDATE_MEMBERSHIP_ERROR,
    MEMBERSHIP_TYPES.CREATE_MEMBERSHIP_ERROR):
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case MEMBERSHIP_TYPES.SET_MEMBERSHIP_SEARCH:
      return {
        ...state,
        filters: {
          search: action.payload,
        },
      };
    default:
      return state;
  }
};

export default membershipReducer;
