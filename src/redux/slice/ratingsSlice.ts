import { createSlice } from "@reduxjs/toolkit";
import { getRatings } from "../asyncThunk/ratingThunk";

interface IRating {
  listUserRating: {
    username: string;
    rating: number;
    userId: string;
  }[];
  averageRating: number;
  countRating: number;
  ratingWidthUser: number;
}

const initialState: IRating = {
  listUserRating: [],
  averageRating: 0,
  countRating: 0,
  ratingWidthUser: 0,
};

export const ratingSlice = createSlice({
  name: "ratingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRatings.pending, (state) => {})
      .addCase(getRatings.fulfilled, (state, action) => {
        state.averageRating = action.payload?.DT?.averageRating ?? 0;
        state.countRating = action.payload?.DT?.countRating ?? 0;
        state.ratingWidthUser = action.payload?.DT?.ratingWidthUser ?? 0;
        state.listUserRating = action.payload?.DT?.listUserRating ?? [];
      })
      .addCase(getRatings.rejected, (state) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
