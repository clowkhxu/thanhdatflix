import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slice/moviesSlice";
import commentReducer from "./slice/commentsSlice";
import watchReducer from "./slice/watchSlice";
import systemReducer from "./slice/systemSlice";
import userReducer from "./slice/userSlice";
import ratingReducer from "./slice/ratingsSlice";
import searchHistoryReducer from "./slice/searchHistorySlice";
import activityLogReducer from './slice/activityLogSlice'

export const store = configureStore({
  reducer: {
    system: systemReducer,
    movies: moviesReducer,
    comments: commentReducer,
    watch: watchReducer,
    users: userReducer,
    rating: ratingReducer,
    searchHistory: searchHistoryReducer,
    activityLog: activityLogReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
