import { SET_DEFAULT_POSITION, SET_EVENT_FILTER } from ".";

export const setDefaultPosition = (coordinates) => {
  localStorage.setItem(SET_DEFAULT_POSITION, JSON.stringify(coordinates));
  return {
    type: SET_DEFAULT_POSITION,
    payload: coordinates,
  };
};

export const setEventFilter = (filters = []) => {
  localStorage.setItem(SET_EVENT_FILTER, JSON.stringify(filters));
  return {
    type: SET_EVENT_FILTER,
    payload: filters,
  };
};
