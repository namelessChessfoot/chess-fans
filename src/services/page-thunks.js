import { createAsyncThunk } from "@reduxjs/toolkit";
import { parse } from "pgn-parser";

import * as playerService from "./player-service";
import * as userService from "./user-service";

export const searchThunk = createAsyncThunk("page/search", async (username) => {
  if (!username) return null;
  const player = await playerService.getPlayer(username);
  return player;
});

export const playerThunk = createAsyncThunk("page/player", async (username) => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const [player, games] = await Promise.all([
    playerService.getPlayer(username),
    playerService.getPlayerGames(username, d),
  ]);
  playerService.touchPayer(username);
  return { player, games };
});

export const gameThunk = createAsyncThunk("page/game", async (gid) => {
  const pgn = await playerService.getPGN(gid);
  const [{ headers, moves: ms, result }] = parse(pgn);
  const moves = ms.map((m) => m.move);
  const b = headers.find((a) => a.name === "Black")?.value || "";
  const w = headers.find((a) => a.name === "White")?.value || "";
  const [black, white] = await Promise.all(
    [b, w].map((u) => playerService.getPlayer(u))
  );
  return { moves, result, black, white };
});

export const homeThunk = createAsyncThunk("page/home", async () => {
  const [topPlayer] = await Promise.all([playerService.getTopPlayer()]);
  return { topPlayer };
});

export const profileThunk = createAsyncThunk(
  "page/profile",
  async (username = "") => {
    const promises = [playerService.getSubscribedPlayers(username)];
    if (username) {
      promises.push(userService.getProfile(username));
    }
    const [subscribedPlayers, profile] = await Promise.all(promises);
    const ret = { subscribedPlayers };
    if (profile) {
      ret.profile = profile;
    }
    return ret;
  }
);
