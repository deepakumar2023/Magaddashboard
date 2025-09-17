import { builder } from "./rootApi";

export const authApi = builder.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: any }, { username: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
