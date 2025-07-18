import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log(data);
        // Replace with your API endpoint
        try {
            const url = 'https://blogsite-backend-4fmp.onrender.com/api/users'; // Adjust the URL as needed
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
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
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name='firstname'
                    placeholder="First Name"
                    value={data.firstname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name='lastname'
                    placeholder="Last Name"
                    value={data.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name='username'
                    placeholder="User Name"
                    value={data.username}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;