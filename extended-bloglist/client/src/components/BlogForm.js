import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreate }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    handleCreate(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:{" "}
          <input
            id="title"
            ref={inputRef}
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button id="create-button">create</button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default BlogForm;
