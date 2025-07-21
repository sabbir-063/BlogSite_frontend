import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleChange = e =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generate previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = idx => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);

    const newPreviews = imagePreviews.filter((_, i) => i !== idx);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      images.forEach(file => formData.append("imageLinks", file));
      
      await axios.post("/posts/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
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
        <input
          type="file"
          name="imageLinks"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreviews.length > 0 && (
          <div className="image-preview-list">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="image-preview-item">
                <img src={src} alt={`preview-${idx}`} className="image-preview-img" />
                <button
                  type="button"
                  className="image-remove-btn"
                  onClick={() => handleRemoveImage(idx)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
