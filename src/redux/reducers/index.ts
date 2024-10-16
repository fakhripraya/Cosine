import { combineReducers } from "@reduxjs/toolkit";
import homeSlice, { HomeState } from "./pages/home";

export interface RootState {
  home: HomeState;
}

const rootReducer = combineReducers({
  home: homeSlice,
});

export default rootReducer;
