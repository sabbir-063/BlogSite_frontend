import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const MAX_IMAGE_SIZE_MB = 5;

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

  const validate = () => {
    let temp = {};
    if (!post.title.trim()) temp.title = "Title is required";
    if (!post.content.trim()) temp.content = "Content is required";
    if (images.length === 0) temp.images = "At least one image is required";
    for (const img of images) {
      if (img.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        temp.images = `All images must be less than ${MAX_IMAGE_SIZE_MB}MB.`;
        break;
      }
    }
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
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
      toast.success("Post created!");
      navigate("/blogs");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted px-4 overflow-hidden">
      <div className="flex justify-center pt-20">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={post.title}
                  onChange={handleChange}
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  disabled={loading}
                />
                {errors.title && (
                  <div id="title-error" className="text-destructive text-xs mt-1">
                    {errors.title}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Content"
                  rows={5}
                  value={post.content}
                  onChange={handleChange}
                  aria-invalid={!!errors.content}
                  aria-describedby={errors.content ? "content-error" : undefined}
                  disabled={loading}
                />
                {errors.content && (
                  <div id="content-error" className="text-destructive text-xs mt-1">
                    {errors.content}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageLinks">Images</Label>
                <Input
                  id="imageLinks"
                  name="imageLinks"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {errors.images && (
                  <div className="text-destructive text-xs mt-1">
                    {errors.images}
                  </div>
                )}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border bg-background">
                        <img
                          src={src}
                          alt={`preview-${idx}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity focus:outline-none"
                          onClick={() => handleRemoveImage(idx)}
                          aria-label="Remove image"
                          disabled={loading}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Publishing..." : "Publish"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
