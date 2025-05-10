import type {
  CraftSimpleType,
  CraftSliceInitialStateType,
  CraftType,
} from "./types";

import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: CraftSliceInitialStateType = {
  crafts: [],
  craft: null,
  types: [],
};

export const craftSlice = createSlice({
  name: "craft",
  initialState,
  reducers: {
    setCraft: (state, action: PayloadAction<CraftType | null>) => {
      state.craft = action.payload;
    },
    setTypes: (state, action: PayloadAction<string[]>) => {
      state.types = action.payload;
    },
    setCrafts: (state, action: PayloadAction<CraftSimpleType[]>) => {
      state.crafts = action.payload;
    },
    addCraft: (state, action: PayloadAction<CraftSimpleType>) => {
      state.crafts = [...state.crafts, action.payload];
    },
    removeCraft: (state, action: PayloadAction<number>) => {
      state.crafts = state.crafts.filter((c) => c.id !== action.payload);
    },
    updateCraft: (state, action: PayloadAction<CraftSimpleType>) => {
      state.crafts = state.crafts.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCraft,
  removeCraft,
  setCraft,
  setCrafts,
  setTypes,
  updateCraft,
} = craftSlice.actions;

export default craftSlice.reducer;
