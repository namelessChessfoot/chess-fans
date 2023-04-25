import { request } from "../common";

export const postComment = async ({ gameid, content }) => {
  const resp = await request.post("/game/comment", { gameid, content });
  return resp.data;
};

export const getComment = async (gameid) => {
  const resp = await request.get(`/game/comment/${gameid}`);
  return resp.data;
};

export const deleteComment = async (commentid) => {
  const resp = await request.delete(`/game/comment/${commentid}`);
  return resp.data;
};
