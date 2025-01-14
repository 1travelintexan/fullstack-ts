import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

export const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
