import React, { useState } from "react";
import { Box, Avatar, Text } from "grommet";
import ShadowBox from "../component/shadowbox";
import { Add, Checkmark } from "grommet-icons";
import { avatar as A } from "../common";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { followPlayerThunk } from "../services/action-thunks";

const PlayerBar = ({ player }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { avatar = A[0], rating, username, subscribed = false } = player;
  const [sub, setSub] = useState(!!subscribed);
  const onSubscribe = () => {
    dispatch(followPlayerThunk(username));
    setSub(!sub);
  };
  const onClick = () => {
    navigate(`/player/${username}`);
  };
  return (
    <ShadowBox>
      <Box direction="row" fill>
        <Box
          pad="10px"
          gap="30px"
          direction="row"
          align="center"
          background="placeholder"
          onClick={onClick}
        >
          <Avatar src={avatar} />
          <Box align="center">
            <Text weight="bold" size="large">
              {username}
            </Text>
            <Text>{`Rating: ${rating}`}</Text>
          </Box>
        </Box>
        <Box
          onClick={onSubscribe}
          style={{ boxShadow: "none" }}
          direction="row"
          align="center"
          pad="15px"
          background="#999999"
        >
          {sub ? <Checkmark color="control" /> : <Add color="focus" />}
        </Box>
      </Box>
    </ShadowBox>
  );
};
export default PlayerBar;
