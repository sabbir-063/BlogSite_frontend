import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import "./Home.css";
import PostCard from "../Post/PostCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("/posts/all")
            .then((res) => setPosts(res.data))
            .catch((err) => alert(`Failed to load posts ${err}`))
            .finally(() => setLoading(false));
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="mx-auto px-6 py-8 max-w-max">
            <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-4">
                {posts.map((post) => (
                    <PostCard key={post?._id} post={post} onPostClick={handlePostClick} />
                ))}
            </div>
        </div>
    );
};

export default Home;
