import { createAsyncThunk } from "@reduxjs/toolkit";

import * as playerService from "./player-service";

export const clearStateThunk = createAsyncThunk("action/clear", async () => {
  return true;
});

export const followPlayerThunk = createAsyncThunk(
  "action/followplayer",
  async (playerUsername) => {
    const res = await playerService.followPlayer(playerUsername);
    return res;
  }
);
