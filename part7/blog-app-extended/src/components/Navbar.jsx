import { Link } from "react-router-dom";
import { User } from "./User";

export function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <ul style={{ display: "flex", gap: "5px", listStyleType: "none", padding: 0 }}>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <User />
    </nav>
  );
}
