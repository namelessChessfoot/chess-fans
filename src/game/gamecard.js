import React from "react";
import { Box, Text } from "grommet";
import ShadowBox from "../component/shadowbox";
import { showDate } from "../common.js";
import { Chessboard } from "react-chessboard/";
const GameCard = ({ game, onClick = () => {} }) => {
  const { black, white, final, result, time } = game;
  return (
    <ShadowBox>
      <Box
        direction="row"
        align="center"
        pad="20px"
        wrap
        gap="50px"
        onClick={onClick}
      >
        <Chessboard
          position={final}
          boardWidth={200}
          showBoardNotation={false}
          isDraggablePiece={() => false}
        />
        <Box gap="10px">
          <PB color="black" username={black.username} />
          <Box pad={{ left: "30px" }}>
            <Text weight="bold" size="30px">
              {result}
            </Text>
          </Box>
          <PB color="white" username={white.username} />
          <Box pad={{ top: "30px" }}>
            <Text>{`Played at ${showDate(new Date(1000 * time))}`}</Text>
          </Box>
        </Box>
      </Box>
    </ShadowBox>
  );
};

const PB = ({ username, color }) => {
  return (
    <Box
      pad="5px"
      gap="10px"
      direction="row"
      align="center"
      style={{ minWidth: "200px" }}
    >
      <Box background={color} round="50%" width="15px" height="15px" />
      <Text size="20px" color="text-weak">
        {username}
      </Text>
    </Box>
  );
};

export default GameCard;
export { PB };
