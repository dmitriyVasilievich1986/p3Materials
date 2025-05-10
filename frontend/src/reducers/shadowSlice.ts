import type {
  ArcanaType,
  FloorType,
  ShadowSimpleType,
  ShadowSliceInitialStateType,
  ShadowType,
} from "./types";

import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ShadowSliceInitialStateType = {
  shadows: [],
  shadow: null,
  arcanas: [],
  damageModifiers: [],
  floors: [],
};

export const shadowSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setArcanas: (state, action: PayloadAction<ArcanaType[]>) => {
      state.arcanas = action.payload;
    },
    setDamageModifiers: (state, action: PayloadAction<string[]>) => {
      state.damageModifiers = action.payload;
    },
    setShadow: (state, action: PayloadAction<ShadowType | null>) => {
      state.shadow = action.payload;
    },
    setShadows: (state, action: PayloadAction<ShadowSimpleType[]>) => {
      state.shadows = action.payload;
    },
    addShadow: (state, action: PayloadAction<ShadowSimpleType>) => {
      state.shadows = [...state.shadows, action.payload];
    },
    addFloors: (state, action: PayloadAction<FloorType[]>) => {
      state.floors = [...state.floors, ...action.payload];
    },
    setFloors: (state, action: PayloadAction<FloorType[]>) => {
      state.floors = action.payload;
    },
    removeShadow: (state, action: PayloadAction<number>) => {
      state.shadows = state.shadows.filter((s) => s.id !== action.payload);
    },
    updateShadow: (state, action: PayloadAction<ShadowSimpleType>) => {
      state.shadows = state.shadows.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addFloors,
  addShadow,
  removeShadow,
  setArcanas,
  setDamageModifiers,
  setFloors,
  setShadow,
  setShadows,
  updateShadow,
} = shadowSlice.actions;

export default shadowSlice.reducer;
