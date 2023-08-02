import React from "react";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";
import { notification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");
  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createNewBlog(newBlog));
    dispatch(
      notification(`a new blog ${title.value} created by ${author.value}`, 5)
    );

    resetTitle();
    resetAuthor();
    resetUrl();
  };
  return (
    <div>
      <Notification />
      <h2>create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          author: <input {...author} />
        </div>
        <div>
          url: <input {...url} />
        </div>
        <div>
          <button id="create-button">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
