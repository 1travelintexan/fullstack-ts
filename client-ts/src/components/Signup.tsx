import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignUpType } from "../types/user.types";
export const Signup = () => {
  const [user, setUser] = useState<UserSignUpType>({
    username: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const newUser = await axios.post<UserSignUpType>(
        "http://localhost:5005/auth/signup",
        user
      );
      console.log("here is the user to signup", newUser);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="your username"
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
        </label>
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
        <button>Sign Up</button>
      </form>
    </div>
  );
};
