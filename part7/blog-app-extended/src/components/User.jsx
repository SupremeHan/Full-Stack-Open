import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducers/userReducer";

export function User() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const logOut = () => {
    window.localStorage.clear();
    dispatch(clearUser());
  };

  return (
    <div className="user-area">
      <p>{`${user.name} logged in`}</p>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}
