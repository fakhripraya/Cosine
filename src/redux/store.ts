import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

// Other configuration options can be provided here,
// Such as middleware, dev tools, etc.
export const store = configureStore({
  reducer: rootReducer,
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
