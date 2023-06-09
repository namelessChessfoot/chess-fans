import { request } from "../common";

export const register = async (info) => {
  const resp = await request.post("/user/register", info);
  return resp.data;
};

export const getProfile = async (username = "") => {
  let URL = "/user/profile";
  if (username) {
    URL = `${URL}/${username}`;
  }
  const resp = await request.get(URL);
  return resp.data;
};

export const login = async ({ username, password }) => {
  const resp = await request.post("/user/login", { username, password });
  return resp.data;
};

export const logout = async () => {
  const resp = await request.post("/user/logout", {});
  return resp.data;
};

export const update = async (info) => {
  const resp = await request.put("/user/update", info);
  return resp.data;
};

export const follow = async (username) => {
  const resp = await request.post("/user/follow", { username });
  return resp.data;
};

export const getFollowing = async (username) => {
  let URL = "/user/following";
  if (username) {
    URL = `${URL}/${username}`;
  }
  const resp = await request.get(URL);
  return resp.data;
};

export const getFollower = async (username) => {
  let URL = "/user/follower";
  if (username) {
    URL = `${URL}/${username}`;
  }
  const resp = await request.get(URL);
  return resp.data;
};
