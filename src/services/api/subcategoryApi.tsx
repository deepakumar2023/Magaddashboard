// services/api/subcategoryApi.ts
import { api } from "./rootApi";

// ------------------------
// Types
// ------------------------
export interface ApiSubCategory {
  sub_category_id: string;
  sub_category_name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubCategory {
  id: number;
  sub_category_name: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface SubCategoryFilters {
  page?: number;
  limit?: number;
  sub_category_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

// Helper
export const normalizeSubCategory = (b: ApiSubCategory): SubCategory => ({
  id: Number(b.sub_category_id),
  sub_category_name: b.sub_category_name,
  status: Number(b.status),
  created_at: b.created_at,
  updated_at: b.updated_at,
});

// ------------------------
// RTK Query endpoints
// ------------------------
export const subCategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET all subcategories
    getSubCategories: builder.query<SubCategory[], SubCategoryFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.sub_category_name) params.append("sub_category_name", filters.sub_category_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);
        return `/sub-category?${params.toString()}`;
      },
      transformResponse: (response: ApiResponse<ApiSubCategory[]>) =>
        response.data.map(normalizeSubCategory),
    }),

    // GET single subcategory by ID
    getSubCategoryById: builder.query<SubCategory, number>({
      query: (id) => `/sub-category/edit/${id}`,
      transformResponse: (response: ApiResponse<ApiSubCategory>) =>
        normalizeSubCategory(response.data),
    }),

    // CREATE subcategory (FormData)
    createSubCategory: builder.mutation<ApiResponse<SubCategory>, Partial<SubCategory>>({
      query: (data) => {
        const formData = new FormData();
        if (data.sub_category_name) formData.append("sub_category_name", data.sub_category_name);
        if (data.status !== undefined) formData.append("status", String(data.status));
        return {
          url: "/sub-category/add",
          method: "POST",
          body: formData,
        };
      },
    }),

    // UPDATE subcategory (JSON)
    updateSubCategory: builder.mutation<ApiResponse<SubCategory>, SubCategory>({
      query: (data) => ({
        url: `/sub-category/update/${data.id}`,
        method: "PUT",
        body: {
          sub_category_name: data.sub_category_name,
          status: data.status,
        },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // DELETE subcategory
    deleteSubCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/sub-category/delete/${id}`,
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
  useGetSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
