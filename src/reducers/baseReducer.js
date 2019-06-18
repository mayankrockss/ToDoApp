import { combineReducers } from "redux";
import itemReducer from "../reducers/itemReducer";

export default combineReducers({
  items: itemReducer
});
