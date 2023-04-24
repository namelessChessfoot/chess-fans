import { createAsyncThunk } from "@reduxjs/toolkit";

import * as userService from "./user-service";

export const registerThunk = createAsyncThunk("user/register", async (info) => {
  const user = await userService.register(info);
  return user;
});

export const getProfileThunk = createAsyncThunk("user/profile", async () => {
  const user = await userService.getProfile();
  return user;
});

export const loginThunk = createAsyncThunk("user/login", async (credential) => {
  const user = await userService.login(credential);
  return user;
});

export const logoutThunk = createAsyncThunk("user/logout", async () => {
  const res = await userService.logout();
  return res;
});
