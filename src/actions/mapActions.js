import {
  SET_CURRENT_POSITION,
  SET_USE_GEOLOCATION,
  SET_DEFAULT_POSITION,
  SET_MARKER_POSITION,
} from "./types";

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

export const setUseGeolocation = (preferred) => async (dispatch) => {
  localStorage.setItem(SET_USE_GEOLOCATION, JSON.stringify(!!preferred));
  const { state: permitted } = await navigator.permissions.query({
    name: "geolocation",
  });

  dispatch({
    type: SET_USE_GEOLOCATION,
    payload: !!preferred,
  });

  if (!preferred) dispatch(setCurrentPosition(null));
};

export const initializeGeolocation = () => async (dispatch, getState) => {
  const preferred =
    JSON.parse(localStorage.getItem(SET_USE_GEOLOCATION));

  let permitted;
  navigator.permissions
    .query({ name: "geolocation" })
    .then((permissionStatus) => {
      permitted = permissionStatus.state;
      permissionStatus.onchange = ({ target: { state: permitted } }) => {
        dispatch({
          type: SET_USE_GEOLOCATION,
          payload:
            getState().map.shouldUseGeolocation && permitted === "granted",
        });
      };
    });

  dispatch({
    type: SET_USE_GEOLOCATION,
    payload: preferred && permitted === "granted",
  });
};
