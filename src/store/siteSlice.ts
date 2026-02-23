import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Review, ReviewMap } from '../types/types';

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    search: '',
    reviews: {}
  } as {
    search: string,
    reviews: ReviewMap
  },
  reducers: {
    setSearch: (state, action: PayloadAction<{ newSearch: string }>) => {
      state.search = action.payload.newSearch;
    },
    setReviews: (state, action: PayloadAction<{ reviewMap: ReviewMap }>) => {
      state.reviews = action.payload.reviewMap;
    },
    setIndividualReview: (state, action: PayloadAction<{ roomId: string, review: Review | undefined }>) => {
      const review = action.payload.review;
      if (review) {
        state.reviews[action.payload.roomId] = review;
      } else {
        delete state.reviews[action.payload.roomId];
      }
    }
  },
});

export const { setSearch, setReviews, setIndividualReview } = siteSlice.actions;
export default siteSlice.reducer;
