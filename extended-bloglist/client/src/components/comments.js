import React from "react";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { addBlogComment } from "../reducers/blogReducer";

const comments = ({ blog }) => {
  //   console.log("blogincomment", blog);
  const { reset: resetComment, ...comment } = useField("text");
  const dispatch = useDispatch();

  const handleAddComment = () => {
    resetComment();
    // console.log("comment", comment.value);

    const newComment = comment.value;
    dispatch(addBlogComment(blog.id, newComment));
  };

  return (
    <div>
      <h3>comments</h3>

      <div>
        <input {...comment} />
        <button onClick={handleAddComment}>add comment</button>
      </div>

      <div>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </div>
  );
};

export default comments;
