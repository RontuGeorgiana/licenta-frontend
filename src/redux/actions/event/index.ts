import axios from 'axios';
import { getAuthToken } from '../../../auth/utils/utils';
import { EVENT_TYPES } from '../../types/event.types';

export const getEvents = (teamId: number, filters?: any) => {
  return (dispatch: any) => {
    let apiUrl = `${process.env.REACT_APP_API_URL}/events?teamId=${teamId}`;

    if (filters?.start) {
      apiUrl = apiUrl + `&start=${filters?.start}`;
    }

    if (filters?.end) {
      apiUrl = apiUrl + `&end=${filters?.end}`;
    }

    if (filters?.type) {
      apiUrl = apiUrl + `&type=${filters?.type}`;
    }

    const token = getAuthToken();

    dispatch({
      type: EVENT_TYPES.GET_EVENTS_STARTED,
    });
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: EVENT_TYPES.GET_EVENTS_SUCCESS,
          events: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: EVENT_TYPES.GET_EVENTS_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const createEvent = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: EVENT_TYPES.CREATE_EVENT_STARTED });
    return axios
      .post(`${process.env.REACT_APP_API_URL}/events`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getEvents(data.teamId));
        dispatch(getPendingEvents(data.teamId));
      })
      .catch((error) => {
        dispatch({
          type: EVENT_TYPES.CREATE_EVENT_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const getEvent = (eventId: number, teamId: number) => {
  return (dispatch: any) => {
    let apiUrl = `${process.env.REACT_APP_API_URL}/events/event/${eventId}?teamId=${teamId}`;

    const token = getAuthToken();

    dispatch({
      type: EVENT_TYPES.GET_EVENT_STARTED,
    });
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: EVENT_TYPES.GET_EVENT_SUCCESS,
          event: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: EVENT_TYPES.GET_EVENT_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const deleteEvent = (eventId: number, teamId: number) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: EVENT_TYPES.DELETE_EVENT_STARTED });
    return axios
      .delete(
        `${process.env.REACT_APP_API_URL}/events/${eventId}?teamId=${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        dispatch(getEvents(teamId));
        dispatch(getPendingEvents(teamId));
      })
      .catch((error) => {
        dispatch({
          type: EVENT_TYPES.DELETE_EVENT_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const getPendingEvents = (teamId: number) => {
  return (dispatch: any) => {
    let apiUrl = `${process.env.REACT_APP_API_URL}/events/pending?teamId=${teamId}`;

    const token = getAuthToken();

    dispatch({
      type: EVENT_TYPES.GET_PENDING_EVENTS_STARTED,
    });
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: EVENT_TYPES.GET_PENDING_EVENTS_SUCCESS,
          events: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: EVENT_TYPES.GET_PENDING_EVENTS_ERROR,
          error: error.response?.data,
        });
      });
  };
};

export const resolveEvent = (data: any) => {
  return (dispatch: any) => {
    const token = getAuthToken();

    dispatch({ type: EVENT_TYPES.RESOLVE_EVENT_STARTED });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/events/resolve`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(getPendingEvents(data.teamId));
        dispatch(getEvents(data.teamId));
      })
      .catch((error) => {
        dispatch({
          type: EVENT_TYPES.RESOLVE_EVENT_ERROR,
          error: error.response?.data,
        });
      });
  };
};
