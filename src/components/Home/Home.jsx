import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import "./Home.css";
import PostCard from "../Post/PostCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("/posts/all")
            .then((res) => setPosts(res.data))
            .catch((err) => alert(`Failed to load posts ${err}`));
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    return (
        <div className="mx-auto px-6 py-8 max-w-max">
            {/* <h2 className="home-title">📚 Latest Blog Posts</h2> */}
            <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-4">
                {posts.map((post) => (
                    <PostCard key={post?._id} post={post} onPostClick={handlePostClick} />
                ))}
            </div>
        </div>
    );
};

export default Home;
