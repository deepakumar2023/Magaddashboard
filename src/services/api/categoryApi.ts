import { api } from "./rootApi";

// ------------------------
// Category Interfaces
// ------------------------
export interface Category {
  id: number;
  category_name: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryFilters {
  page?: number;
  limit?: number;
  category_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

export interface CategoryResponse {
  status: boolean;
  message: string;
  data?: Category | Category[];
  errors?: Record<string, string>;
}

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get categories with filters
    getCategory: builder.query<Category[], CategoryFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.category_name) params.append("category_name", filters.category_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);

        return `/category?${params.toString()}`;
      },
      transformResponse: (response: any) => response.data || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map((category) => ({ type: "Category" as const, id: category.id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    // ✅ Get category by ID
    getCategoryById: builder.query<Category, number>({
      query: (id) => `/category/edit/${id}`,
      transformResponse: (response: any) => {
        const cat = response.data;
        return {
          id: Number(cat.category_id),
          category_name: cat.category_name,
          status: Number(cat.status),
          created_at: cat.created_at,
          updated_at: cat.updated_at,
        };
      },
    }),

    // ✅ Create category
    createCategory: builder.mutation<CategoryResponse, FormData>({
      query: (formData) => ({
        url: "/category/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }], // ❌ invalidate cache after create
    }),

    // ✅ Update category
    updateCategory: builder.mutation<CategoryResponse, Category>({
      query: (data) => ({
        url: "/category/update",
        method: "PUT",
        body: {
          category_id: data.id,
          category_name: data.category_name,
          status: data.status,
        },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }], // ❌ invalidate cache after update
    }),

    // ✅ Delete category
    deleteCategory: builder.mutation<CategoryResponse, number>({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }], // ❌ invalidate cache after delete
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
