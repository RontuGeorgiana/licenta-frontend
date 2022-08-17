import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import COMMENT_TYPES from '../../types/comment.types';
import { getTaskById } from '../task';

export const addComment = (data: any) => {
  return (dispatch: any) => {
    const url = `${process.env.REACT_APP_API_URL}/comments`;

    const token = getAuthToken();

    dispatch({ type: COMMENT_TYPES.ADD_COMMENT_STARTED });
    return axios
      .post(
        url,
        { taskId: data.taskId, text: data.text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        dispatch(getTaskById(data.taskId, data.teamId));
      })
      .catch((error) => {
        dispatch({
          type: COMMENT_TYPES.ADD_COMMENT_ERROR,
          error: error.response?.data,
        });
      });
  };
};
