import React, { useEffect, useState } from "react";
import { Box, Text, Button, Menu, Avatar, Keyboard, Form } from "grommet";
import { useNavigate } from "react-router";
import FormField from "../component/formfield";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk, updateThunk } from "../services/user-thunks";
import { avatar as A } from "../common.js";
const EditProfile = ({ self }) => {
  //This component is used by signup and edit-profile
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);
  const [myProfile, setMyProfile] = useState({});
  useEffect(() => {
    const init = {
      username: "",
      password: "",
      email: "",
      bio: "",
      test: "??",
      avatar: A[1],
    };
    setMyProfile({ ...init, ...profile });
  }, []);
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
  const ok = () => {
    return (
      !loading && myProfile.username && myProfile.password && myProfile.avatar
    );
  };
  const onSubmit = () => {
    if (ok()) {
      const body = {};
      for (let key in myProfile) {
        if (!!myProfile[key]) {
          body[key] = myProfile[key];
        }
      }
      if (self) {
        dispatch(
          updateThunk({
            profile: body,
            onSuccess: () => {
              console.log("Update ok, go to profile");
              navigate("/profile");
            },
          })
        );
      } else {
        dispatch(
          registerThunk({
            profile: body,
            onSuccess: () => {
              console.log("Register ok, go to home");
              navigate("/");
            },
          })
        );
      }
    } else {
      alert("Fields with star are required!");
    }
  };
  const avatarMenu = A.map((url) => {
    return {
      label: (
        <Box pad="20px" width="120px" align="center">
          <Avatar src={url} round="none" />
        </Box>
      ),
      onClick: () => {
        setMyProfile({ ...myProfile, avatar: url });
      },
    };
  }).slice(1);
  return (
    <Keyboard target="document" onEnter={onSubmit}>
      <Box align="center" pad={{ top: "30px" }} gap="20px">
        <Text size="5xl">{self ? "Edit Profile" : "Signup"}</Text>
        {fields.map((config) => {
          return <FormField key={config.label} config={config} />;
        })}
        <Box direction="row" align="center" gap="90px">
          <Text>Avatar</Text>
          <Avatar src={myProfile.avatar} round="small" />
          <Menu items={avatarMenu} dropBackground="border" />
        </Box>
        {self && (
          <FormField
            config={{
              label: "Old Password",
              type: "password",
              value: myProfile.oldpassword,
              required: true,
              onChange: (e) => {
                setMyProfile({ ...myProfile, oldpassword: e.target.value });
              },
            }}
          />
        )}
        <Button
          disabled={!ok()}
          primary
          label={self ? "Update" : "Join Chess Fans!"}
          onClick={onSubmit}
        />
      </Box>
    </Keyboard>
  );
};

export default EditProfile;
