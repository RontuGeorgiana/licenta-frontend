import FOLDER_TYPES from '../../types/folder.types';

const initialState = {
  folders: {},
  isLoading: false,
  error: null,
  selectedFolder: null,
  team: null,
};

const folderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FOLDER_TYPES.GET_FOLDER_STARTED:
    case FOLDER_TYPES.GET_FOLDER_TEAM_STARTED:
    case FOLDER_TYPES.EDIT_FOLDER_STARTED:
    case FOLDER_TYPES.DELETE_FOLDER_STARTED:
    case FOLDER_TYPES.CREATE_FOLDER_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FOLDER_TYPES.GET_FOLDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        folders: action.folders,
      };
    case FOLDER_TYPES.GET_FOLDER_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        team: action.team,
      };
    case FOLDER_TYPES.GET_FOLDER_ERROR:
    case FOLDER_TYPES.GET_FOLDER_TEAM_ERROR:
    case FOLDER_TYPES.EDIT_FOLDER_ERROR:
    case FOLDER_TYPES.DELETE_FOLDER_ERROR:
    case FOLDER_TYPES.CREATE_FOLDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case FOLDER_TYPES.SELECT_FOLDER:
      return {
        ...state,
        selectedFolder: action.folder,
      };
    default:
      return state;
  }
};

export default folderReducer;
