import { api } from "./rootApi";

export interface Board {
  id: number;
  board_name: string;
  status: number;
  created_at?: string;
};

// API Response interfaces
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface BoardResponse extends Board {
  board_id?: number; // Some responses might use board_id instead of id
}

export interface BoardListResponse {
  data?: Board[];
  boards?: Board[];
  items?: Board[];
  results?: Board[];
  total?: number;
  totalCount?: number;
  page?: number;
  totalPages?: number;
}

export interface BoardFilters {
  page?: number;
  limit?: number;
  board_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get boards with filters
    getBoards: builder.query<BoardListResponse, BoardFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.board_name) params.append("board_name", filters.board_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);

        return `/board?${params.toString()}`;
      },
    }),

    // ✅ Get board by ID
  // ✅ Get board by ID
getBoardById: builder.query<Board, number>({
  query: (id) => `/board/edit/${id}`,
  transformResponse: (response: any): Board => ({
    id: response.data.board_id,
    board_name: response.data.board_name,
    status: Number(response.data.status),
    created_at: response.data.created_at,
  }),
}),

    // ✅ Create board (FormData)
    createBoard: builder.mutation<ApiResponse<Board>, Partial<Board>>({
      query: (data) => {
        const formData = new FormData();
        if (data.board_name) formData.append("board_name", data.board_name);
        if (data.status !== undefined) formData.append("status", String(data.status));

        return {
          url: "/board/add",
          method: "POST",
          body: formData,
        };
      },
    }),

    updateBoard: builder.mutation<ApiResponse<Board>, Board>({
      query: (data) => ({
        url: "/board/update",
        method: "PUT",
        body: {
          board_id: data.id,
          board_name: data.board_name,
          status: data.status,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // ✅ Delete board
    deleteBoard: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/board/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;