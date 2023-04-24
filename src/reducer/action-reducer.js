import { createSlice } from "@reduxjs/toolkit";
import { followPlayerThunk, clearStateThunk } from "../services/action-thunks";

const initial = { status: null, data: null, loading: null };

const actionSlice = createSlice({
  name: "action",
  initialState: initial,
  extraReducers: {
    [followPlayerThunk.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.status = 200;
    },
    [followPlayerThunk.pending]: (state, {}) => {
      state.data = null;
      state.loading = true;
      state.status = null;
    },
    [followPlayerThunk.rejected]: (state, { error }) => {
      state.loading = false;
      state.data = null;
      if (error.message.includes("401")) {
        state.status = 401;
      } else {
        alert("Unknown failure");
      }
    },
    //_________________________________________________________________
    [clearStateThunk.fulfilled]: (state, {}) => {
      state.data = null;
      state.loading = null;
      state.status = null;
    },
    //_________________________________________________________________
  },
});
export default actionSlice.reducer;
