import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginType, LoginResponse } from "../types/user.types";
export const Login = () => {
  const [user, setUser] = useState<UserLoginType>({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>(
        "http://localhost:5005/auth/login",
        user
      );
      console.log("here is the user to signup", data);
      localStorage.setItem("authToken", data.authToken);
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="your email"
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
        </label>
        <label>
          password:
          <input
            type="password"
            name="password"
            placeholder="your password"
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};
