// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import boardReducer from "../features/boardSlice";
import categoryReducer from "../features/categorySlice";
import { boardApi } from "../services/api/boardApi"; // import your RTK Query api

export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    category: categoryReducer,
    // ✅ add RTK Query reducer
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware), // ✅ add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
