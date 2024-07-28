import { useDispatch, useSelector } from "react-redux";
import { Blog } from "../components/Blog";
import { BlogForm } from "../components/BlogForm";
import Togglable from "../components/Toggalabel";
import { useEffect, useRef } from "react";
import { createBlog, deleteBlog, initializeBlogs, updateBlogLikes } from "../reducers/blogsReducer";
import { storeUser } from "../reducers/userReducer";
import blogService from "../services/blogs";

export default function BlogsPage() {
  const blogs = useSelector(state => state.blogs);
  const blogRef = useRef();

  const dispatch = useDispatch();

  const createNewBlog = newBlog => {
    dispatch(createBlog(newBlog));
    blogRef.current.toggleVisibility();
  };

  const addBlogLike = blog => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(updateBlogLikes(updatedBlog));
  };

  const removeBlog = deletedBlog => {
    if (window.confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}`)) {
      dispatch(deleteBlog(deletedBlog.id));
    }
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(storeUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div className="blog-area">
      <Togglable ref={blogRef} buttonLabel="new blog">
        <BlogForm addBlog={createNewBlog} />
      </Togglable>

      <div className="blog-cards">
        {[...blogs]
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map(blog => (
            <div key={blog.id}>
              <Blog blog={blog} addLike={addBlogLike} removeBlog={removeBlog} />
            </div>
          ))}
      </div>
    </div>
  );
}
