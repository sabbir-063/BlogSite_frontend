import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import "./Home.css";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("/posts/all")
            .then((res) => setPosts(res.data))
            .catch((err) => alert("Failed to load posts"));
    }, []);

    return (
        <div className="home-wrapper">
            <h2 className="home-title">📚 Latest Blog Posts</h2>
            <div className="post-grid">
                {posts.map((post) => (
                    <div className="post-card" key={post._id}>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-content">{post.content.slice(0, 150)}...</p>
                        <div className="post-footer">
                            <span className="author">👤 {post.author?.username || "Unknown"}</span>
                            <div className="post-actions">
                                <button className="icon-button">
                                    <FaRegHeart />
                                    <span>Like</span>
                                </button>
                                <button className="icon-button">
                                    <FaRegCommentDots />
                                    <span>Comment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
