import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Text, Keyboard } from "grommet";
import { Chessboard } from "react-chessboard/";
import { Chess } from "chess.js";
import PlayerBar from "../player/playerbar";
import { Previous, Next } from "grommet-icons";
import { gameThunk } from "../services/page-thunks";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/loading";
const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState([new Chess()]);
  const [cur, setCur] = useState(-1);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(gameThunk(gameId));
  }, [gameId]);
  const prev = () => {
    if (cur !== -1) {
      setCur(cur - 1);
      game[0].undo();
      setGame([game[0]]);
    }
  };
  const next = () => {
    if (cur !== data.moves.length - 1) {
      game[0].move(data.moves[cur + 1]);
      setCur(cur + 1);
      setGame([game[0]]);
    }
  };
  return (
    <Keyboard onLeft={prev} onRight={next} target="document">
      {loading && <Loading />}
      {!loading && data?.moves && data?.black && data?.white && (
        <Box direction="row" wrap justify="center">
          <Box
            align="center"
            gap="30px"
            margin={{ top: "20px", horizontal: "50px" }}
          >
            <PlayerBar player={data.black} />
            <Chessboard
              position={game[0].fen()}
              boardWidth={500}
              isDraggablePiece={() => false}
            />
            <PlayerBar player={data.white} />
          </Box>
          <Box
            align="center"
            background="border"
            margin={{ top: "20px", horizontal: "50px" }}
          >
            <Box direction="row" width="100%">
              <NavBtn onClick={prev} disabled={cur === -1}>
                <Previous />
              </NavBtn>
              <NavBtn onClick={next} disabled={cur === data.moves.length - 1}>
                <Next />
              </NavBtn>
            </Box>
            <Box wrap direction="row" width="200px">
              {data.moves.map((m, idx) => {
                return (
                  <Box
                    key={`${m}${idx}`}
                    width="100px"
                    align="center"
                    background={cur === idx ? "status-warning" : undefined}
                  >
                    <Text>{m}</Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Keyboard>
  );
};

const NavBtn = ({ children, onClick = () => {}, disabled = false }) => {
  return (
    <Button
      hoverIndicator="light-1"
      onClick={onClick}
      active
      style={{ width: "50%" }}
      disabled={disabled}
    >
      <Box pad="small" align="center" gap="small">
        {children}
      </Box>
    </Button>
  );
};

export default Game;
