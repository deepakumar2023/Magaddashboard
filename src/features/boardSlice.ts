import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Board } from "../services/api/boardApi";


// interface Board {
//   id: number; // number
//   board_name: string;
//   status: number;
//   created_at?: string;
// }



// API Response board (raw from backend)
export interface ApiBoard {
  board_id: number;
  board_name: string;
  status: number;
  created_at: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  error?: string;
  data: T;
}

interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
  boards: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = {
          ...state.boards[index],   
          ...action.payload,       
        };
      }
    },

    removeBoard: (state, action: PayloadAction<number>) => {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
  },
});

export const { setBoards, addBoard, updateBoard, removeBoard } = boardSlice.actions;
export default boardSlice.reducer;
