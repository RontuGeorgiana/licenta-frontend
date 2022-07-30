import SPACE_TYPES from '../../types/space.types';
import TEAM_TYPES from '../../types/team.types';

const initialState = {
  teams: [],
  isLoading: false,
  error: null,
};

const teamReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case (TEAM_TYPES.GET_TEAMS_STARTED,
    TEAM_TYPES.ADD_TEAM_STARTED,
    TEAM_TYPES.EDIT_TEAM_STARTED,
    TEAM_TYPES.DELETE_TEAM_STARTED,
    SPACE_TYPES.ADD_SPACE_STARTED,
    SPACE_TYPES.EDIT_SPACE_STARTED):
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TEAM_TYPES.GET_TEAMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        teams: action.teams,
      };
    case (TEAM_TYPES.GET_TEAMS_ERROR,
    TEAM_TYPES.ADD_TEAM_ERROR,
    TEAM_TYPES.EDIT_TEAM_ERROR,
    TEAM_TYPES.DELETE_TEAM_ERROR,
    SPACE_TYPES.ADD_SPACE_ERROR,
    SPACE_TYPES.EDIT_SPACE_ERROR):
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default teamReducer;
