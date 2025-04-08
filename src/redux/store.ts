import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './slices/preferencesSlice';
import historyReducer from './slices/historySlice';
import recommendationsReducer from './slices/recommendationsSlice';

const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    history: historyReducer,
    recommendations: recommendationsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;