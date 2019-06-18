import thunk from "redux-thunk";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import baseReducer from "./reducers/baseReducer";

const middleware = [thunk];
const initialState = {};

export const store = createStore(
  baseReducer,
  initialState,
  applyMiddleware(...middleware)
);
