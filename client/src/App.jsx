import React, { createContext, useEffect } from "react"; // Add this line
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage/Home";
import Register from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
