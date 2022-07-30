import axios from 'axios';
import { getAuthToken, getUserId } from '../../../auth/utils/utils';
import TEAM_TYPES from '../../types/team.types';

export const getTeams = () => {
  return (dispatch: any) => {
    const apiURL = `${process.env.REACT_APP_API_URL}/teams`;

    const token = getAuthToken();

    dispatch({
      type: TEAM_TYPES.GET_TEAMS_STARTED,
    });
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEAM_TYPES.GET_TEAMS_SUCCESS,
          teams: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TEAM_TYPES.GET_TEAMS_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const addTeam = (teamName: string) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TEAM_TYPES.ADD_TEAM_STARTED });
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}/teams/create-team`,
        { name: teamName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: TEAM_TYPES.ADD_TEAM_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const renameTeam = (teamId: number, newName: string) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TEAM_TYPES.EDIT_TEAM_STARTED });
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}/teams/rename-team/${teamId}`,
        null,
        {
          params: {
            newName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: TEAM_TYPES.EDIT_TEAM_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const deleteTeam = (teamId: number) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TEAM_TYPES.DELETE_TEAM_STARTED });
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: TEAM_TYPES.DELETE_TEAM_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const leaveTeam = (teamId: number) => {
  console.log(getUserId());

  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: TEAM_TYPES.LEAVE_TEAM_STARTED });
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/memberships/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          teamId: teamId,
          self: true,
        },
      })
      .then(() => {
        dispatch(getTeams());
      })
      .catch((error) => {
        dispatch({
          type: TEAM_TYPES.LEAVE_TEAM_ERROR,
          error: error.response?.data,
        });
      });
  };
};
