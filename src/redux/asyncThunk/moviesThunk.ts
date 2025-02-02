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
        `${process.env.REACT_APP_API_PHIM_LE}?limit=${quantity}` as string
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
        `${process.env.REACT_APP_API_HOAT_HINH}?limit=${quantity}` as string
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
  async (rawData: IGetMovieDetail, { rejectWithValue }) => {
    let { describe, slug, page, quantity } = rawData;
    const baseApi = `https://script.google.com/macros/s/AKfycbx-4DrOrG_omV1b4vVyAoB2FuCMezwctFdoOvqLvQj46qShIVAyH5feNWQri_e5hyHAXQ/exec?path=${describe}/${slug}&page=${page}&limit=${quantity}`;

    console.log("Fetching API:", baseApi); // Debug API URL

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout 10s

      const response = await fetch(baseApi, { signal: controller.signal });
      clearTimeout(timeoutId); // Xóa timeout nếu request thành công

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug dữ liệu API trả về

      if (!data || !data.data) {
        throw new Error("Invalid API response: Missing data");
      }

      return data.data;
    } catch (error: any) {
      console.error("Lỗi tải dữ liệu:", error.message || error);
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);




export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (rawData: ISearchMovie) => {
    const { keyword, page, quantity } = rawData;

    try {
      const baseApi: string =
        `${process.env.REACT_APP_API_TIM_KIEM}?keyword=${keyword}&limit=${quantity}&page=${page}`;
      const response = await fetch(baseApi);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchPreview = createAsyncThunk(
  "movies/searchPreview",
  async (keyword: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_TIM_KIEM}?keyword=${keyword}&limit=10`
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