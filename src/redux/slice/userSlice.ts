import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  getUserAccount,
  verifyToken,
  updateUser,
  getAnotherUserInfo,
} from "../asyncThunk/userThunk";
import { IUser } from "../../interfaces/user";

interface IInitialState {
  user: IUser;
  anotherUser: IUser;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IInitialState = {
  user: {},
  anotherUser: {},
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.code) {
        window.location.href = `/authenticate?token=${action.payload.code}&type=LOCAL`;
      }
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(verifyToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      if (+action.payload?.EC === 0) {
        state.user = action.payload?.DT;
      }
      state.isLoading = false;
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getUserAccount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAccount.fulfilled, (state, action) => {
      state.user = action.payload?.DT ?? {};
      state.isLoading = false;
    });
    builder.addCase(getUserAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getAnotherUserInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAnotherUserInfo.fulfilled, (state, action) => {
      state.anotherUser = action.payload?.DT ?? {};
      state.isLoading = false;
    });
    builder.addCase(getAnotherUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (+action.payload?.EC === 0) {
        state.user = action.payload.DT;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
