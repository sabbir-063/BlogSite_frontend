import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [data, setData] = useState({ 
        email: "", 
        password: "" 
    });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Replace with your API endpoint
        try {
            const url = 'https://blogsite-backend-4fmp.onrender.com/api/auth';
            const {data:res} = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            window.location = "/";
        } catch {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;