import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/movie";

interface initialState {
  watchedEpisodes: IMovie[];
  currentEpisode: any;
}

const initialState: initialState = {
  watchedEpisodes:
    JSON.parse(localStorage.getItem("watched-episodes") as string) ?? [],
  currentEpisode: {
    name: "",
    slug: "",
    filename: "",
    link_embed: "",
    link_m3u8: "",
  },
};

export const watchSlice = createSlice({
  name: "watchSlice",
  initialState,
  reducers: {
    setCurrentEpisode: (state, action) => {
        state.currentEpisode = action.payload;
    },
    updateWatchedEpisodes: (state, action) => {
      const index = state.watchedEpisodes.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (index === -1) {
        state.watchedEpisodes.push(action.payload);
      } else {
        state.watchedEpisodes[index] = action.payload;
      }

      localStorage.setItem(
        "watched-episodes",
        JSON.stringify(state.watchedEpisodes)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateWatchedEpisodes, setCurrentEpisode } = watchSlice.actions;

export default watchSlice.reducer;
