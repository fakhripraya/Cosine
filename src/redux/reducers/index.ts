import { combineReducers } from "@reduxjs/toolkit";
import homeSlice, { HomeState } from "./pages/Home/index";
import detailBuildingSlice, {
  DetailBuildingState,
} from "./pages/DetailBuilding/index";

export interface RootState {
  home: HomeState;
  detailBuilding: DetailBuildingState;
}

const rootReducer = combineReducers({
  home: homeSlice,
  detailBuilding: detailBuildingSlice,
});

export default rootReducer;
