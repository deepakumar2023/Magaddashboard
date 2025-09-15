import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api"; // ✅ your RTK Query API service

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // only RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
