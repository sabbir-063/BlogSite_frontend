import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import MyPosts from "./components/MyPosts/MyPosts";
import EditPost from "./components/Post/EditPost";
import DashBoard from "./components/DashBoard/DashBoard";
import Footer from "./components/DashBoard/Footer";

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
        <Route path="/" element={<DashBoard />} />
        <Route path="/blogs" element={<Home user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/create-post" element={<ProtectedRoute> <CreatePost /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
        <Route path="/my-posts" element={<ProtectedRoute> <MyPosts /> </ProtectedRoute>} />
        <Route path="/edit-post/:postId" element={<ProtectedRoute> <EditPost /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
