import { createSlice } from "@reduxjs/toolkit";
import { getSearchHistory } from "../asyncThunk/searchHistoryThunk";
import { logout } from "../asyncThunk/userThunk";

const initialState: any = {
  searchRecent: [],
  searchFavourite: [],
};

export const searchHistorySlice = createSlice({
  name: "searchHistorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchHistory.pending, (state) => {})
      .addCase(getSearchHistory.fulfilled, (state, action) => {
        state.searchRecent = action.payload?.DT?.filter(
          (item: any) => item.type === "recent"
        ) ?? [];
        state.searchFavourite = action.payload?.DT?.filter(
          (item: any) => item.type === "favourite"
        ) ?? [];
      })
      .addCase(getSearchHistory.rejected, (state) => {})

      .addCase(logout.pending, (state) => {})
      .addCase(logout.fulfilled, (state, action) => {
        state.searchRecent = [];
        state.searchFavourite = [];
      })
      .addCase(logout.rejected, (state) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
