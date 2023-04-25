import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Text, Keyboard, Avatar, TextArea } from "grommet";
import { Chessboard } from "react-chessboard/";
import { Chess } from "chess.js";
import PlayerBar from "../player/playerbar";
import { Previous, Next, Trash } from "grommet-icons";
import { gameThunk } from "../services/page-thunks";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/loading";
import {
  postCommentThunk,
  deleteCommentThunk,
} from "../services/action-thunks";
import ShadowBox from "../component/shadowbox";
import { showDate } from "../common";
const Game = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState([new Chess()]);
  const [cur, setCur] = useState(-1);
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState("");
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.page);
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      gameThunk({
        gameId,
        onSuccess: ({ comments: cs }) => {
          const tmp = [...cs];
          tmp.sort((a, b) => b.createdAt - a.createdAt);
          setComments(tmp);
        },
      })
    );
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
  const makeComment = () => {
    if (myComment.length === 0) {
      return;
    }
    dispatch(
      postCommentThunk({
        comment: { gameid: gameId, content: myComment },
        onSuccess: (newComment) => {
          setComments([newComment, ...comments]);
          setMyComment("");
        },
      })
    );
  };
  return (
    <Keyboard
      onLeft={prev}
      onRight={next}
      onEnter={makeComment}
      target="document"
    >
      {loading && <Loading />}
      {!loading &&
        data?.moves &&
        data?.black &&
        data?.white &&
        data?.comments && (
          <Box width="100%" pad={{ bottom: "30px" }} gap="35px">
            <Box direction="row" wrap justify="center">
              <Box
                align="center"
                gap="30px"
                margin={{ top: "20px", horizontal: "50px" }}
              >
                <PlayerBar player={data.black} />
                <ShadowBox active={false}>
                  <Chessboard
                    position={game[0].fen()}
                    boardWidth={500}
                    isDraggablePiece={() => false}
                  />
                </ShadowBox>
                <PlayerBar player={data.white} />
              </Box>
              <Box
                align="center"
                background="border"
                round="10px"
                margin={{ top: "20px", horizontal: "50px" }}
              >
                <ShadowBox active={false}>
                  <Box direction="row" width="100%">
                    <NavBtn onClick={prev} disabled={cur === -1}>
                      <Previous />
                    </NavBtn>
                    <NavBtn
                      onClick={next}
                      disabled={cur === data.moves.length - 1}
                    >
                      <Next />
                    </NavBtn>
                  </Box>
                  <Box
                    wrap
                    direction="row"
                    width="200px"
                    pad={{ bottom: "10px" }}
                  >
                    {data.moves.map((m, idx) => {
                      return (
                        <Box
                          key={`${m}${idx}`}
                          width="100px"
                          align="center"
                          background={
                            cur === idx ? "status-warning" : undefined
                          }
                        >
                          <Text>{m}</Text>
                        </Box>
                      );
                    })}
                  </Box>
                </ShadowBox>
              </Box>
            </Box>
            <Box align="center" width="100%" gap="20px">
              <Box align="end" gap="20px" size="large">
                <TextArea
                  value={myComment}
                  placeholder="Any idea on this game?"
                  onChange={(e) => setMyComment(e.target.value)}
                  style={{ width: "70vw", height: "130px" }}
                />
                <Button label="Post!" primary onClick={makeComment} />
              </Box>
              {comments.map(
                ({ createdAt, content, avatar, username, _id: cid }) => {
                  return (
                    <ShadowBox key={cid}>
                      <Box direction="row">
                        <Box
                          background="border"
                          pad="15px"
                          direction="row"
                          align="center"
                          gap="15px"
                          onClick={() => {
                            navigate(`/profile/${username}`);
                          }}
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
                            <Box
                              width="100%"
                              align="end"
                              pad={{ left: "50px" }}
                            >
                              <Text
                                size="xsmall"
                                color="text-weak"
                              >{`${showDate(
                                new Date(createdAt * 1000),
                                true
                              )}`}</Text>
                            </Box>
                          </Box>
                        </Box>
                        {profile?.username === username && (
                          <Box
                            height="100%"
                            align="center"
                            justify="center"
                            pad="10px"
                            onClick={() => {
                              dispatch(
                                deleteCommentThunk({
                                  commentid: cid,
                                  onSuccess: () => {
                                    setComments(
                                      comments.filter((c) => c._id !== cid)
                                    );
                                  },
                                })
                              );
                            }}
                            style={{ boxShadow: "none" }}
                          >
                            <Trash />
                          </Box>
                        )}
                      </Box>
                    </ShadowBox>
                  );
                }
              )}
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
