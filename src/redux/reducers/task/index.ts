import TASK_TYPES from '../../types/task.types';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TASK_TYPES.GET_TASK_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TASK_TYPES.GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        tasks: action.tasks,
      };
    case TASK_TYPES.GET_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default taskReducer;
