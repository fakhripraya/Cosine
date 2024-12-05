import { createSlice } from "@reduxjs/toolkit";
import { IUserSavedLocation } from "../../../../interfaces/building";
import { IChatData } from "../../../../interfaces/chat";
import { IUserData } from "../../../../interfaces/credential";
import { IErrorMessage } from "../../../../interfaces/error";
import { defaultError } from "../../../../variables/global";
import { PAGE_LOADING_MESSAGE } from "../../../../variables/constants/home";

export const HOME_SLICE_KEY = "home_slice";

export interface HomeState {
  user: IUserData | null;
  balance: number;
  rendered: boolean;
  showErrorMessage: IErrorMessage;
  showPageLoadingMessage: string;
  showTopUpMenu: boolean;
  showHeaderMenu: boolean;
  showSidebar: boolean;
  showMobileSidebar: boolean;
  isLoading: boolean;
  chats: IChatData[];
  savedLocations: IUserSavedLocation[];
}

const initialState: HomeState = {
  user: null,
  balance: 0,
  rendered: false,
  showErrorMessage: defaultError,
  showPageLoadingMessage: PAGE_LOADING_MESSAGE,
  showTopUpMenu: false,
  showHeaderMenu: false,
  showSidebar: true,
  showMobileSidebar: false,
  isLoading: false,
  chats: [],
  savedLocations: [],
};

const homeSlice = createSlice({
  name: HOME_SLICE_KEY,
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setRendered: (state, action) => {
      state.rendered = action.payload;
    },
    setShowErrorMessage: (state, action) => {
      state.showErrorMessage = action.payload;
    },
    setShowPageLoadingMessage: (state, action) => {
      state.showPageLoadingMessage = action.payload;
    },
    setShowTopUpMenu: (state, action) => {
      state.showTopUpMenu = action.payload;
    },
    setShowHeaderMenu: (state, action) => {
      state.showHeaderMenu = action.payload;
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
  setBalance,
  setRendered,
  setShowErrorMessage,
  setShowPageLoadingMessage,
  setShowTopUpMenu,
  setShowHeaderMenu,
  setShowSidebar,
  setShowMobileSidebar,
  setLoading,
  setChats,
  setSavedLocations,
} = homeSlice.actions;

export default homeSlice.reducer;
