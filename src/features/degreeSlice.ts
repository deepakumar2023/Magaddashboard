import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Degree } from "../services/api/degreeApi";

interface DegreeState {
  degrees: Degree[];
}

const initialState: DegreeState = {
  degrees: [],
};

const degreeSlice = createSlice({
  name: "degree",
  initialState,
  reducers: {
    setDegrees: (state, action: PayloadAction<Degree[]>) => {
      state.degrees = action.payload;
    },
    addDegree: (state, action: PayloadAction<Degree>) => {
      state.degrees.push(action.payload);
    },
    updateDegree: (state, action: PayloadAction<Degree>) => {
      const index = state.degrees.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.degrees[index] = { ...state.degrees[index], ...action.payload };
      }
    },
    removeDegree: (state, action: PayloadAction<number>) => {
      state.degrees = state.degrees.filter((d) => d.id !== action.payload);
    },
  },
});

export const { setDegrees, addDegree, updateDegree, removeDegree } = degreeSlice.actions;
export default degreeSlice.reducer;
