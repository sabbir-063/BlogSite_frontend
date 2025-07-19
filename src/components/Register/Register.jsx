import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
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
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />
                {errors.username && <span className="error">{errors.username}</span>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
