import { builder } from "./rootApi";

export interface Board {
  id: number;
  board_name: string;
  status: number;
  created_at: string;
}

export interface BoardFilters {
  page?: number;
  limit?: number; // Add this line
  board_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}


export const boardApi = builder.injectEndpoints({
  endpoints: (builder) => ({

    
    // ✅ Get boards with filters
    getBoards: builder.query<Board[], BoardFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.board_name) params.append("board_name", filters.board_name);
        if (filters.status !== undefined) params.append("status", filters.status.toString());
        if (filters.from_date) params.append("from_date", filters.from_date);
        if (filters.to_date) params.append("to_date", filters.to_date);

        return `/board?${params.toString()}`;
      },
    }),

    getBoardById: builder.query<Board, number>({
      query: (id) => `/board/edit/${id}`,
    }),

    createBoard: builder.mutation<Board, Partial<Board>>({
      query: (data) => ({
        url: "/board",
        method: "POST",
        body: data,
      }),
    }),

    updateBoard: builder.mutation<Board, { id: number; data: Partial<Board> }>({
      query: ({ id, data }) => ({
        url: `/board/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBoard: builder.mutation<void, number>({
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
