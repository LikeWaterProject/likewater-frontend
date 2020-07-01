import { INITIALIZE_USER, INVALIDATE_USER } from "./types";
import { v4 as uuidv4 } from "uuid";
import { addDays } from "date-fns";

export const initializeUser = () => {
  let { userToken, validUntil } =
    JSON.parse(localStorage.getItem(INITIALIZE_USER)) ?? {};
  if (!userToken || !validUntil || Date.now() > validUntil) {
    userToken = uuidv4();
    validUntil = addDays(Date.now(), 1).getTime();
    localStorage.setItem(
      INITIALIZE_USER,
      JSON.stringify({ userToken, validUntil })
    );
  }
  return { type: INITIALIZE_USER, payload: { userToken, validUntil } };
};

export const invalidateUser = () => {
  localStorage.removeItem(INITIALIZE_USER);
  return { type: INVALIDATE_USER };
};
