import {
  Grommet,
  Header,
  Box,
  Avatar,
  Text,
  ResponsiveContext,
  Nav,
  Anchor,
  Menu,
} from "grommet";
import { avatar as A, navPath, logged } from "./common.js";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "./services/user-thunks.js";
import { clearStateThunk } from "./services/action-thunks.js";
import { clearUserThunk } from "./services/user-thunks.js";
import Loading from "./component/loading.js";
const Base = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [navlist, setNav] = useState([]);
  const [mount, setMount] = useState(false);
  const { profile, loading } = useSelector((state) => state.user);
  const { username, avatar = A[0] } = profile;
  const action = useSelector((state) => state.action);
  useEffect(() => {
    // catch requests that failed due to unauth
    if (action.loading === false && mount) {
      const { status, data } = action;
      dispatch(clearStateThunk());
      if (status === 401) {
        dispatch(
          clearUserThunk({
            onSuccess: () => {
              console.log("Triggered an API that needs login");
              navigate("/login");
            },
          })
        );
      }
    }
  }, [action.loading]);
  useEffect(() => {
    if (mount) {
      const tmp = navPath.map((i) => [
        i[0],
        () => {
          navigate(i[1]);
        },
      ]);
      if (logged(profile)) {
        tmp.push([
          "Logout",
          () => {
            dispatch(
              logoutThunk({
                onSuccess: () => {
                  console.log("Logout ok,navigate to home");
                  navigate("/");
                },
              })
            );
          },
        ]);
      }
      setNav(tmp);
    } else {
      setMount(true);
    }
  }, [mount, username]);
  return (
    <Grommet full style={{ display: "flex", flexDirection: "column" }}>
      <Header background="dark-1" pad="small">
        {location.pathname in { "/login": 0, "/signup": 0 } ? (
          <Avatar round="small" />
        ) : (
          <Box
            direction="row"
            align="center"
            gap="small"
            onClick={() => {
              navigate(logged(profile) ? "/profile" : "/login");
            }}
            style={{ boxShadow: "none" }}
          >
            <Avatar src={avatar} round="small" />
            {<Text>{username || "Login"}</Text>}
          </Box>
        )}
        <ResponsiveContext.Consumer>
          {(resp) => {
            return resp === "small" ? (
              <Menu
                dropAlign={{ right: "right", top: "bottom" }}
                items={navlist.map(([text, onClick]) => {
                  return {
                    label: text,
                    onClick: onClick,
                  };
                })}
              />
            ) : (
              <Nav direction="row">
                {navlist.map(([text, onClick]) => (
                  <Anchor label={text} key={text} onClick={onClick} />
                ))}
              </Nav>
            );
          }}
        </ResponsiveContext.Consumer>
      </Header>
      <Box background="text-xweak" width="100%" flex="grow" align="center">
        {loading ? <Loading /> : children}
      </Box>
    </Grommet>
  );
};

export default Base;
