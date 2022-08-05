import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import { IUpdateMember } from '../../../interfaces/updateMember.interface';
import MEMBERSHIP_TYPES from '../../types/membership.types';

export const getMembershipsByTeam = (teamId: number, search: string = '') => {
  return (dispatch: any) => {
    let apiURL = `${process.env.REACT_APP_API_URL}/memberships`;

    if (search && search !== '') {
      apiURL = apiURL + `?search=${search}`;
    }

    const token = getAuthToken();

    dispatch({
      type: MEMBERSHIP_TYPES.GET_MEMBERSHIP_STARTED,
    });
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          teamId,
        },
      })
      .then((response) => {
        dispatch({
          type: MEMBERSHIP_TYPES.GET_MEMBERSHIP_SUCCESS,
          memberships: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: MEMBERSHIP_TYPES.GET_MEMBERSHIP_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const updateMembership = (data: IUpdateMember) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: MEMBERSHIP_TYPES.UPDATE_MEMBERSHIP_STARTED });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/memberships/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getMembershipsByTeam(data.teamId));
      })
      .catch((error) => {
        dispatch({
          type: MEMBERSHIP_TYPES.UPDATE_MEMBERSHIP_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const addMembership = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: MEMBERSHIP_TYPES.CREATE_MEMBERSHIP_STARTED });
    return axios
      .post(`${process.env.REACT_APP_API_URL}/memberships/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getMembershipsByTeam(data.teamId));
      })
      .catch((error) => {
        dispatch({
          type: MEMBERSHIP_TYPES.CREATE_MEMBERSHIP_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const deleteMembership = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: MEMBERSHIP_TYPES.DELETE_MEMBERSHIP_STARTED });
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/memberships/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          teamId: data.teamid,
          userId: data.userid,
          self: false,
        },
      })
      .then(() => {
        dispatch(getMembershipsByTeam(data.teamid));
      })
      .catch((error) => {
        dispatch({
          type: MEMBERSHIP_TYPES.DELETE_MEMBERSHIP_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const onSearchMembership = (search: string) => ({
  type: MEMBERSHIP_TYPES.SET_MEMBERSHIP_SEARCH,
  payload: search,
});
