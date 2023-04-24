import { createSlice } from "@reduxjs/toolkit";
import {
  searchThunk,
  playerThunk,
  gameThunk,
  homeThunk,
  profileThunk,
} from "../services/page-thunks";
const pageSlice = createSlice({
  name: "page",
  initialState: { data: null, loading: false },
  extraReducers: {
    [searchThunk.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [searchThunk.pending]: (state, {}) => {
      state.data = null;
      state.loading = true;
    },
    [searchThunk.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = null;
      if (error.message.includes("404")) {
        alert("No player was found");
      } else {
        alert("Search failed");
      }
    },
    //_________________________________________________________________
    [playerThunk.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [playerThunk.pending]: (state, {}) => {
      state.data = null;
      state.loading = true;
    },
    [playerThunk.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = null;
      const message = error.message;
      if (message.includes("404")) {
        alert("No player was found");
      } else if (message.includes("400")) {
        alert("Game data fetching failed");
      } else {
        alert("Player profile fetching failed");
      }
    },
    //_________________________________________________________________
    [gameThunk.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [gameThunk.pending]: (state, {}) => {
      state.data = null;
      state.loading = true;
    },
    [gameThunk.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = null;
      const message = error.message;
      if (message.includes("404")) {
        alert("No player or PGN was found");
      } else {
        alert("Game fetching failed");
      }
    },
    //_________________________________________________________________
    [homeThunk.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [homeThunk.pending]: (state, {}) => {
      state.data = null;
      state.loading = true;
    },
    [homeThunk.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = null;
      const message = error.message;
      if (message.includes("404")) {
        alert("No top player was found");
      } else {
        alert("Game fetching failed");
      }
    },
    //_________________________________________________________________
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [profileThunk.pending]: (state, {}) => {
      state.data = null;
      state.loading = true;
    },
    [profileThunk.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = null;
      const message = error.message;
      if (message.includes("404")) {
        alert("No user was found");
      } else {
        alert(message);
      }
    },
  },
});

export default pageSlice.reducer;
