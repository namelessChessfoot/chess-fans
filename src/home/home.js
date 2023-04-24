import React, { useEffect } from "react";
import { Box, Button, Text, Keyboard } from "grommet";
import { useDispatch, useSelector } from "react-redux";
import { homeThunk } from "../services/page-thunks";
import Loading from "../component/loading";
import PlayerBar from "../player/playerbar";
const Home = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(homeThunk());
  }, []);
  return (
    <Box width="100%" align="center">
      {loading && <Loading />}
      {!loading && data?.topPlayer && (
        <Box direction="row" wrap justify="center" pad={{ top: "25px" }}>
          <Box round="10px" overflow="hidden">
            <Box background="dark-1" pad="10px">
              <Text weight="bold">Recommended Players</Text>
            </Box>
            <Box
              width="100%"
              align="center"
              gap="20px"
              pad="20px"
              background="dark-5"
            >
              {data.topPlayer.map((player) => (
                <PlayerBar key={player.username} player={player} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Home;
