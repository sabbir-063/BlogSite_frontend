import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setLocalUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo"><Link to="/">MyBlog</Link></div>
            <ul className="navbar-links">
                {user ? (
                    <>
                        <li>Hello, {localUser.username}</li>
                        <li>
                            <Link to="/create-post">
                                <button className="create-btn">Create Post</button>
                            </Link>
                        </li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
