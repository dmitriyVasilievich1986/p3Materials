import { configureStore } from "@reduxjs/toolkit";
import { materialSlice } from "./reducers/materialSlice";
import { shadowSlice } from "./reducers/shadowSlice";

export const store = configureStore({
  reducer: {
    shadow: shadowSlice.reducer,
    material: materialSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
