import { createSlice } from "@reduxjs/toolkit";
import {
  getCountries,
  getCategories,
  getCartoon,
  getSlideShow,
  getFeatureFilm,
  getTelevisionSeries,
  getTvShows,
  getMovieInfo,
  getMovieDetail,
  searchMovie,
  getAllMovies,
  searchPreview,
} from "../asyncThunk/moviesThunk";
import {
  ICategory,
  ICountry,
  IEpisodes,
  IMovie,
  IPagination,
} from "../../interfaces/movie";

interface MoviesState {
  categories: ICategory[];
  countries: ICountry[];
  slideShow: IMovie[];
  televisionSeries: IMovie[];
  cartoon: IMovie[];
  featureFilm: IMovie[];
  tvShows: IMovie[];
  movieInfo: {
    info: IMovie;
    titleHead: string;
    episodes: IEpisodes[];
  };
  movieDetail: {
    items: IMovie[];
    titleHead: string;
    titlePage: string;
    pagination: IPagination;
  };
  searchMovie: {
    items: IMovie[];
    pagination: IPagination;
    titleHead: string;
  };
  searchPreview: IMovie[];
  savedMovies: any;
  watchHistory: any;
  isLoading: boolean;
  isError: boolean;
}

const initialState: MoviesState = {
  categories: [],
  countries: [],
  slideShow: [],
  featureFilm: [],
  televisionSeries: [],
  cartoon: [],
  tvShows: [],
  movieInfo: {
    info: {},
    titleHead: "",
    episodes: [],
  },
  movieDetail: {
    items: [],
    titlePage: "",
    titleHead: "",
    pagination: {
      totalItems: 0,
      totalPages: 0,
    },
  },
  searchMovie: {
    items: [],
    pagination: {
      totalItems: 0,
      totalPages: 0,
    },
    titleHead: "",
  },
  searchPreview: [],
  savedMovies: {
    movies: [],
  },
  watchHistory: {
    movies: [],
  },
  isLoading: false,
  isError: false,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // lấy danh sách thể loại
      .addCase(getCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy danh sách quốc gia
      .addCase(getCountries.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.isLoading = false;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy danh sách slide
      .addCase(getSlideShow.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSlideShow.fulfilled, (state, action) => {
        state.slideShow = action.payload?.items ?? [];
        state.isLoading = false;
      })
      .addCase(getSlideShow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy dữ liệu phim lẻ
      .addCase(getFeatureFilm.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeatureFilm.fulfilled, (state, action) => {
        state.featureFilm = action.payload?.data?.items ?? [];
        state.isLoading = false;
      })
      .addCase(getFeatureFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy dữ liệu phim bộ
      .addCase(getTelevisionSeries.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTelevisionSeries.fulfilled, (state, action) => {
        state.televisionSeries = action.payload?.data?.items ?? [];
        state.isLoading = false;
      })
      .addCase(getTelevisionSeries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy dữ liệu phim hoạt hình
      .addCase(getCartoon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartoon.fulfilled, (state, action) => {
        state.cartoon = action.payload?.data?.items ?? [];
        state.isLoading = false;
      })
      .addCase(getCartoon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy dữ liệu tv shows
      .addCase(getTvShows.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.tvShows = action.payload?.data?.items ?? [];
        state.isLoading = false;
      })
      .addCase(getTvShows.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // lấy thông tin phim
      .addCase(getMovieInfo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.movieInfo.info = {};
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        state.movieInfo.info = action.payload?.movie ?? {};
        state.movieInfo.episodes =
          action.payload?.episodes[0]?.server_data ?? [];
        state.isError = action.payload?.status ? false : true;
      })
      .addCase(getMovieInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // chi tiết phim
      .addCase(getMovieDetail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.movieDetail.items = [];
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        if (action.payload) {
          const { items, titlePage } = action.payload;
          const titleHead =
            action.payload?.seoOnPage?.titleHead ?? "Chi tiết phim";
          const { totalItems, totalPages } = action.payload?.params?.pagination;
          state.movieDetail.items = items;
          state.movieDetail.titlePage = titlePage;
          state.movieDetail.titleHead = titleHead;
          state.movieDetail.pagination.totalItems = totalItems;
          state.movieDetail.pagination.totalPages = totalPages;
        }

        state.isError = !(action.payload?.items?.length > 0);
        state.isLoading = false;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // tìm kiếm phim
      .addCase(searchMovie.pending, (state, action) => {
        state.isLoading = true;
        state.searchMovie.items = [];
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const { items } = action.payload;
          const { totalItems, totalPages } = action.payload.params.pagination;
          const titleHead = action.payload?.seoOnPage?.titleHead;
          state.searchMovie.items = items;
          state.searchMovie.titleHead = titleHead;
          state.searchMovie.pagination.totalItems = totalItems;
          state.searchMovie.pagination.totalPages = totalPages;
          state.isLoading = !action.payload;
        }
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.isLoading = false;
      })

      // danh sách phim đã lưu và lịch sử xem
      .addCase(getAllMovies.pending, (state, action) => {})
      .addCase(getAllMovies.fulfilled, (state, action) => {
        if (action.payload?.data?.type === "saved-movies") {
          state.savedMovies.movies = action.payload?.data?.movies ?? [];
        } else {
          state.watchHistory.movies = action.payload?.data?.movies ?? [];
        }
      })
      .addCase(getAllMovies.rejected, (state, action) => {})

      // search preview
      .addCase(searchPreview.pending, (state, action) => {})
      .addCase(searchPreview.fulfilled, (state, action) => {
        state.searchPreview = action.payload?.items ?? [];
      })
      .addCase(searchPreview.rejected, (state, action) => {});
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
