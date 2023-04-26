import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./home/home";
import Login from "./login/login";
import Profile from "./profile/profile";
import Search from "./search/search";
import Player from "./player/player";
import Game from "./game/game";
import Debug from "./game/debug";
import EditProfile from "./profile/edit-profile";
import Base from "./base";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user-reducer";
import pageReducer from "./reducer/page-reducer";
import actionReducer from "./reducer/action-reducer";
import { Provider, useDispatch } from "react-redux";
import { getProfileThunk } from "./services/user-thunks";
import React, { useEffect } from "react";
const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    action: actionReducer,
  },
});
store.dispatch(getProfileThunk());
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Base>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile self={true} />}></Route>
            <Route
              path="/profile/:username"
              element={<Profile self={false} />}
            ></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/player/:playerName" element={<Player />}></Route>
            <Route path="/game/:gameId" element={<Game />}></Route>
            <Route
              path="/edit-profile"
              element={<EditProfile self={true} />}
            ></Route>
            <Route
              path="/signup"
              element={<EditProfile self={false} />}
            ></Route>
            <Route path="/debug" element={<Debug />}></Route>
          </Routes>
        </Base>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
