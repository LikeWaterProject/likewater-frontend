import {
  FETCH_EVENTS,
  FETCH_EVENT_TYPES,
  SET_EVENT_FILTER,
  UPDATE_EVENT,
} from "../actions";
import * as EventType from "../events/types";

const INITIAL_STATE = {
  dangerClose: false,
  nearbyEvents: [],
  eventTypes: null,
  eventFilters: {
    [EventType.AID]: true,
    [EventType.INFO]: true,
    [EventType.POLICE]: true,
    [EventType.SAFETY]: true,
    [EventType.EMERGENCY]: true,
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        nearbyEvents: payload,
      };
    case FETCH_EVENT_TYPES:
      return {
        ...state,
        eventTypes: payload,
      };
    case SET_EVENT_FILTER:
      return {
        ...state,
        eventFilters: {
          ...state.eventFilters,
          ...payload,
        },
      };
    default:
      return state;
  }
};
