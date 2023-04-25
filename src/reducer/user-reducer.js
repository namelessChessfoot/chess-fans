import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  getProfileThunk,
  loginThunk,
  logoutThunk,
  clearUserThunk,
  updateThunk,
} from "../services/user-thunks.js";
const userSlice = createSlice({
  name: "user",
  initialState: { profile: {}, loading: false },
  extraReducers: {
    [registerThunk.fulfilled]: (state, { payload }) => {
      console.log("ok", payload);
      state.profile = payload;
      state.loading = false;
    },
    [registerThunk.rejected]: (state, { error }) => {
      state.loading = false;
      if (error.message.includes("409")) {
        alert("This username has been used.");
      } else {
        alert("Register failed");
      }
    },
    [registerThunk.pending]: (state, {}) => {
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
    [updateThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    [updateThunk.rejected]: (state, { error: { message = "" } = {} }) => {
      state.profile = {};
      state.loading = false;
      if (message.includes("401")) {
        alert("Did not login");
      } else if (message.includes("403")) {
        alert("Wrong password");
      } else {
        alert("Update failed");
      }
    },
    [updateThunk.pending]: (state, {}) => {
      state.profile = {};
      state.loading = true;
    },
    //--------------------------------------------------------
    [logoutThunk.fulfilled]: (state, {}) => {
      state.profile = {};
      state.loading = false;
    },
    //--------------------------------------------------------
    [clearUserThunk.fulfilled]: (state, {}) => {
      state.profile = {};
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
