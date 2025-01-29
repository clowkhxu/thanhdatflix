import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";
import {
  iForgotPassword,
  ILogin,
  IRegister,
  ISendOTP,
  IUpdateUser,
  IVerifyToken,
} from "../../interfaces/user";

export const register = createAsyncThunk(
  "users/register",
  async (rawData: IRegister) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (rawData: ILogin) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (rawData: iForgotPassword) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/forgot-password`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (rawData: IUpdateUser) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/update-user`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "users/verifyToken",
  async (rawData: IVerifyToken) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify-token`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response: any = await axios.get(
      `${process.env.REACT_APP_API}/auth/logout`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getUserAccount = createAsyncThunk("users/getUser", async () => {
  try {
    const response: any = await axios.get(
      `${process.env.REACT_APP_API}/auth/user-account`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getAnotherUserInfo = createAsyncThunk(
  "users/getAnotherUserInfo",
  async (userId: string) => {
    try {
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/auth/another-user-account?userId=${userId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendOTP = createAsyncThunk(
  "users/sendOtp",
  async (rawData: ISendOTP) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/auth/send-otp`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
