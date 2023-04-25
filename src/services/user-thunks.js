import { createAsyncThunk } from "@reduxjs/toolkit";

import * as userService from "./user-service";

export const registerThunk = createAsyncThunk(
  "user/register",
  async ({ profile, onSuccess = () => {} }) => {
    const user = await userService.register(profile);
    onSuccess();
    return user;
  }
);

export const getProfileThunk = createAsyncThunk("user/profile", async () => {
  const user = await userService.getProfile();
  return user;
});

export const loginThunk = createAsyncThunk(
  "user/login",
  async ({ credential, onSuccess = () => {} }) => {
    const user = await userService.login(credential);
    onSuccess();
    return user;
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async ({ onSuccess = () => {} }) => {
    const res = await userService.logout();
    onSuccess();
    return res;
  }
);

export const clearUserThunk = createAsyncThunk(
  "user/clear",
  async ({ onSuccess }) => {
    onSuccess();
    return true;
  }
);

export const updateThunk = createAsyncThunk(
  "user/update",
  async ({ profile, onSuccess = () => {} }) => {
    console.log("Update thunk");
    const user = await userService.update(profile);
    onSuccess();
    return user;
  }
);
