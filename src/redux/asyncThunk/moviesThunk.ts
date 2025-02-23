import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";
import { IGetMovieDetail } from "../../interfaces/movie";
import {
  IAddMovie,
  IDeleteAllMovie,
  IDeleteMovie,
  IGetAllMovies,
  ISearchMovie,
} from "../../interfaces/movie";

export const getCategories = createAsyncThunk(
  "movies/getCategories",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_THE_LOAI as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCountries = createAsyncThunk(
  "movies/getCountries",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_QUOC_GIA as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSlideShow = createAsyncThunk(
  "movies/getSlideShow",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_PHIM_MOI_CAP_NHAT as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFeatureFilm = createAsyncThunk(
  "movies/getFeatureFilm",
  async (quantity: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PHIM_LE}&limit=${quantity}` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTelevisionSeries = createAsyncThunk(
  "movies/getTelevisionSeries",
  async (quantity: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PHIM_BO}&limit=${quantity}` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCartoon = createAsyncThunk(
  "movies/getCartoon",
  async (quantity: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOAT_HINH}&limit=${quantity}` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTvShows = createAsyncThunk(
  "movies/getTvShows",
  async (quantity: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_TV_SHOWS}?limit=${quantity}` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async (slug: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_THONG_TIN_PHIM}/${slug}` as string
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "movies/getMovieDetail",
  async (rawData: IGetMovieDetail) => {
    let { describe, slug, page, quantity } = rawData;
    try {
      const baseApi = `https://script.google.com/macros/s/AKfycbyC8-Qh6HrZ6nmWXrE-uqPUbKrKdRuRpV6r23CE4gRSJviJTL2dbk8Q84WlQNb8oXlLWg/exec?path=${describe}/${slug}`;

      const response = await fetch(`${baseApi}&page=${page}&limit=${quantity}`);

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);



export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (rawData: ISearchMovie) => {
    const { keyword, page, quantity } = rawData;

    try {
      const baseApi: string =
        `https://script.google.com/macros/s/AKfycbwoy5d0IYGkSEYZAj-4b0Ht5MdSq95RvGYXYCipE5wJhqPzYpJAHz-kaL1RwqxSpM76Yw/exec?path=tim-kiem&keyword=${encodeURIComponent(keyword)}&limit=${quantity}&page=${page}`;

      const response = await fetch(baseApi);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);


export const searchPreview = createAsyncThunk(
  "movies/searchPreview",
  async (keyword: string) => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwoy5d0IYGkSEYZAj-4b0Ht5MdSq95RvGYXYCipE5wJhqPzYpJAHz-kaL1RwqxSpM76Yw/exec?path=tim-kiem&keyword=${keyword}&limit=10`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async (rawData: IGetAllMovies) => {
    try {
      const { userId, type } = rawData;
      const response = await axios.get(
        `${process.env.REACT_APP_API}/movies/get-all-movies?type=${type}&userId=${userId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (rawData: IAddMovie) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/movies/add-movie`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (rawData: IDeleteMovie) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/movies/delete-movie`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAllMovie = createAsyncThunk(
  "movies/deleteAllMovie",
  async (rawData: IDeleteAllMovie) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/movies/delete-all-movie`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);