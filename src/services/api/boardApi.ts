// import { api } from "./rootApi";

// export interface Board {
//   id: number;
//   board_name: string;
//   status: number;
//   created_at?: string;
// };

// export interface BoardFilters {
//   page?: number;
//   limit?: number;
//   board_name?: string;
//   status?: number;
//   from_date?: string;
//   to_date?: string;
// }

// export const boardApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Get boards with filters
//     getBoards: builder.query<Board[], BoardFilters>({
//       query: (filters) => {
//         const params = new URLSearchParams();
//         if (filters.page) params.append("page", filters.page.toString());
//         if (filters.limit) params.append("limit", filters.limit.toString());
//         if (filters.board_name) params.append("board_name", filters.board_name);
//         if (filters.status !== undefined) params.append("status", filters.status.toString());
//         if (filters.from_date) params.append("from_date", filters.from_date);
//         if (filters.to_date) params.append("to_date", filters.to_date);

//         return `/board?${params.toString()}`;
//       },
//     }),

//     // ✅ Get board by ID
//     getBoardById: builder.query<Board, number>({
//       query: (id) => `/board/edit/${id}`,
//       transformResponse: (response: any) => {
//         return {
//           id: response.data.board_id,
//           board_name: response.data.board_name,
//           status: Number(response.data.status),
//         };
//       },
//     }),


//     // ✅ Create board (FormData)
//     createBoard: builder.mutation<Board, Partial<Board>>({
//       query: (data) => {
//         const formData = new FormData();
//         if (data.board_name) formData.append("board_name", data.board_name);
//         if (data.status !== undefined) formData.append("status", String(data.status));

//         return {
//           url: "/board/add",
//           method: "POST",
//           body: formData,
//         };
//       },
//     }),

//     updateBoard: builder.mutation<Board, Board>({
//       query: (data) => ({
//         url: "/board/update", // ✅ no /:id in URL
//         method: "PUT",       // ✅ backend expects POST not PUT
//         body: {
//           board_id: data.id,         // map `id` to `board_id`
//           board_name: data.board_name,
//           status: data.status,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),

//     // ✅ Delete board
//     deleteBoard: builder.mutation<void, number>({
//       query: (id) => ({
//         url: `/board/delete/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetBoardsQuery,
//   useGetBoardByIdQuery,
//   useCreateBoardMutation,
//   useUpdateBoardMutation,
//   useDeleteBoardMutation,
// } = boardApi;


import { api } from "./rootApi";

// API response type from backend
export interface ApiBoard {
  board_id: string;
  board_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Normalized Board type used in frontend
export interface Board {
  id: number;
  board_name: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

// Filters for GET request
export interface BoardFilters {
  page?: number;
  limit?: number;
  board_name?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

// Helper to normalize backend response
export const normalizeBoard = (b: ApiBoard): Board => ({
  id: Number(b.board_id),
  board_name: b.board_name,
  status: Number(b.status),
  created_at: b.created_at,
  updated_at: b.updated_at,
});

// RTK Query endpoints
export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET all boards with filters
    getBoards: builder.query<Board[], BoardFilters>({
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
      transformResponse: (response: any) => {
        return response.data.map(normalizeBoard);
      },
    }),

    // GET single board by ID
    getBoardById: builder.query<Board, number>({
      query: (id) => `/board/edit/${id}`,
      transformResponse: (response: any) => normalizeBoard(response.data),
    }),

    // CREATE board
    createBoard: builder.mutation<Board, Partial<Board>>({
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

    // UPDATE board
    updateBoard: builder.mutation<Board, Board>({
      query: (data) => ({
        url: "/board/update",
        method: "PUT",
        body: {
          board_id: data.id,
          board_name: data.board_name,
          status: data.status,
        },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // DELETE board
    deleteBoard: builder.mutation<void, number>({
      query: (id) => ({
        url: `/board/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
