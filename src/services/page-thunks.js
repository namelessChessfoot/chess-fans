import { createAsyncThunk } from "@reduxjs/toolkit";
import { parse } from "pgn-parser";

import * as playerService from "./player-service";
import * as userService from "./user-service";
import * as gameService from "./game-service";

export const searchThunk = createAsyncThunk("page/search", async (username) => {
  if (!username) return null;
  const player = await playerService.getPlayer(username);
  return player;
});

export const playerThunk = createAsyncThunk("page/player", async (username) => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  const [player, games] = await Promise.all([
    playerService.getPlayer(username),
    playerService.getPlayerGames(username, d),
  ]);
  playerService.touchPayer(username);
  const ret = { player, games };
  return ret;
});

export const gameThunk = createAsyncThunk(
  "page/game",
  async ({ gameId, onSuccess = () => {} }) => {
    const [pgn, comments] = await Promise.all([
      playerService.getPGN(gameId),
      gameService.getComment(gameId),
    ]);
    const [{ headers, moves: ms, result }] = parse(pgn);
    const moves = ms.map((m) => m.move);
    const b = headers.find((a) => a.name === "Black")?.value || "";
    const w = headers.find((a) => a.name === "White")?.value || "";
    const [black, white] = await Promise.all(
      [b, w].map((u) => playerService.getPlayer(u))
    );
    const ret = { moves, result, black, white, comments };
    onSuccess(ret);
    return ret;
  }
);

export const homeThunk = createAsyncThunk(
  "page/home",
  async (getNews = false) => {
    const promises = [playerService.getTopPlayer()];
    if (getNews) {
      promises.push(gameService.getRecentComments());
    }
    const [topPlayer, comments] = await Promise.all(promises);
    const ret = { topPlayer };
    if (getNews) {
      ret.comments = comments;
    }
    return ret;
  }
);

export const profileThunk = createAsyncThunk(
  "page/profile",
  async ({ username = "", onSuccess = () => {} }) => {
    const promises = [
      playerService.getSubscribedPlayers(username),
      userService.getFollowing(username),
      userService.getFollower(username),
      gameService.getUserComment(username),
    ];
    if (username) {
      promises.push(userService.getProfile(username));
    }
    const [subscribedPlayers, following, follower, comments, profile] =
      await Promise.all(promises);
    const ret = { subscribedPlayers, following, follower, comments };
    if (profile) {
      ret.profile = profile;
    }
    onSuccess(ret);
    return ret;
  }
);
