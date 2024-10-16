import { createSlice } from "@reduxjs/toolkit";

const homeReducer = createSlice({
  name: "home_reducer",
  initialState: {
    isLoading: false,
    savedLocations: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSavedLocation: (state, action) => {
      state.savedLocations = action.payload;
    },
  },
});

export const { setLoading, setSavedLocation } =
  homeReducer.actions;
export default homeReducer.reducer;
