import { request } from "../common";

export const postComment = async ({ gameid, content }) => {
  const resp = await request.post("/game/comment", { gameid, content });
  return resp.data;
};

export const getComment = async (gameid) => {
  const resp = await request.get(`/game/comment/${gameid}`);
  return resp.data;
};

export const getUserComment = async (username) => {
  let URL = "/game/user/comment";
  if (username) {
    URL = `${URL}/${username}`;
  }
  const resp = await request.get(URL);
  return resp.data;
};

export const deleteComment = async (commentid) => {
  const resp = await request.delete(`/game/comment/${commentid}`);
  return resp.data;
};

// app.get("/api/game/following/comment", getRecentComments);
export const getRecentComments = async () => {
  const resp = await request.get(`/game/following/comment`);
  return resp.data;
};
