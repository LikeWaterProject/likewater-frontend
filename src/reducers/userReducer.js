import { INITIALIZE_USER, INVALIDATE_USER } from "../actions";

const INITIAL_STATE = {
  userToken: null,
  validUntil: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case INITIALIZE_USER:
      return payload;
    case INVALIDATE_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
