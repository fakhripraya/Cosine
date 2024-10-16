import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./home/homeReducer";

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
