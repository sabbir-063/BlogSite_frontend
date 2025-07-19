import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [form, setForm] = useState({ 
        firstname: "", 
        lastname: "", 
        datathOfBirth: "", 
        profilePicture: "https://images.unsplash.com/photo-1615911907304-d418c903b058?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        username: "", 
        email: "", 
        password: "" 
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
    };

    const validate = () => {
        let temp = {};
        if (!form.username.trim()) temp.username = "Username is required";
        if (!form.email.trim()) temp.email = "Email is required";
        if (!form.password.trim()) temp.password = "Password is required";
        else if (form.password.length < 6) temp.password = "Password must be at least 6 characters";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post("/auth/register", form);
            alert("Registered! Please login.");
            navigate("/login");
        } catch (err) {
            const message = err.response?.data || "Registration failed";
            alert(typeof message === "string" ? message : JSON.stringify(message));
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                <input
                    name="firstname"
                    placeholder="First Name"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                />
                <lastname
                    name="lastname"
                    placeholder="Last Name"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    name="datathOfBirth"
                    type="date"
                    placeholder="Date of Birth"
                    value={form.datathOfBirth}
                    onChange={handleChange}
                    required
                />
                <input 
                    name="profilePicture"
                    type="url"
                    placeholder="Profile Picture URL"
                    value={form.profilePicture}
                    onChange={handleChange}
                />
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                {errors.username && <span className="error">{errors.username}</span>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
