import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { userLogin } from "../reducers/loginReducer";
import { notification } from "../reducers/notificationReducer";
import { TextField, Button } from "@mui/material";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    dispatch(userLogin(credentials));
    dispatch(notification(`${username.value} logged in`, 5));

    resetUsername();
    resetPassword();
  };

  return (
    <div>
      <Notification />

      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <TextField label="username" {...username} />
        </div>
        <div>
          password <TextField label="password" type="password" {...password} />
          <div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
