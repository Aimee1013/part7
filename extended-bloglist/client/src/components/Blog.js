import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLikeBlog, removeBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import Comments from "./comments";

const Blog = () => {
  const { id } = useParams();
  console.log("useParams", id);
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addLikes = () => {
    const likedBlog = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
    };
    dispatch(addLikeBlog(blog.id, likedBlog));
  };

  const deleteaBlog = () => {
    console.log("deleteaBlog", blog.id);
    dispatch(removeBlog(blog.id));
    navigate("/");
  };

  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button style={{ marginLeft: 5 }} onClick={addLikes}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button onClick={deleteaBlog}>remove</button>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
