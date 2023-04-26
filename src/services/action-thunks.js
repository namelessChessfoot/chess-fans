import { createAsyncThunk } from "@reduxjs/toolkit";

import * as playerService from "./player-service";
import * as gameService from "./game-service";
import * as userService from "./user-service";

export const clearStateThunk = createAsyncThunk("action/clear", async () => {
  return true;
});

export const followPlayerThunk = createAsyncThunk(
  "action/followplayer",
  async ({ playerUsername, onSuccess = () => {} }) => {
    const res = await playerService.followPlayer(playerUsername);
    onSuccess(res);
    return res;
  }
);

export const postCommentThunk = createAsyncThunk(
  "action/postComment",
  async ({ comment, onSuccess = () => {} }) => {
    const res = await gameService.postComment(comment);
    onSuccess(res);
    return res;
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "action/deleteComment",
  async ({ commentid, onSuccess = () => {} }) => {
    const res = await gameService.deleteComment(commentid);
    onSuccess(res);
    return res;
  }
);

export const followUserThunk = createAsyncThunk(
  "action/followuser",
  async ({ username, onSuccess = () => {} }) => {
    const res = await userService.follow(username);
    onSuccess(res);
    return res;
  }
);
