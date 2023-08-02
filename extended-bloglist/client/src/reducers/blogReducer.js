import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      //   console.log("setBlogs", action);
      return action.payload;
    },
    appendBlog(state, action) {
      //   console.log("appendBlog", action);
      //   return state.push(action.payload);
      return [...state, action.payload];
    },
    likeBlog(state, action) {
      //   console.log("likeBlog", action.payload);
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
    deleteBlog(state, action) {
      console.log("deleteBlog", action);
      const id = action.payload;
      console.log(id);
      return state.filter((blog) => blog.id !== id);
    },
    createComment(state, action) {
      console.log("createComment", action.payload);
      const id = action.payload.id;
      console.log("idcomment", id);
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, deleteBlog, createComment } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("reducerblogs", blogs);
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const addLikeBlog = (id, blog) => {
  console.log("id", id);
  return async (dispatch) => {
    const likedBlog = await blogService.addLike(id, blog);
    dispatch(likeBlog(likedBlog));
  };
};

export const removeBlog = (id) => {
  console.log("removeid", id);

  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const addBlogComment = (id, comment) => {
  console.log("123", id, comment);
  return async (dispatch) => {
    const newAddComment = await blogService.addComment(id, comment);
    console.log("newAddComment", newAddComment);
    dispatch(createComment(newAddComment));
  };
};

export default blogSlice.reducer;
