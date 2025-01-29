import axios from '../../custom/axios'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addReportedComment = createAsyncThunk(
  "movies/addReportedComment",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/reported-comment/add-reported-comment`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
