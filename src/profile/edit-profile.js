import React, { useEffect, useState } from "react";
import { Box, Text, Button, Menu, Avatar, Keyboard } from "grommet";
import { useNavigate } from "react-router";
import FormField from "../component/formfield";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../services/user-thunks";
import { avatar as A } from "../common.js";
const EditProfile = () => {
  //This component is used by signup and edit-profile
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myProfile, setMyProfile] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    avatar: A[1],
  });
  const { profile, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (profile.username === myProfile.username) {
      navigate("/");
    }
  }, [profile.username]);
  const fields = [
    {
      label: "Username",
      value: myProfile.username,
      required: true,
      onChange: (e) => {
        setMyProfile({ ...myProfile, username: e.target.value });
      },
    },
    {
      label: "Password",
      type: "password",
      value: myProfile.password,
      required: true,
      onChange: (e) => {
        setMyProfile({ ...myProfile, password: e.target.value });
      },
    },
    {
      label: "Bio",
      value: myProfile.bio,
      onChange: (e) => {
        setMyProfile({ ...myProfile, bio: e.target.value });
      },
    },
    {
      label: "Email",
      type: "email",
      value: myProfile.email,
      onChange: (e) => {
        setMyProfile({ ...myProfile, email: e.target.value });
      },
    },
  ];
  const onSubmit = () => {
    if (loading) return;
    if (myProfile.username && myProfile.password && myProfile.avatar) {
      dispatch(registerThunk(myProfile));
    } else {
      alert("Fields with star are required!");
    }
  };
  const avatarMenu = A.map((url) => {
    return {
      label: <Avatar src={url} />,
      onClick: () => {
        setMyProfile({ ...myProfile, avatar: url });
      },
    };
  }).slice(1);
  return (
    <Keyboard target="document" onEnter={onSubmit}>
      <Box align="center" pad={{ top: "30px" }} gap="20px">
        <Text size="5xl">Signup</Text>
        {fields.map((config) => {
          return (
            <FormField
              key={config.label}
              config={config}
              value={config.value}
              onChange={config.onChange}
            />
          );
        })}
        <Box direction="row" align="center" gap="90px">
          <Text>Avatar</Text>
          <Avatar src={myProfile.avatar} />
          <Menu items={avatarMenu} />
        </Box>
        <Button
          disabled={
            loading ||
            !(myProfile.username && myProfile.password && myProfile.avatar)
          }
          primary
          label="Join Chess Fans!"
          onClick={onSubmit}
        />
      </Box>
    </Keyboard>
  );
};

export default EditProfile;
