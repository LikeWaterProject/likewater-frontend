import {
  SET_DEFAULT_POSITION,
  SET_CURRENT_POSITION,
  SET_MARKER_POSITION,
} from "../actions";

const INITIAL_STATE = {
  markerPosition: null,
  currentPositon: null,
  defaultPosition: JSON.parse(localStorage.getItem(SET_DEFAULT_POSITION)) ?? [
    -74.0,
    40.73,
  ],
  showBasicMapFeatures: true,
  showVolumetricBuildings: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_MARKER_POSITION:
      return {
        ...state,
        markerPosition: payload,
      };
    case SET_CURRENT_POSITION:
      return {
        ...state,
        currentPositon: payload,
      };
    case SET_DEFAULT_POSITION:
      return {
        ...state,
        defaultPosition: payload,
      };
    default:
      return state;
  }
};
