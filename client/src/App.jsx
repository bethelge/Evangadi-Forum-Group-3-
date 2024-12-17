import React, { createContext, useEffect } from "react"; // Add this line
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import axios from "./axiosConfig";

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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </appState.Provider>
  );
}

export default App;
