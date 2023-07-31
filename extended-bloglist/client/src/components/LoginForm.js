import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { userLogin } from "../reducers/loginReducer";
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
    // console.log(credentials);

    resetUsername("");
    resetPassword("");
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
          password <TextField label="password" {...password} />
          <div>
            <Button type="submit">login</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
