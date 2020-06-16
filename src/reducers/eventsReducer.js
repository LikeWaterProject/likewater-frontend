import { FETCH_EVENTS, SET_EVENT_FILTER, UPDATE_EVENT } from "../actions";

const INITIAL_STATE = {
  dangerClose: false,
  nearbyEvents: [],
  eventFilter: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        nearbyEvents: payload,
      };
    case SET_EVENT_FILTER:
      return {
        ...state,
        eventFilter: payload,
      };
    default:
      return state;
  }
};
