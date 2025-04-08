import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  darkMode: boolean;
  language: string;
}

const initialState: PreferencesState = {
  darkMode: false,
  language: 'en',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { toggleDarkMode, setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;