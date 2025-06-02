import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchRelatedContent, calculateRelevancyScore } from '../../utils/cmsApi.js';

interface Recommendation {
  id: string;
  title: string;
  slug: string;
  score: number;
}

interface RecommendationsState {
  items: Recommendation[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch and score personalized recommendations.
 */
export const fetchRecommendations = createAsyncThunk<
  Recommendation[],
  { tags: string[]; categories: string[] }
>('recommendations/fetchRecommendations', async ({ tags, categories }) => {
  const related = await fetchRelatedContent(tags, categories);
  if (!related) return [];

  interface RelatedContentItem {
    id: string;
    title: string;
    url: string;
    tags: string[];
    categories: string[];
    publishedAt?: string; // calculateRelevancyScore uses this
  }

  const scored = related.map((item: RelatedContentItem) => ({
    id: item.id,
    title: item.title,
    slug: item.url, // In Recommendation interface, 'slug' maps to 'url' from RelatedContentItem
    score: calculateRelevancyScore(item, tags, categories),
  }));
  scored.sort((a: Recommendation, b: Recommendation) => b.score - a.score);
  return scored;
});

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendations(state, action: PayloadAction<Recommendation[]>) {
      state.items = action.payload;
    },
    clearRecommendations(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export const { setRecommendations, clearRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;