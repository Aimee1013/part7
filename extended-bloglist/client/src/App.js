import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
// import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const BlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //   console.log("loggedUserJSON", loggedUserJSON);
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   console.log("logging in with", username, password);

  //   try {
  //     const user = await loginService.login({ username, password });
  //     console.log("user", user);
  //     // {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…c0Nn0.F-SnaWneJuzEK3HpRGlxR09bWwh-_VQSgXyrAz0DjlU', username: 'test2', name: 'super test2'}
  //     window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);
  //     setUsername("");
  //     setPassword("");
  //   } catch (error) {
  //     // eslint-disable-next-line no-undef
  //     setMessage("Wrong username or password");
  //     setTimeout(() => {
  //       // eslint-disable-next-line no-undef
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreate = async (title, author, url) => {
    BlogFormRef.current.toggleVisibility();
    console.log("000", title, author, url);
    try {
      const blog = await blogService.createBlog({ title, author, url });
      console.log("blog", blog);
      setBlogs(blogs.concat(blog));
      setMessage(`a new blog ${blog.title}! by ${blog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage("error" + error.response.data.message);
    }
  };

  const updateLikes = async (id, updateObject) => {
    try {
      const updatedBlog = await blogService.updateBlog(id, updateObject);
      console.log("updateBlog", updatedBlog);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (error) {
      setMessage("error" + error.response.data.message);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const newBlogs = blogs.filter((blog) => blog.id !== id);
      console.log("newBlogs", newBlogs);
      setBlogs(newBlogs);
    } catch (error) {
      setMessage("error: unauthorized");
    }
  };

  return (
    <div>
      <Notification message={message} />
      <div>Blogs</div>
      <div>Blog app, test blog, test author</div>

      {user === null ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>{" "}
          <button onClick={logout}>logout</button>
          <Togglable buttonLable="new blog" ref={BlogFormRef}>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                removeBlog={removeBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
