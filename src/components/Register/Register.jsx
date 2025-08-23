import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import OptimizedImage from "../ui/optimized-image";

const Register = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        datathOfBirth: "",
        profilePicture: "https://images.unsplash.com/photo-1615911907304-d418c903b058?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicFile(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        let temp = {};
        if (!form.firstname.trim()) temp.firstname = "First name is required";
        if (!form.lastname.trim()) temp.lastname = "Last name is required";
        if (!form.datathOfBirth.trim()) temp.datathOfBirth = "Date of birth is required";
        if (!form.username.trim()) temp.username = "Username is required";
        if (!form.email.trim()) temp.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) temp.email = "Email is not valid";
        if (!form.password.trim()) temp.password = "Password is required";
        else if (form.password.length < 6) temp.password = "Password must be at least 6 characters";
        if (!form.confirmPassword.trim()) temp.confirmPassword = "Please confirm your password";
        else if (form.password !== form.confirmPassword) temp.confirmPassword = "Passwords do not match";
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        const data = new FormData();
        Object.keys(form).forEach((key) => data.append(key, form[key]));
        if (profilePicFile) data.append("profilePicture", profilePicFile);
        try {
            await axios.post("/auth/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Registered! Please login.");
            navigate("/login");
        } catch (err) {
            const message = err.response?.data || "Registration failed";
            toast.error(typeof message === "string" ? message : JSON.stringify(message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted px-4 overflow-hidden">
            <div className="flex justify-center pt-20">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Register</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname">First Name</Label>
                                    <Input
                                        id="firstname"
                                        name="firstname"
                                        placeholder="First Name"
                                        value={form.firstname}
                                        onChange={handleChange}
                                        aria-invalid={!!errors.firstname}
                                        aria-describedby={errors.firstname ? "firstname-error" : undefined}
                                        disabled={loading}
                                    />
                                    {errors.firstname && (
                                        <div id="firstname-error" className="text-destructive text-xs mt-1">
                                            {errors.firstname}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Last Name"
                                        value={form.lastname}
                                        onChange={handleChange}
                                        aria-invalid={!!errors.lastname}
                                        aria-describedby={errors.lastname ? "lastname-error" : undefined}
                                        disabled={loading}
                                    />
                                    {errors.lastname && (
                                        <div id="lastname-error" className="text-destructive text-xs mt-1">
                                            {errors.lastname}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="datathOfBirth">Date of Birth</Label>
                                <Input
                                    id="datathOfBirth"
                                    name="datathOfBirth"
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={form.datathOfBirth}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.datathOfBirth}
                                    aria-describedby={errors.datathOfBirth ? "dob-error" : undefined}
                                    disabled={loading}
                                />
                                {errors.datathOfBirth && (
                                    <div id="dob-error" className="text-destructive text-xs mt-1">
                                        {errors.datathOfBirth}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profilePicture">Profile Picture</Label>
                                <Input
                                    id="profilePicture"
                                    name="profilePicture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                                {previewURL && (
                                    <OptimizedImage
                                        src={previewURL}
                                        alt="Preview"
                                        className="w-20 h-20 rounded-full object-cover mt-2 border"
                                        size="thumbnail"
                                        lazy={false}
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.username}
                                    aria-describedby={errors.username ? "username-error" : undefined}
                                    disabled={loading}
                                />
                                {errors.username && (
                                    <div id="username-error" className="text-destructive text-xs mt-1">
                                        {errors.username}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    disabled={loading}
                                />
                                {errors.email && (
                                    <div id="email-error" className="text-destructive text-xs mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    disabled={loading}
                                />
                                {errors.password && (
                                    <div id="password-error" className="text-destructive text-xs mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.confirmPassword}
                                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                                    disabled={loading}
                                />
                                {errors.confirmPassword && (
                                    <div id="confirmPassword-error" className="text-destructive text-xs mt-1">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </Button>
                            <div className="text-center mt-4 text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-blue-600 hover:underline font-semibold focus:outline-none"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
