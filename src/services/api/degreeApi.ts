import { api } from "./rootApi";

// ------------------------
// Types
// ------------------------

// API response type from backend
export interface ApiDegree {
  degree_id: string;
  degree_name: string;
  degree_name_hindi?: string;
  title?: string;
  duration: number;
  exam_type: string;
  degree_code: string;
  degree_no: string;
  degree_type: string;
  inter_stream?: string;
  session?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

// Normalized frontend type
export interface Degree {
  id: number;
  degree_name: string;
  degree_name_hindi?: string;
  title?: string;
  duration: number;
  exam_type: string;
  degree_code: string;
  degree_no: string;
  degree_type: string;
  inter_stream?: string;
  session?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

// Filters for GET request
export interface DegreeFilters {
  page?: number;
  limit?: number;
  degree_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

// Helper to normalize API response
export const normalizeDegree = (d: ApiDegree): Degree => ({
  id: Number(d.degree_id),
  degree_name: d.degree_name,
  degree_name_hindi: d.degree_name_hindi,
  title: d.title,
  duration: d.duration,
  exam_type: d.exam_type,
  degree_code: d.degree_code,
  degree_no: d.degree_no,
  degree_type: d.degree_type,
  inter_stream: d.inter_stream,
  session: d.session,
  status: d.status !== undefined ? Number(d.status) : 1,
  created_at: d.created_at,
  updated_at: d.updated_at,
});

// ------------------------
// RTK Query endpoints
// ------------------------
export const degreeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET all degrees
    getDegrees: builder.query<Degree[], DegreeFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.degree_name) params.append("degree_name", filters.degree_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);

        return `/degree?${params.toString()}`;
      },
      transformResponse: (response: any) => response.data.map(normalizeDegree),
    }),

    // GET single degree by ID
    getDegreeById: builder.query<Degree, number>({
      query: (id) => `/degree/edit/${id}`,
      transformResponse: (response: any) => normalizeDegree(response.data),
    }),

    // CREATE degree (FormData)
    createDegree: builder.mutation<Degree, Partial<Degree>>({
      query: (data) => {
        const formData = new FormData();
        if (data.degree_name) formData.append("degree_name", data.degree_name);
        if (data.degree_name_hindi) formData.append("degree_name_hindi", data.degree_name_hindi);
        if (data.title) formData.append("title", data.title);
        if (data.duration !== undefined) formData.append("duration", String(data.duration));
        if (data.exam_type) formData.append("exam_type", data.exam_type);
        if (data.degree_code) formData.append("degree_code", data.degree_code);
        if (data.degree_no) formData.append("degree_no", data.degree_no);
        if (data.degree_type) formData.append("degree_type", data.degree_type);
        if (data.inter_stream) formData.append("inter_stream", data.inter_stream);
        if (data.session) formData.append("session", data.session);
        if (data.status !== undefined) formData.append("status", String(data.status));

        return {
          url: "/degree/add",
          method: "POST",
          body: formData,
        };
      },
    }),

    // UPDATE degree (JSON body)
    updateDegree: builder.mutation<Degree, Degree>({
      query: (data) => ({
        url: `/degree/update/${data.id}`,
        method: "PUT",
        body: {
          degree_name: data.degree_name,
          degree_name_hindi: data.degree_name_hindi,
          title: data.title,
          duration: data.duration,
          exam_type: data.exam_type,
          degree_code: data.degree_code,
          degree_no: data.degree_no,
          degree_type: data.degree_type,
          inter_stream: data.inter_stream,
          session: data.session,
          status: data.status,
        },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // DELETE degree
    deleteDegree: builder.mutation<void, number>({
      query: (id) => ({
        url: `/degree/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// ------------------------
// Export hooks
// ------------------------
export const {
  useGetDegreesQuery,
  useGetDegreeByIdQuery,
  useCreateDegreeMutation,
  useUpdateDegreeMutation,
  useDeleteDegreeMutation,
} = degreeApi;
