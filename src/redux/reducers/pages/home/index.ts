import { createSlice } from "@reduxjs/toolkit";
import { IUserSavedLocation } from "../../../../interfaces/building";
import { IChatData } from "../../../../interfaces/chat";
import { IUserData } from "../../../../interfaces/credential";

export interface HomeState {
  user: IUserData | null;
  rendered: boolean;
  showSidebar: boolean;
  showMobileSidebar: boolean;
  isLoading: boolean;
  chats: IChatData[];
  savedLocations: IUserSavedLocation[];
}

const initialState: HomeState = {
  user: null,
  rendered: false,
  showSidebar: true,
  showMobileSidebar: false,
  isLoading: false,
  chats: [],
  savedLocations: [],
};

const homeSlice = createSlice({
  name: "home_slice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRendered: (state, action) => {
      state.rendered = action.payload;
    },
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setShowMobileSidebar: (state, action) => {
      state.showMobileSidebar = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSavedLocations: (state, action) => {
      state.savedLocations = action.payload;
    },
  },
});

export const {
  setUser,
  setRendered,
  setShowSidebar,
  setShowMobileSidebar,
  setLoading,
  setChats,
  setSavedLocations,
} = homeSlice.actions;

export default homeSlice.reducer;
