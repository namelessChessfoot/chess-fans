import React, { useEffect, useState } from "react";
import { Box, Text, Button, Keyboard } from "grommet";
import { useNavigate } from "react-router";
import FormField from "../component/formfield";
import { useDispatch } from "react-redux/es/exports";
import { loginThunk } from "../services/user-thunks";
import { useSelector } from "react-redux";
import { logged } from "../common.js";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { profile, loading } = useSelector((state) => state.user);
  const fields = [
    {
      label: "Username",
      value: username,
      required: true,
      onChange: (e) => {
        setUsername(e.target.value);
      },
    },
    {
      label: "Password",
      type: "password",
      value: password,
      required: true,
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
  ];
  useEffect(() => {
    if (logged(profile)) {
      navigate("/");
    }
  }, [profile.username]);
  const onSubmit = () => {
    if (loading) return;
    if (username && password) {
      dispatch(loginThunk({ username, password }));
    }
  };
  const onSignup = () => {
    navigate(`/signup`);
  };
  return (
    <Keyboard target="document" onEnter={onSubmit}>
      <Box align="center" pad={{ top: "30px" }} gap="20px">
        <Text size="5xl">Login</Text>
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
        <Button
          primary
          label="Submit"
          onClick={onSubmit}
          disabled={loading || !(username && password)}
        />
        <Button label="Signup" primary color="accent-4" onClick={onSignup} />
      </Box>
    </Keyboard>
  );
};

export default Login;
