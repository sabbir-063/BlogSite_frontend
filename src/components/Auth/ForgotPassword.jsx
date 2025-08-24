import React, { useState } from 'react';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/auth/forgot-password', { email });
            toast.success(res.data.message);
            setEmail('');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error sending reset email.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        </div>
    );
}