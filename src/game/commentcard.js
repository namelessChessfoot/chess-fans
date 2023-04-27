import React, { useEffect, useState } from "react";
import { Box, Avatar, Text } from "grommet";
import { Trash } from "grommet-icons";
import ShadowBox from "../component/shadowbox";
import { showDate } from "../common";

const CommentCard = ({
  comment = {},
  onClick,
  deleteComment,
  showDelete = false,
  background = "border",
}) => {
  const { createdAt, content, avatar, username, _id: cid } = comment;
  return (
    <ShadowBox key={cid} active={!!onClick}>
      <Box direction="row">
        <Box
          background={background}
          pad="15px"
          direction="row"
          align="center"
          gap="15px"
          onClick={onClick}
        >
          <Box align="center" gap="5px">
            <Avatar round="small" src={avatar} />
            <Text>{username}</Text>
          </Box>
          <Box
            height="100%"
            gap="20px"
            justify="between"
            style={{ maxWidth: "60vw" }}
          >
            <Box>
              <Text>{content}</Text>
            </Box>
            <Box width="100%" align="end" pad={{ left: "50px" }}>
              <Text size="xsmall" color="text-weak">{`${showDate(
                new Date(createdAt * 1000),
                true
              )}`}</Text>
            </Box>
          </Box>
        </Box>
        {showDelete && (
          <Box
            align="center"
            justify="center"
            pad="10px"
            onClick={deleteComment}
            style={{ boxShadow: "none" }}
          >
            <Trash />
          </Box>
        )}
      </Box>
    </ShadowBox>
  );
};

export default CommentCard;
