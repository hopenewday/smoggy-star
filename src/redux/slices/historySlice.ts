import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  viewedArticles: string[];
}

const initialState: HistoryState = {
  viewedArticles: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addViewedArticle(state, action: PayloadAction<string>) {
      if (!state.viewedArticles.includes(action.payload)) {
        state.viewedArticles.push(action.payload);
      }
    },
    clearHistory(state) {
      state.viewedArticles = [];
    },
  },
});

export const { addViewedArticle, clearHistory } = historySlice.actions;
export default historySlice.reducer;