import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import loginService from "../services/login";
import notification from "./notificationReducer";

const LoginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      console.log("dispatch", state, action.payload);
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    }
  }
});

export const { login, logout } = LoginSlice.actions;

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials;
    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);
      dispatch(login(user));
      dispatch(notification({ message: `Welcome ${user.name}!`, type: "info" }, 5));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    userService.clearUser();
    dispatch(logout(null));
  };
};

export default LoginSlice.reducer;
