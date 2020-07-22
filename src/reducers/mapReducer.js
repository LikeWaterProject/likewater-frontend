import {
  SET_DEFAULT_POSITION,
  SET_CURRENT_POSITION,
  SET_MARKER_POSITION,
  SET_MAP_POSITION,
  SET_USE_GEOLOCATION,
} from "../actions";

const defaultPosition = JSON.parse(localStorage.getItem(SET_DEFAULT_POSITION)) ?? [
  -74.0,
  40.73,
];

const INITIAL_STATE = {
  markerPosition: null,
  currentPosition: null,
  defaultPosition: defaultPosition,
  mapPosition: defaultPosition,
  shouldUseGeolocation: false,
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
        currentPosition: payload,
      };
    case SET_MAP_POSITION:
      return {
        ...state,
        mapPosition: payload,
      }
    case SET_DEFAULT_POSITION:
      return {
        ...state,
        defaultPosition: payload,
      };
    case SET_USE_GEOLOCATION:
      return {
        ...state,
        shouldUseGeolocation: payload,
      };
    default:
      return state;
  }
};
