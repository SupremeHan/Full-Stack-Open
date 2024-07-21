import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import { Blog } from "./components/Blog";
import { BlogForm } from "./components/BlogForm";
import Togglable from "./components/Toggalabel";
import { Notification } from "./components/Notification";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setNotifiaction } from "./reducers/notificationReducer";
import { createBlog, deleteBlog, initializeBlogs, updateBlogLikes } from "./reducers/blogsReducer";
import { clearUser, storeUser } from "./reducers/userReducer";

function App() {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const blogRef = useRef();

  const dispatch = useDispatch();

  const login = formData => {
    loginService
      .login(formData)
      .then(user => {
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        blogService.setToken(user.token);
        dispatch(storeUser(user));
      })
      .catch(() => {
        dispatch(setNotifiaction({ type: "error", msg: "Wrong credentials" }));
      });
  };

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

  const logOut = () => {
    window.localStorage.clear();
    dispatch(clearUser());
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
    <div>
      <Notification />
      {user.userData ? (
        <div className="blog-area">
          <div className="user-area">
            <p>{`${user.name} logged in`}</p>
            <button onClick={logOut}>Logout</button>
          </div>

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
      ) : (
        <>
          <h2>Login to application</h2>
          <Togglable buttonLabel="view">
            <LoginForm loginUser={login} />
          </Togglable>
        </>
      )}
    </div>
  );
}

export default App;
