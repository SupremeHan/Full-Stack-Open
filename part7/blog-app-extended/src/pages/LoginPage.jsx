import { LoginForm } from "../components/LoginForm";
import Togglable from "../components/Toggalabel";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { storeUser } from "../reducers/userReducer";
import { setNotifiaction } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = formData => {
    loginService
      .login(formData)
      .then(user => {
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        blogService.setToken(user.token);
        dispatch(storeUser(user));
        navigate("/");
      })
      .catch(() => {
        dispatch(setNotifiaction({ type: "error", msg: "Wrong credentials" }));
      });
  };

  return (
    <div>
      <h2>Login to application</h2>
      <Togglable buttonLabel="view">
        <LoginForm loginUser={login} />
      </Togglable>
    </div>
  );
}
