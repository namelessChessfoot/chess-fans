import axios from "axios";
const avatar = [
  "https://static.hudl.com/users/prod/5499830_8e273ea3a64448478f1bb0af5152a4c7.jpg",
  "https://s1.52poke.wiki/wiki/thumb/2/21/001Bulbasaur.png/300px-001Bulbasaur.png",
  "https://s1.52poke.wiki/wiki/thumb/7/73/004Charmander.png/300px-004Charmander.png",
  "https://s1.52poke.wiki/wiki/thumb/3/39/007Squirtle.png/300px-007Squirtle.png",
];

const navPath = [
  ["Home", "/"],
  ["Search", "/search"],
];

const api = axios.create({ withCredentials: true });

const API_BASE = process.env?.REACT_APP_API_BASE || "http://localhost:4000/api";
const request = {
  get: async (path) => api.get(API_BASE + path),
  delete: async (path) => api.delete(API_BASE + path),
  post: async (path, body) => api.post(API_BASE + path, body),
  put: async (path, body) => api.put(API_BASE + path, body),
};

const showDate = (d, more = false) => {
  return `${d.toDateString()}${more ? `, ${d.toLocaleTimeString()}` : ""}`;
};

const logged = (profile) => {
  return profile?.username !== undefined;
};

export { avatar, navPath, request, showDate, logged };
