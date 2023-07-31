import React, { useRef, useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWith: 1,
    marginBottom: 5,
  };
  const removeStyle = {
    background: "skyblue",
    border: "none",
    borderRadius: 3,
    padding: 5,
  };

  const blogRef = useRef();
  const [viewVisible, setViewVisible] = useState(false);

  const switchView = () => {
    setViewVisible(!viewVisible);
    blogRef.current.toggleVisibility();
  };

  const addLikes = async () => {
    const update = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
    };
    updateLikes(blog.id, update);
  };

  const deleteaBlog = () => {
    window.confirm(`Remove blog ${blog.title}! by ${blog.author}`);
    removeBlog(blog.id);
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {" "}
        {blog.title} {blog.author}
        <button style={{ marginLeft: 5 }} onClick={switchView}>
          {viewVisible ? "hide" : "view"}
        </button>
      </div>

      <Togglable ref={blogRef}>
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button
              id="like-button"
              style={{ marginLeft: 5 }}
              onClick={addLikes}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          <button id="remove-button" style={removeStyle} onClick={deleteaBlog}>
            remove
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
