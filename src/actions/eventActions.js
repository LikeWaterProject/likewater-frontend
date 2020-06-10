import API from "../api";
import { FETCH_EVENTS, FETCH_EVENT_DETAILS } from ".";

export const getEvents = (vicinity) => async (dispatch) => {
  const { lat, lon, radius = 5000 } = vicinity;

  const result = await API.post("/getevents", vicinity);
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

