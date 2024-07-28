import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../reducers/usersReducer";

export function UsersPage() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <div>
        {users.length > 0 ? (
          users.map(user => <div key={user.id}>{user.name}</div>)
        ) : (
          <div>bla</div>
        )}
      </div>
    </div>
  );
}
