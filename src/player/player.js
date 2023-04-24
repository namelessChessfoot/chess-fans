import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Text, Tabs, Tab } from "grommet";
import { showDate } from "../common";
import GameCard from "../game/gamecard";
import { playerThunk } from "../services/page-thunks";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/loading";
const Player = () => {
  const dispatch = useDispatch();
  const { playerName } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(playerThunk(playerName));
  }, [playerName]);
  const clickGame = (id) => navigate(`/game/${id}`);
  // if (data?.player?.subscribed) {
  //   console.log(data.player.subscribed);
  //   data.games.forEach((g) => {
  //     console.log(g.time);
  //   });
  // }
  return (
    <Box width="100%" align="center">
      {loading && <Loading />}
      {!loading && data?.player && data?.games && (
        <Box width="100%">
          <Box
            width="100%"
            wrap
            justify="center"
            direction="row"
            pad={{ vertical: "25px", horizontal: "10vw" }}
            background="#555555"
            align="center"
          >
            <Box
              direction="row"
              flex="grow"
              justify="center"
              style={{ minWidth: "250px" }}
            >
              <Avatar
                src={data.player.avatar}
                round="5px"
                size="25vw"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </Box>
            <Box align="center" gap="10px" flex="grow">
              <Text weight="bold" size="30px">
                {data.player.username}
              </Text>
              {data.player.name && <Text>{data.player.name}</Text>}
              <Text>{`Rating: ${data.player.rating}`}</Text>
              <Text>{`Joined at ${showDate(
                new Date(1000 * data.player.joined)
              )}`}</Text>
              <Text>{`Last online at ${showDate(
                new Date(1000 * data.player.last_online)
              )}`}</Text>
            </Box>
          </Box>
          <Box width="100%" flex="grow">
            <Tabs>
              {data.player.subscribed ? (
                <Tab title="Unviewed Games">
                  <GameBoard
                    games={data.games.filter(
                      (g) => g.time > data.player.subscribed
                    )}
                    onClick={clickGame}
                    username={data.player.username}
                    title="unviewd game"
                  />
                </Tab>
              ) : (
                <></>
              )}
              <Tab title="Recent Games">
                <GameBoard
                  games={data.games}
                  onClick={clickGame}
                  username={data.player.username}
                  title="recent game"
                />
              </Tab>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const GameBoard = ({ games, username, title, onClick }) => {
  return (
    <Box gap="20px" align="center" pad={{ top: "30px" }}>
      {games.length ? (
        games.map((game) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => {
                onClick(game.id);
              }}
            />
          );
        })
      ) : (
        <Box>
          <Text>{`${username} has no ${title}`}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Player;
