import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ShadowSliceInitialStateType, ShadowType } from "./types";

const initialState: ShadowSliceInitialStateType = {
  shadows: [],
  shadow: null,
};

export const shadowSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setShadow: (state, action: PayloadAction<ShadowType<number> | null>) => {
      state.shadow = action.payload;
    },
    setShadows: (state, action: PayloadAction<ShadowType<number>[]>) => {
      state.shadows = action.payload;
    },
    addShadow: (state, action: PayloadAction<ShadowType<number>>) => {
      state.shadows = [...state.shadows, action.payload];
    },
    removeShadow: (state, action: PayloadAction<number>) => {
      state.shadows = state.shadows.filter((s) => s.id !== action.payload);
    },
    updateShadow: (state, action: PayloadAction<ShadowType<number>>) => {
      state.shadows = state.shadows.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShadow, setShadows, addShadow, removeShadow, updateShadow } =
  shadowSlice.actions;

export default shadowSlice.reducer;
