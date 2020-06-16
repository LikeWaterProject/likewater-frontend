import { FETCH_EVENTS, FETCH_EVENT_DETAILS, SET_EVENT_FILTER } from ".";
import API from "../api";

export const getEvents = ({ lat, lon, radius = 5000 }) => async (dispatch) => {
  const result = await API.post("/getevents", { lat, lon, radius });
  dispatch({
    type: FETCH_EVENTS,
    payload: result.data,
  });
};

export const getEventDetails = (eventId) => async (dispatch) => {
  const result = await API.post("/vieweventdetails", eventId);
  dispatch({
    type: FETCH_EVENT_DETAILS,
    payload: result.data,
  });
};

export const reportEvent = (report) => async (dispatch) => {
  const result = await API.post("/submitreport", report);
  dispatch({
    type: null,
  });
};

export const setEventFilter = (filters = []) => {
  localStorage.setItem(SET_EVENT_FILTER, JSON.stringify(filters));
  return {
    type: SET_EVENT_FILTER,
    payload: filters,
  };
};
