import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./components/CreatePost/CreatePost";
import { decodeToken } from './utils/decode_token'
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = decodeToken(token);
    if (decoded) {
      setUser(decoded);
      // console.log("User decoded from token: ", user._id, user.username, user.email);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      // console.log("Invalid token, user set to null");
    }
  }, []);


  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
