import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  getProfileThunk,
  loginThunk,
  logoutThunk,
} from "../services/user-thunks.js";
const userSlice = createSlice({
  name: "user",
  initialState: { profile: {}, loading: false },
  extraReducers: {
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    [registerThunk.rejected]: (state, { error }) => {
      state.profile = {};
      state.loading = false;
      if (error.message.includes("409")) {
        alert("This username has been used.");
      } else {
        alert("Register failed");
      }
    },
    [registerThunk.pending]: (state, {}) => {
      state.profile = {};
      state.loading = true;
    },
    //--------------------------------------------------------
    [getProfileThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    [getProfileThunk.rejected]: (state, { error }) => {
      state.profile = {};
      state.loading = false;
    },
    [getProfileThunk.pending]: (state, {}) => {
      state.profile = {};
      state.loading = true;
    },
    //--------------------------------------------------------
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    [loginThunk.rejected]: (state, { error }) => {
      state.profile = {};
      state.loading = false;
      if (error.message.includes("404")) {
        alert("Username or Password Incorrect");
      } else {
        alert("Login failed");
      }
    },
    [loginThunk.pending]: (state, {}) => {
      state.profile = {};
      state.loading = true;
    },
    //--------------------------------------------------------
    [logoutThunk.fulfilled]: (state, {}) => {
      state.profile = {};
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
