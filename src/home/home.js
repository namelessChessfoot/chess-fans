import React, { useEffect } from "react";
import { Box, Button, Text, Keyboard } from "grommet";
import { useDispatch, useSelector } from "react-redux";
import { homeThunk } from "../services/page-thunks";
import Loading from "../component/loading";
import PlayerBar from "../player/playerbar";
import { logged } from "../common.js";
import CommentCard from "../game/commentcard";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.page);
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(homeThunk(logged(profile)));
  }, []);
  return (
    <Box width="100%" align="center">
      {loading && <Loading />}
      {!loading && data?.topPlayer && (
        <Box direction="row" pad="20px" wrap gap="50px" justify="center">
          <Box round="10px" overflow="hidden" margin="15px" height="100%">
            <Box background="dark-1" pad="10px">
              <Text weight="bold">Recommended Players</Text>
            </Box>
            <Box
              width="100%"
              align="center"
              gap="20px"
              pad="20px"
              background="dark-5"
              flex="grow"
            >
              {data.topPlayer.map((player) => (
                <PlayerBar key={player.username} player={player} />
              ))}
            </Box>
          </Box>
          {logged(profile) && data?.comments && (
            <Box round="10px" overflow="hidden" margin="15px" height="100%">
              <Box background="dark-1" pad="10px">
                <Text weight="bold">Recent</Text>
              </Box>
              <Box
                width="100%"
                align="center"
                gap="20px"
                pad="20px"
                background="dark-5"
                flex="grow"
              >
                {data.comments.map((c) => (
                  <CommentCard
                    key={c._id}
                    comment={c}
                    background="dark-5"
                    onClick={() => {
                      navigate(`/game/${c.gameid}`);
                    }}
                  />
                ))}
                {data.comments.length === 0 && <Text>No Recent News</Text>}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
