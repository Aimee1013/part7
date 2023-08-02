import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
  },
});

export default store;
