// services/api/authApi.ts
import { api } from "./rootApi";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: any },
      FormData // Changed to FormData type
    >({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
        // Headers explicitly set for FormData
        headers: {
          // Don't set Content-Type - browser will set it automatically with boundary
        },
      }),
    }),
    
    // Agar aapko regular JSON bhi bhejna hai toh alag endpoint
    loginJson: builder.mutation<
      { token: string; user: any },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLoginJsonMutation } = authApi;