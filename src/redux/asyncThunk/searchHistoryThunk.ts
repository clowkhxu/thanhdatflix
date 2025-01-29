import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";
import { IAddSearchHistory } from "../../interfaces/searchHistory";

export const getSearchHistory = createAsyncThunk(
  "movies/getSearchHistory",
  async (userId: string) => {
    try {
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/search-history/get-search-history/${userId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addSearchHistory = createAsyncThunk(
  "movies/addSearchHistory",
  async (rawData: IAddSearchHistory) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/search-history/add-search-history`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSearchHistory = createAsyncThunk(
  "movies/deletSearchHistory",
  async (idSearchHistory: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/search-history/delete-search-history`,
        { idSearchHistory }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAllSearchHistory = createAsyncThunk(
  "movies/deleteAllSearchHistory",
  async (userId: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/search-history/delete-all-search-history`,
        { userId }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
