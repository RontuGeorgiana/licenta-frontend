import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import FOLDER_TYPES from '../../types/folder.types';

export const getFoldersBySpace = (spaceId: number) => {
  return (dispatch: any) => {
    const apiURL = `${process.env.REACT_APP_API_URL}/folders`;

    const token = getAuthToken();

    dispatch({
      type: FOLDER_TYPES.GET_FOLDER_STARTED,
    });
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          spaceId,
        },
      })
      .then((response) => {
        dispatch({
          type: FOLDER_TYPES.GET_FOLDER_SUCCESS,
          folders: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FOLDER_TYPES.GET_FOLDER_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const selectFolder = (folder: any) => {
  return (dispatch: any) => {
    dispatch({
      folder,
      type: FOLDER_TYPES.SELECT_FOLDER,
    });
  };
};

export const selectTeamByFolder = (folderId: number) => {
  return (dispatch: any) => {
    const apiURL = `${process.env.REACT_APP_API_URL}/folders/team`;

    const token = getAuthToken();

    dispatch({
      type: FOLDER_TYPES.GET_FOLDER_TEAM_STARTED,
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
          type: FOLDER_TYPES.GET_FOLDER_TEAM_SUCCESS,
          team: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FOLDER_TYPES.GET_FOLDER_TEAM_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const editFolder = (data: any, spaceId: number) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: FOLDER_TYPES.EDIT_FOLDER_STARTED });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/folders`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getFoldersBySpace(spaceId));
      })
      .catch((error) => {
        dispatch({
          type: FOLDER_TYPES.EDIT_FOLDER_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const deleteFolder = (folderId: number, spaceId: number) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: FOLDER_TYPES.DELETE_FOLDER_STARTED });
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/folders?folderId=${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getFoldersBySpace(spaceId));
      })
      .catch((error) => {
        dispatch({
          type: FOLDER_TYPES.DELETE_FOLDER_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const createFolder = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: FOLDER_TYPES.CREATE_FOLDER_STARTED });
    return axios
      .post(`${process.env.REACT_APP_API_URL}/folders/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getFoldersBySpace(data.spaceId));
      })
      .catch((error) => {
        dispatch({
          type: FOLDER_TYPES.CREATE_FOLDER_ERROR,
          error: error.response?.data,
        });
      });
  };
};
