import { combineReducers } from "@reduxjs/toolkit";
import homeSlice, {
  HomeState,
} from "./pages/home/index.ts";
import detailBuildingSlice, {
  DetailBuildingState,
} from "./pages/building/index.ts";

export interface RootState {
  home: HomeState;
  detailBuilding: DetailBuildingState;
}

const rootReducer = combineReducers({
  home: homeSlice,
  detailBuilding: detailBuildingSlice,
});

export default rootReducer;
