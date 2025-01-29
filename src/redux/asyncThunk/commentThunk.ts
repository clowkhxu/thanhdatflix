import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";
import { IAddComment, IDeleteComment, IGetCommentList, IUpdateComment } from "../../interfaces/comments";


export const getCommentList = createAsyncThunk(
  "movies/getCommentList",
  async (rawData: IGetCommentList) => {
    try {
      const { movieSlug, sortOrder } = rawData;
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/comment/get-comments/${movieSlug}/${sortOrder}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "movies/addComment",
  async (rawData: IAddComment) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/comment/add-comment`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleleComment = createAsyncThunk(
  "movies/deleleComment",
  async (idComment: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/comment/delete-comment`,
        { id: idComment }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "movies/updateComment",
  async (rawData: IUpdateComment) => {
    try {
      const response: any = await axios.put(
        `${process.env.REACT_APP_API}/comment/update-comment`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
