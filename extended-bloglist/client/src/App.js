import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Navbar from "./components/Navbar";

const App = () => {
  useSelector((state) => console.log("state", state));

  const BlogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />

      <div>
        <h2>blogs</h2>
        <span>{user.name} logged in</span>{" "}
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLable="new blog" ref={BlogFormRef}>
          <BlogForm />
        </Togglable>
      </div>

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
