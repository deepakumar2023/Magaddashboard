// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import boardReducer from "../features/boardSlice";
import categoryReducer from "../features/categorySlice";
import subCategoryReducer from "../features/subCategorySlice"; // ✅ new slice
import degreeReducer from "../features/degreeSlice";
import { api } from "../services/api/rootApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer, // ✅ added
    degree: degreeReducer,
    [api.reducerPath]: api.reducer, // RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
