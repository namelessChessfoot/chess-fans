import React, { useEffect, useState } from "react";
import { Avatar, Box, Text, Tabs, Tab, Button } from "grommet";
import { Edit, Add, Checkmark } from "grommet-icons";
import { useDispatch, useSelector } from "react-redux";
import { logged, showDate } from "../common.js";
import Loading from "../component/loading.js";
import { useNavigate, useParams } from "react-router-dom";
import { profileThunk } from "../services/page-thunks.js";
import PlayerBar from "../player/playerbar.js";
import CommentCard from "../game/commentcard.js";
import {
  deleteCommentThunk,
  followUserThunk,
} from "../services/action-thunks.js";
import ShadowBox from "../component/shadowbox.js";
const Profile = ({ self }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { profile } = user;
  const page = useSelector((state) => state.page);
  const { data } = page;
  const { username } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [fo, setFo] = useState(false);
  const descending = (lst) => {
    const cp = [...lst];
    cp.sort((a, b) => b.createdAt - a.createdAt);
    return cp;
  };
  useEffect(() => {
    if (self && !logged(profile)) {
      navigate("/login");
      return;
    }
    const obj = {
      onSuccess: (res = {}) => {
        // console.log(res);
        const {
          comments,
          profile: rp,
          subscribedPlayers,
          following,
          follower,
        } = res;
        let tmp = { subscribedPlayers };
        if (self || username === profile?.username) {
          tmp = { ...tmp, ...profile };
        } else {
          tmp = { ...tmp, ...rp };
          setFo(!!rp.followed);
        }
        setContent(tmp);

        setComments(descending(comments));
        setFollowing(descending(following));
        setFollower(descending(follower));
      },
    };
    if (!self) {
      obj.username = username;
    }
    dispatch(profileThunk(obj));
  }, [username]);
  const follow = async () => {
    dispatch(
      followUserThunk({
        username,
        onSuccess: (res) => {
          setFo(!!res.follow);
        },
      })
    );
  };
  return (
    <Box width="100%" align="center">
      {user.loading ||
      page.loading ||
      !content?.subscribedPlayers ||
      !comments ? (
        <Loading />
      ) : (
        <Box width="100%" align="center">
          <Box
            width="100%"
            wrap
            justify="center"
            direction="row"
            pad={{ vertical: "25px", horizontal: "10vw" }}
            background="#555555"
            align="center"
            style={{ position: "relative" }}
          >
            <Box
              direction="row"
              flex="grow"
              justify="center"
              style={{ minWidth: "250px" }}
            >
              <Avatar
                src={content.avatar}
                round="5px"
                size="25vw"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <Box align="center" gap="10px" flex="grow">
                <Text weight="bold" size="30px">
                  {content.username}
                </Text>
                <Text color="text-weak">
                  {content.bio || "This user has no bio"}
                </Text>
                {content.email && (
                  <Text color="text-weak">{content.email}</Text>
                )}
                <Text color="text-weak">{`Joined at ${showDate(
                  new Date(1000 * content.createdAt)
                )}`}</Text>
              </Box>
            </Box>
            {self || username === profile?.username ? (
              <Button
                style={{ position: "absolute", right: 30, top: 30 }}
                onClick={() => navigate("/edit-profile")}
              >
                <Edit />
              </Button>
            ) : (
              <Button
                style={{ position: "absolute", right: 30, top: 30 }}
                onClick={follow}
              >
                {fo ? <Checkmark /> : <Add />}
              </Button>
            )}
          </Box>
          <Box width="100%" flex="grow">
            <Tabs>
              <Tab title="Subscribed Players">
                <Box align="center" width="100%" gap="20px" pad="20px">
                  {content.subscribedPlayers.map((player) => (
                    <PlayerBar key={player.username} player={player} />
                  ))}
                </Box>
              </Tab>
              <Tab title="Following">
                <UserBoard
                  users={following}
                  onClick={(usnm) => {
                    navigate(`/profile/${usnm}`);
                  }}
                />
              </Tab>
              <Tab title="Followers">
                <UserBoard
                  users={follower}
                  onClick={(usnm) => {
                    navigate(`/profile/${usnm}`);
                  }}
                />
              </Tab>
              <Tab title="Comments">
                <Box
                  align="center"
                  width="100%"
                  gap="20px"
                  pad="20px"
                  flex="grow"
                >
                  {comments.map((c) => (
                    <CommentCard
                      comment={c}
                      key={c._id}
                      showDelete={profile?.username === c.username}
                      onClick={() => {
                        navigate(`/game/${c.gameid}`);
                      }}
                      deleteComment={() => {
                        dispatch(
                          deleteCommentThunk({
                            commentid: c._id,
                            onSuccess: () => {
                              setComments(
                                comments.filter((cc) => cc._id !== c._id)
                              );
                            },
                          })
                        );
                      }}
                    />
                  ))}
                </Box>
              </Tab>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const UserBoard = ({ users, onClick }) => {
  return (
    <Box align="center" width="100%" gap="20px" pad="20px" flex="grow">
      {users.map(({ username, avatar, bio }) => {
        return (
          <ShadowBox key={username}>
            <Box
              direction="row"
              align="center"
              background="border"
              pad="15px"
              gap="25px"
              onClick={() => {
                onClick(username);
              }}
            >
              <Avatar src={avatar} />
              <Box align="center" gap="10px">
                <Text weight="bold" size="xlarge">
                  {username}
                </Text>
                <Text size="medium" color="text-weak">
                  {bio}
                </Text>
              </Box>
            </Box>
          </ShadowBox>
        );
      })}
    </Box>
  );
};

export default Profile;
