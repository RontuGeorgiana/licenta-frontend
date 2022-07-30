import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import SPACE_TYPES from '../../types/space.types';
import { getTeams } from '../team';

export const addSpace = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: SPACE_TYPES.ADD_SPACE_STARTED });
    return axios
      .post(`${process.env.REACT_APP_API_URL}/spaces/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: SPACE_TYPES.ADD_SPACE_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const editSpace = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: SPACE_TYPES.EDIT_SPACE_STARTED });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/spaces/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: SPACE_TYPES.EDIT_SPACE_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const deleteSpace = (spaceId: number) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: SPACE_TYPES.DELETE_SPACE_STARTED });
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/spaces/${spaceId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: SPACE_TYPES.DELETE_SPACE_ERROR,
          error: error.response?.data,
        });
      });
  };
};
