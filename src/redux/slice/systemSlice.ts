import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

export interface ISystemState {
  type: string;
  isOpenModalAuthentication: boolean;
  theme: "light" | "dark";
  isMobile: boolean;
  width: number;
  incognitoMode: boolean;
}

const initialState: ISystemState = {
  type: "login",
  isOpenModalAuthentication: false,
  theme:
    JSON.parse(localStorage.getItem("theme") as "light" | "dark") ?? "light",
  isMobile: false,
  width: window.innerWidth,
  incognitoMode:
    JSON.parse(localStorage.getItem("incognitoMode") as string) ?? false,
};

export const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpenModalAuthentication = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setIncognitoMode: (state, action) => {
      state.incognitoMode = action.payload;
      localStorage.setItem("incognitoMode", JSON.stringify(action.payload));
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeTheme,
  setOpen,
  setType,
  setIsMobile,
  setWidth,
  setIncognitoMode,
} = systemSlice.actions;

export default systemSlice.reducer;
