import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  score: number;
  lives: number;
}

const initialState: GameState = {
  score: 0,
  lives: 3,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    updateLives: (state, action: PayloadAction<number>) => {
      state.lives = action.payload;
    },
    resetGame: (state) => {
      state.score = 0;
      state.lives = 3;
    },
  },
});

export const { updateScore, updateLives, resetGame } = gameSlice.actions;
export default gameSlice.reducer;