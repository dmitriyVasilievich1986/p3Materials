import type {
  MaterialSimpleType,
  MaterialSliceInitialStateType,
  MaterialType,
} from "./types";

import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: MaterialSliceInitialStateType = {
  materials: [],
  material: null,
};

export const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setMaterial: (state, action: PayloadAction<MaterialType | null>) => {
      state.material = action.payload;
    },
    setMaterials: (state, action: PayloadAction<MaterialSimpleType[]>) => {
      state.materials = action.payload;
    },
    addMaterial: (state, action: PayloadAction<MaterialSimpleType>) => {
      state.materials = [...state.materials, action.payload];
    },
    removeMaterial: (state, action: PayloadAction<number>) => {
      state.materials = state.materials.filter((m) => m.id !== action.payload);
    },
    updateMaterial: (state, action: PayloadAction<MaterialSimpleType>) => {
      state.materials = state.materials.map((m) =>
        m.id === action.payload.id ? action.payload : m
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addMaterial,
  removeMaterial,
  setMaterial,
  setMaterials,
  updateMaterial,
} = materialSlice.actions;

export default materialSlice.reducer;
