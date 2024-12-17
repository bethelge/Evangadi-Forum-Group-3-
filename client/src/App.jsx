import React, { createContext, useEffect } from "react"; // Add this line
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
