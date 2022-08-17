import { EVENT_TYPES } from '../../types/event.types';

const initialState = {
  pendingEvents: [],
  events: [],
  selectedEvent: null,
  isLoading: false,
  error: null,
};

const eventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EVENT_TYPES.GET_EVENTS_STARTED:
    case EVENT_TYPES.GET_EVENT_STARTED:
    case EVENT_TYPES.CREATE_EVENT_STARTED:
    case EVENT_TYPES.DELETE_EVENT_STARTED:
    case EVENT_TYPES.GET_PENDING_EVENTS_STARTED:
    case EVENT_TYPES.RESOLVE_EVENT_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EVENT_TYPES.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events,
        isLoading: false,
        error: null,
      };
    case EVENT_TYPES.GET_EVENT_SUCCESS:
      return {
        ...state,
        selectedEvent: action.event,
        isLoading: false,
        error: null,
      };
    case EVENT_TYPES.GET_PENDING_EVENTS_SUCCESS:
      return {
        ...state,
        pendingEvents: action.events,
        isLoading: false,
        error: null,
      };
    case EVENT_TYPES.GET_EVENTS_ERROR:
    case EVENT_TYPES.GET_EVENT_ERROR:
    case EVENT_TYPES.CREATE_EVENT_ERROR:
    case EVENT_TYPES.DELETE_EVENT_ERROR:
    case EVENT_TYPES.GET_PENDING_EVENTS_ERROR:
    case EVENT_TYPES.RESOLVE_EVENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default eventReducer;
