import { createSlice } from "@reduxjs/toolkit";

export const DETAIL_BUILDING_SLICE_KEY =
  "detail_building_slice";

export interface DetailBuildingState {
  rendered: boolean;
  selectedImage: number;
  failedImages: number[];
}

const initialState: DetailBuildingState = {
  rendered: false,
  selectedImage: 0,
  failedImages: [],
};

const detailBuildingSlice = createSlice({
  name: DETAIL_BUILDING_SLICE_KEY,
  initialState: initialState,
  reducers: {
    setRendered: (state, action) => {
      state.rendered = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    setFailedImages: (state, action) => {
      state.failedImages = action.payload;
    },
  },
});

export const {
  setRendered,
  setSelectedImage,
  setFailedImages,
} = detailBuildingSlice.actions;

export default detailBuildingSlice.reducer;
