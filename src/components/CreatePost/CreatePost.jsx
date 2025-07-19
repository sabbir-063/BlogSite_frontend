import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = e =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // console.log("Creating post with token:", token);
      await axios.post("/posts/create", post, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Post created!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create post");
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-form">
        <h2>Create Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          rows={5}
          onChange={handleChange}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
