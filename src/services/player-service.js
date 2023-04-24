import { request } from "../common";

export const getPlayer = async (username) => {
  const resp = await request.get(`/player/${username}`);
  return resp.data;
};

export const getPGN = async (id) => {
  const resp = await request.get(`/player/pgn/${id}`);
  return resp.data;
};

export const getPlayerGames = async (username, date) => {
  const resp = await request.get(
    `/player/games/${username}/${date.toJSON().slice(0, 10)}`
  );
  return resp.data;
};

export const getTopPlayer = async () => {
  const resp = await request.get(`/player/top/players`);
  return resp.data;
};

export const followPlayer = async (playerUsername) => {
  const resp = await request.post(`/player/follow`, { target: playerUsername });
  return resp.data;
};

export const touchPayer = async (playerUsername) => {
  const resp = await request.post(`/player/touch`, { target: playerUsername });
  return resp.data;
};

export const getSubscribedPlayers = async (username) => {
  let URL = "/player/subscribe/players";
  if (username) {
    URL = `${URL}/${username}`;
  }
  const resp = await request.get(URL);
  return resp.data;
};
