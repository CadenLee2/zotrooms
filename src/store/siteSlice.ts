import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    search: ''
  },
  reducers: {
    setSearch: (state, action: PayloadAction<{ newSearch: string }>) => {
      state.search = action.payload.newSearch;
    }
  },
});

export const { setSearch } = siteSlice.actions;
export default siteSlice.reducer;
