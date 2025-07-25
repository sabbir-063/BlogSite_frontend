import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./components/CreatePost/CreatePost";
import ProtectedRoute from "./utils/protectedRoute";
import Navbar2 from "./components/Navbar/Navbar2";
import { validateUser } from "./utils/validateUser";
import NotFound from "./components/NotFound";
import PostDetails from "./components/Post/PostDetails";
import UserProfile from "./components/Profile/UserProfile";

function App() {
  const [user, setUser] = useState(validateUser);

  return (
    <Router>
      {
        user ? (
          <Navbar2 user={user} setUser={setUser} />
        ) :
          (
            <Navbar />
          )
      }
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/create-post" element={<ProtectedRoute> <CreatePost /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
