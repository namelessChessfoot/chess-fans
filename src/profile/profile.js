import React, { useEffect, useState } from "react";
import { Avatar, Box, Text, Tabs, Tab, Button } from "grommet";
import { Edit } from "grommet-icons";
import { useDispatch, useSelector } from "react-redux";
import { logged, showDate } from "../common.js";
import Loading from "../component/loading.js";
import { useNavigate, useParams } from "react-router-dom";
import { profileThunk } from "../services/page-thunks.js";
import PlayerBar from "../player/playerbar.js";
const Profile = ({ self }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { profile } = user;
  const page = useSelector((state) => state.page);
  const { data } = page;
  const { username } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  useEffect(() => {
    if (self && !logged(profile)) {
      navigate("/login");
      return;
    }
    if (username === profile.username) {
      navigate("/profile");
      return;
    }
    if (self) {
      dispatch(profileThunk());
    } else {
      dispatch(profileThunk(username));
    }
  }, [username]);
  useEffect(() => {
    if (!user.loading && !page.loading && data) {
      let tmp = {};
      if (self || username === profile.username) {
        tmp = { ...profile, ...data };
      } else {
        const p = data.profile;
        tmp = { ...data, ...p };
        delete tmp.profile;
      }
      setContent(tmp);
    }
  }, [user.loading, page.loading, data]);
  return (
    <Box width="100%" align="center">
      {user.loading || page.loading || !content?.subscribedPlayers ? (
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
            {self && (
              <Button
                style={{ position: "absolute", right: 30, top: 30 }}
                onClick={() => navigate("/edit-profile")}
              >
                <Edit />
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
              <Tab title="Following"></Tab>
              <Tab title="Followers"></Tab>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
