import { SET_DEFAULT_POSITION, SET_MARKER_POSITION } from ".";
import { SET_CURRENT_POSITION } from "./types";

export const setMarkerPosition = (coordinates) => {
  return {
    type: SET_MARKER_POSITION,
    payload: coordinates,
  };
};

export const setDefaultPosition = (coordinates) => {
  localStorage.setItem(SET_DEFAULT_POSITION, JSON.stringify(coordinates));
  return {
    type: SET_DEFAULT_POSITION,
    payload: coordinates,
  };
};

export const setCurrentPosition = (position) => {
  return {
    type: SET_CURRENT_POSITION,
    payload: position,
  };
};
