import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotifiaction } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map(blog => (blog.id === action.payload.id ? action.payload : blog));
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      const blog = await blogsService.create(newBlog);

      dispatch(addBlog(blog));
      dispatch(
        setNotifiaction({
          type: "success",
          msg: `A new blog ${blog.title} by ${blog.author} added`,
        }),
      );
    } catch (err) {
      dispatch(
        setNotifiaction({
          type: "error",
          msg: "Failed to add a new blog",
        }),
      );
    }
  };
};

export const updateBlogLikes = updatedObj => {
  return async dispatch => {
    try {
      const update = await blogsService.update(updatedObj);
      dispatch(updateBlog(update));
    } catch (error) {
      dispatch(
        setNotifiaction({
          type: "error",
          msg: "Failed to update likes",
        }),
      );
    }
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    try {
      await blogsService.remove(id);
      dispatch(removeBlog(id));
    } catch (error) {
      dispatch(
        setNotifiaction({
          type: "error",
          msg: "Failed to delete blog",
        }),
      );
    }
  };
};

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
