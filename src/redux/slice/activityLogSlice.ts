import { createSlice } from "@reduxjs/toolkit";
import { getActivityLog } from "../asyncThunk/activityLogThunk";

const initialState: any = {
  activityList: [],
};

export const ratingSlice = createSlice({
  name: "ratingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActivityLog.pending, (state) => {})
      .addCase(getActivityLog.fulfilled, (state, action) => {
        state.activityList = action.payload?.DT ?? []
      })
      .addCase(getActivityLog.rejected, (state) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
