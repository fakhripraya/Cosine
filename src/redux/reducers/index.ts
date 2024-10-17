import { combineReducers } from "@reduxjs/toolkit";
import homeSlice, { HomeState } from "./pages/Home";
import detailBuildingSlice, {
  DetailBuildingState,
} from "./pages/DetailBuilding";

export interface RootState {
  home: HomeState;
  detailBuilding: DetailBuildingState;
}

const rootReducer = combineReducers({
  home: homeSlice,
  detailBuilding: detailBuildingSlice,
});

export default rootReducer;
