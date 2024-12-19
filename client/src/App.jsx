import React, { createContext, useEffect } from "react"; // Add this line
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Logout from "./pages/Logout";
import Register from "./pages/RegisterPage/Register";
import axios from "./axiosConfig";
import ProtectedRoute from "./ProtectedRoute";
import AskQuestion from "./pages/AskQuestionPage/AskQuestion";
import QuestionAnswer from './pages/QuestionAnswerPage/QuestionAnswer';

export const appState = createContext();
function App() {
  // lazzy initialization , the call back calls this only ones , not in every render
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      localStorage.removeItem("user"); // Clear user data if invalid
      localStorage.removeItem("token"); // Clear token if invalid
      setUser(null); // Clear user state
      navigate("/login");
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    }
  }, [token]);

  return (
    <appState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="Logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AskQuestion"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
         <Route path='question/:question_id' element = {<ProtectedRoute><QuestionAnswer/></ProtectedRoute>}/>
      </Routes>
    </appState.Provider>
  );
}

export default App;
