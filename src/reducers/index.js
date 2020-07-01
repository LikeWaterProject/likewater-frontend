import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import eventsReducer from "./eventsReducer";
import mapReducer from "./mapReducer";
import preferencesReducer from "./preferencesReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  map: mapReducer,
  preferences: preferencesReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
