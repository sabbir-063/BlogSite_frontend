import React, { useState } from 'react';
import axios from '../../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`/auth/reset-password/${token}`, { password });
            toast.success(res.data.message);
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error resetting password.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter new password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
                    disabled={loading}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}