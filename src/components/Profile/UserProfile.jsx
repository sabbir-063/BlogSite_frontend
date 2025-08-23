import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import OptimizedImage from '../ui/optimized-image';
import {
    User,
    Mail,
    Calendar,
    Edit,
    Save,
    X,
    Lock,
    Eye,
    EyeOff,
    Camera,
    Upload
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
    const { user: authUser, login } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    // Form states
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        datathOfBirth: '',
        profilePicture: ''
    });

    // Password form states
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/user/profile');
            setUser(response.data);
            setFormData({
                firstname: response.data.firstname || '',
                lastname: response.data.lastname || '',
                username: response.data.username || '',
                datathOfBirth: response.data.datathOfBirth ? new Date(response.data.datathOfBirth).toISOString().split('T')[0] : '',
                profilePicture: response.data.profilePicture || ''
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileUpdate = async () => {
        try {
            const response = await axiosInstance.put('/user/profile', formData);
            const updatedUser = response.data.user;
            setUser(updatedUser);

            // Update the AuthContext so navbar reflects the changes
            login(updatedUser);

            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.error || 'Failed to update profile');
        }
    };

    const handlePasswordUpdate = async () => {
        try {
            await axiosInstance.put('/user/password', passwordData);
            setIsChangingPassword(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            toast.success('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error(error.response?.data?.error || 'Failed to update password');
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('profilePicture', file);

            // Update profile with new image
            axiosInstance.put('/user/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    const updatedUser = response.data.user;
                    setUser(updatedUser);
                    setFormData(prev => ({
                        ...prev,
                        profilePicture: updatedUser.profilePicture
                    }));

                    // Update the AuthContext so navbar reflects the changes
                    login(updatedUser);

                    toast.success('Profile picture updated successfully!');
                })
                .catch(error => {
                    console.error('Error uploading profile picture:', error);
                    toast.error(error.response?.data?.error || 'Failed to upload profile picture');
                });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <p className="text-center text-gray-600">Failed to load profile</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your account information and settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Picture Section */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Camera className="w-5 h-5" />
                                    Profile Picture
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            {formData.profilePicture ? (
                                                <OptimizedImage
                                                    src={formData.profilePicture}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                    size="thumbnail"
                                                    fallback="/Profile_avatar_placeholder_large.png"
                                                />
                                            ) : (
                                                <User className="w-16 h-16 text-white" />
                                            )}
                                        </div>
                                        {isEditing && (
                                            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                                <Upload className="w-4 h-4" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {user.firstname} {user.lastname}
                                        </h3>
                                        <p className="text-gray-600">@{user.username}</p>
                                        {/* <Badge variant="secondary" className="mt-2">
                                            {user.role}
                                        </Badge> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Information Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Basic Information
                                        </CardTitle>
                                        <CardDescription>
                                            Your personal information and account details
                                        </CardDescription>
                                    </div>
                                    {!isEditing ? (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={handleProfileUpdate}
                                                className="flex items-center gap-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        firstname: user.firstname || '',
                                                        lastname: user.lastname || '',
                                                        username: user.username || '',
                                                        datathOfBirth: user.datathOfBirth ? new Date(user.datathOfBirth).toISOString().split('T')[0] : '',
                                                        profilePicture: user.profilePicture || ''
                                                    });
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">First Name</Label>
                                        {isEditing ? (
                                            <Input
                                                id="firstname"
                                                name="firstname"
                                                value={formData.firstname}
                                                onChange={handleInputChange}
                                                placeholder="Enter first name"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                {user.firstname || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Last Name</Label>
                                        {isEditing ? (
                                            <Input
                                                id="lastname"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleInputChange}
                                                placeholder="Enter last name"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                {user.lastname || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        {isEditing ? (
                                            <Input
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                placeholder="Enter username"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                @{user.username}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            {user.email}
                                        </div>
                                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                                    </div>

                                    <div className="">
                                        <Label htmlFor="datathOfBirth">Date of Birth</Label>
                                        {isEditing ? (
                                            <Input
                                                id="datathOfBirth"
                                                name="datathOfBirth"
                                                type="date"
                                                value={formData.datathOfBirth}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                {user.datathOfBirth ? new Date(user.datathOfBirth).toLocaleDateString() : 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    {/* <div className="space-y-2">
                                        <Label>Role</Label>
                                        <div className="p-3 bg-gray-50 rounded-md">
                                            <Badge variant="outline" className="capitalize">
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </div> */}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Password Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Lock className="w-5 h-5" />
                                            Password
                                        </CardTitle>
                                        <CardDescription>
                                            Update your account password
                                        </CardDescription>
                                    </div>
                                    {!isChangingPassword ? (
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsChangingPassword(true)}
                                            className="flex items-center gap-2"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Change Password
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={handlePasswordUpdate}
                                                className="flex items-center gap-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                Update Password
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsChangingPassword(false);
                                                    setPasswordData({
                                                        currentPassword: '',
                                                        newPassword: '',
                                                        confirmPassword: ''
                                                    });
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            {isChangingPassword && (
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="currentPassword"
                                                    name="currentPassword"
                                                    type={showPasswords.current ? "text" : "password"}
                                                    value={passwordData.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('current')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type={showPasswords.new ? "text" : "password"}
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Enter new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={showPasswords.confirm ? "text" : "password"}
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Confirm new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Account Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Statistics</CardTitle>
                                <CardDescription>
                                    Your account activity and information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-600">Joined Date</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">
                                            {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-600">Last Updated</div>
                                    </div>
                                    {/* <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {user.role}
                                        </div>
                                        <div className="text-sm text-gray-600">Account Type</div>
                                    </div> */}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;