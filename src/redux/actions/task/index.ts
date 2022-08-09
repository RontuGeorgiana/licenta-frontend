import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import TASK_TYPES from '../../types/task.types';

export const getTasksByFolder = (folderId: number, filters?: any) => {
  return (dispatch: any) => {
    let apiURL = `${process.env.REACT_APP_API_URL}/tasks?folderId=${folderId}`;

    if (filters?.search && filters?.search !== '') {
      apiURL = apiURL + `&search=${filters?.search}`;
    }

    if (filters?.type && filters?.type !== '') {
      apiURL = apiURL + `&type=${filters?.type}`;
    }

    if (filters?.priority && filters?.priority !== undefined) {
      apiURL = apiURL + `&priority=${filters?.priority}`;
    }

    if (filters?.assignee && filters?.assignee !== '') {
      apiURL = apiURL + `&assignee=${filters?.assignee}`;
    }

    const token = getAuthToken();

    dispatch({
      type: TASK_TYPES.GET_TASK_STARTED,
    });
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TASK_TYPES.GET_TASK_SUCCESS,
          tasks: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TASK_TYPES.GET_TASK_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const getTaskById = (taskId: number) => {
  return (dispatch: any) => {
    const apiURL = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;

    const token = getAuthToken();
    dispatch({
      type: TASK_TYPES.GET_TASK_BY_ID_STARTED,
    });
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TASK_TYPES.GET_TASK_BY_ID_SUCCESS,
          task: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TASK_TYPES.GET_TASK_BY_ID_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const setTaskNull = () => {
  return (dispatch: any) => {
    dispatch({
      type: TASK_TYPES.GET_TASK_BY_ID_SUCCESS,
      task: null,
    });
  };
};

export const updateTask = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TASK_TYPES.EDIT_TASK_STARTED });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTaskById(data.taskId));
        dispatch(getTasksByFolder(data.folderId));
      })
      .catch((error) => {
        dispatch({
          type: TASK_TYPES.EDIT_TASK_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const createTask = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TASK_TYPES.CREATE_TASK_STARTED });
    return axios
      .post(`${process.env.REACT_APP_API_URL}/tasks/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTasksByFolder(data.folderId));
      })
      .catch((error) => {
        dispatch({
          type: TASK_TYPES.CREATE_TASK_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const deleteTask = (taskId: number, folderId: number) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TASK_TYPES.DELETE_TASK_STARTED });
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/tasks?taskId=${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTasksByFolder(folderId));
      })
      .catch((error) => {
        dispatch({
          type: TASK_TYPES.DELETE_TASK_ERROR,
          error: error.response?.data,
        });
      });
  };
};
