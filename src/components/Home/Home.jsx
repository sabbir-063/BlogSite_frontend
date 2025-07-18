import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

const Home = ({setUser}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");   // Clear token
        localStorage.removeItem("user");   // Clear user data
        setUser(null);                     // Clear user state
        console.log("User logged out");
        alert("You have been logged out successfully!"); // Alert user
        navigate("/login");                 // Redirect to login
    }

    return (
        <div className="landing-container">
            <h1>Welcome to Social Media App</h1>
            <div className="landing-buttons">
                <Link to="/login" className="landing-btn">Login</Link>
                <Link to="/register" className="landing-btn">Register</Link>
                <button className="landing-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Home