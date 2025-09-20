import { api } from "./rootApi";

// ------------------------
// Religion Interfaces
// ------------------------
export interface Religion {
  id: number;
  religion_name: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface ReligionFilters {
  page?: number;
  limit?: number;
  religion_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

// Optional wrapper for API responses that include messages/errors
export interface ReligionResponse {
  status: boolean;
  message: string;
  data?: Religion | Religion[];
  errors?: Record<string, string>;
}

export const religionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get religions with filters
    getReligion: builder.query<Religion[], ReligionFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.religion_name) params.append("religion_name", filters.religion_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);

        return `/religion?${params.toString()}`;
      },
      transformResponse: (response: any) => {
        return response.data || [];
      },
    }),

    // ✅ Get religion by ID
    getReligionById: builder.query<Religion, number>({
      query: (id) => `/religion/edit/${id}`,
      transformResponse: (response: any) => {
        const rel = response.data;
        return {
          id: Number(rel.religion_id),
          religion_name: rel.religion_name,
          status: Number(rel.status),
          created_at: rel.created_at,
          updated_at: rel.updated_at,
        };
      },
    }),

    // ✅ Create religion (FormData)
    createReligion: builder.mutation<ReligionResponse, FormData>({
      query: (formData) => ({
        url: "/religion/add",
        method: "POST",
        body: formData,
      }),
    }),

    // ✅ Update religion
    updateReligion: builder.mutation<ReligionResponse, Religion>({
      query: (data) => ({
        url: "/religion/update",
        method: "PUT",
        body: {
          religion_id: data.id,
          religion_name: data.religion_name,
          status: data.status,
        }
      }),
    }),

    // ✅ Delete religion
    deleteReligion: builder.mutation<ReligionResponse, number>({
      query: (id) => ({
        url: `/religion/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReligionQuery,
  useGetReligionByIdQuery,
  useCreateReligionMutation,
  useUpdateReligionMutation,
  useDeleteReligionMutation,
} = religionApi;
