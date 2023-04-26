import axios from "axios";
const avatar = [
  "https://static.hudl.com/users/prod/5499830_8e273ea3a64448478f1bb0af5152a4c7.jpg",
  "https://s1.52poke.wiki/wiki/thumb/2/21/001Bulbasaur.png/300px-001Bulbasaur.png",
  "https://s1.52poke.wiki/wiki/thumb/7/73/004Charmander.png/300px-004Charmander.png",
  "https://s1.52poke.wiki/wiki/thumb/3/39/007Squirtle.png/300px-007Squirtle.png",
  "https://s1.52poke.wiki/wiki/thumb/0/0d/025Pikachu.png/260px-025Pikachu.png",
  "https://s1.52poke.wiki/wiki/thumb/3/3e/039Jigglypuff.png/300px-039Jigglypuff.png",
  "https://s1.52poke.wiki/wiki/thumb/d/d6/052Meowth.png/300px-052Meowth.png",
  "https://s1.52poke.wiki/wiki/thumb/5/53/054Psyduck.png/300px-054Psyduck.png",
  "https://s1.52poke.wiki/wiki/thumb/7/70/079Slowpoke.png/300px-079Slowpoke.png",
  "https://s1.52poke.wiki/wiki/thumb/d/da/100Voltorb.png/300px-100Voltorb.png",
  "https://s1.52poke.wiki/wiki/thumb/1/17/109Koffing.png/300px-109Koffing.png",
  "https://s1.52poke.wiki/wiki/thumb/4/4f/120Staryu.png/300px-120Staryu.png",
  "https://s1.52poke.wiki/wiki/thumb/e/e2/133Eevee.png/300px-133Eevee.png",
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
