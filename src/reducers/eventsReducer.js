import { FETCH_EVENTS, FETCH_EVENT_DETAILS, UPDATE_EVENT } from "../actions";

const INITIAL_STATE = {
  dangerClose: false,
  nearbyEvents: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        nearbyEvents: payload,
      };
    default:
      return state;
  }
};
