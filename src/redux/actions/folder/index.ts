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
