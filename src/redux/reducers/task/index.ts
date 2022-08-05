import TASK_TYPES from '../../types/task.types';

const initialState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
};

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TASK_TYPES.GET_TASK_STARTED:
    case TASK_TYPES.GET_TASK_BY_ID_STARTED:
    case TASK_TYPES.EDIT_TASK_STARTED:
    case TASK_TYPES.CREATE_TASK_STARTED:
    case TASK_TYPES.DELETE_TASK_STARTED:
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
    case TASK_TYPES.GET_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        selectedTask: action.task,
      };
    case TASK_TYPES.GET_TASK_ERROR:
    case TASK_TYPES.GET_TASK_BY_ID_ERROR:
    case TASK_TYPES.EDIT_TASK_ERROR:
    case TASK_TYPES.CREATE_TASK_ERROR:
    case TASK_TYPES.DELETE_TASK_ERROR:
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
