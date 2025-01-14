import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { AuthContext } from "./contexts/auth.context.tsx";
type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};
function App() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const { user } = useContext(AuthContext);
  // console.log("user from context", user);
  useEffect(() => {
    async function getTodos() {
      try {
        const { data } = await axios.get<Todo[]>(
          "http://localhost:5005/todo/all-todos"
        );
        // console.log("here are all the todos", data);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);
  return (
    <>
      <Navbar />
      <h1>{user?.username}'s TS Full Stack</h1>
      <Routes>
        <Route path="/" element={<HomePage todos={todos} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
