import COMMENT_TYPES from '../../types/comment.types';

const initialState = {
  isLoading: false,
  error: null,
};

const commentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case COMMENT_TYPES.ADD_COMMENT_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_TYPES.ADD_COMMENT_ERROR:
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default commentReducer;
