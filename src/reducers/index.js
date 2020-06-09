import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import eventsReducer from "./eventsReducer";
import preferencesReducer from "./preferencesReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  preferences: preferencesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
