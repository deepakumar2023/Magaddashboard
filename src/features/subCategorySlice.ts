// features/subCategorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubCategory } from "../services/api/subcategoryApi";

interface SubCategoryState {
  subCategories: SubCategory[];
}

const initialState: SubCategoryState = {
  subCategories: [],
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategories: (state, action: PayloadAction<SubCategory[]>) => {
      state.subCategories = action.payload;
    },
    addSubCategory: (state, action: PayloadAction<SubCategory>) => {
      state.subCategories.push(action.payload);
    },
    updateSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index = state.subCategories.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state.subCategories[index] = action.payload;
    },
    removeSubCategory: (state, action: PayloadAction<number>) => {
      state.subCategories = state.subCategories.filter((s) => s.id !== action.payload);
    },
  },
});

export const { setSubCategories, addSubCategory, updateSubCategory, removeSubCategory } =
  subCategorySlice.actions;

export default subCategorySlice.reducer;
