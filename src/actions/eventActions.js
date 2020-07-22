import {
  FETCH_EVENTS,
  FETCH_EVENT_TYPES,
  FETCH_EVENT_DETAILS,
  SET_EVENT_FILTER,
} from ".";
import API from "../api";

export const getEvents = ({
  coordinates,
  radius = 75000,
  userToken = "UNASSIGNED",
}) => async (dispatch) => {
  const result = await API.post("/getevents", {
    coordinates,
    radius,
    userToken,
  });
  dispatch({
    type: FETCH_EVENTS,
    payload: result.data,
  });
};

export const getEventTypes = () => async (dispatch) => {
  const result = await API.get("/geteventtypes");
  dispatch({
    type: FETCH_EVENT_TYPES,
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

export const reportEvent = ({
  coordinates,
  eventCategory,
  eventType,
  eventDesc,
}) => async (dispatch, getState) => {
  const userToken = getState().user.userToken ?? "UNASSIGNED";
  const result = await API.post("/reportevent", {
    coordinates,
    eventCategory,
    eventType,
    eventDesc,
    userToken,
  });
  dispatch(getEvents({ coordinates, userToken }));
};

export const respondToEvent = ({ eventId, eventActive }) => async (
  dispatch,
  getState
) => {
  const userToken = getState().user.userToken ?? "UNASSIGNED";
  const response = await API.post("/respondtoevent", {
    eventId,
    eventActive,
    userToken,
  });
  console.log(response);
  if (response.status === 200) {
    // Mark event as confirmed/denied for this user
  }
};

export const setEventFilter = (filters = {}) => {
  return {
    type: SET_EVENT_FILTER,
    payload: filters,
  };
};
