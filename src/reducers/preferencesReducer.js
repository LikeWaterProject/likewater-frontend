import { TOGGLE_THEME } from "../actions";

const INITIAL_STATE = {
  invertedTheme: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_THEME:
      return {
        ...state,
        invertedTheme: !state.invertedTheme,
      };
    default:
      return state;
  }
};
