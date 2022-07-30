import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import TASK_TYPES from '../../types/task.types';

export const getTasksByFolder = (folderId: number) => {
  return (dispatch: any) => {
    const apiURL = `${process.env.REACT_APP_API_URL}/tasks`;

    const token = getAuthToken();

    dispatch({
      type: TASK_TYPES.GET_TASK_STARTED,
    });
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          folderId,
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
