import { api } from "./rootApi";

export interface College {
  id: number;
  college_name: string;
  college_type: string;
  district_id: number;
  state_id: number;
  status: number;
  created_at?: string;
  college_code?: number;
  college_address?: string;
  pin?: number;
  degree_type?: string;
  principal_name?: string;
  group_status?: number;
  gtype?: string;
}

export interface CollegeFilters {
  page?: number;
  limit?: number;
  college_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

// Backend response type for create/update
export interface CollegeResponse {
  status: boolean;
  message: string;
  data?: College;
  errors?: any;
}

export const collegeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getColleges: builder.query<College[], CollegeFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.college_name) params.append("college_name", filters.college_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);
        return `/college?${params.toString()}`;
      },
    }),

    getCollegeById: builder.query<College, number>({
      query: (id) => `/college/edit/${id}`,
      transformResponse: (response: any) => {
        const c = response.data;
        return {
          id: c.id,
          college_name: c.college_name,
          college_type: c.college_type,
          district_id: Number(c.district_id),
          state_id: Number(c.state_id),
          status: Number(c.status),
          college_code: c.college_code,
          college_address: c.college_address,
          pin: c.pin,
          degree_type: c.degree_type,
          principal_name: c.principal_name,
          group_status: c.group_status,
          gtype: c.gtype,
          created_at: c.created_at,
        };
      },
    }),

    // ✅ Fix: createCollege now returns CollegeResponse
    createCollege: builder.mutation<CollegeResponse, FormData>({
      query: (formData) => ({
        url: "/college/add",
        method: "POST",
        body: formData,
      }),
    }),

    deleteCollege: builder.mutation<void, number>({
      query: (id) => ({
        url: `/college/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCollegesQuery,
  useGetCollegeByIdQuery,
  useCreateCollegeMutation,
  useDeleteCollegeMutation,
} = collegeApi;
