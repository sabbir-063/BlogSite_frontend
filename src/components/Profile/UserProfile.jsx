import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import './UserProfile.css';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('info');
    const [userInfo, setUserInfo] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [profileRes, postsRes, statsRes] = await Promise.all([
                    axiosInstance.get('/user/profile'),
                    axiosInstance.get('/user/posts'),
                    axiosInstance.get('/user/stats')
                ]);

                setUserInfo(profileRes.data);
                setUserPosts(postsRes.data);
                setUserStats(statsRes.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <div className="user-info">
                        <div className="profile-header">
                            <img src={userInfo?.profilePicture} alt="Profile" className="profile-picture" />
                            <div className="profile-details">
                                <h2>{userInfo?.firstname} {userInfo?.lastname}</h2>
                                <p className="username">@{userInfo?.username}</p>
                                <Badge>{userInfo?.role}</Badge>
                            </div>
                        </div>
                        <Card className="info-card">
                            <div className="info-item">
                                <span className="label">Email:</span>
                                <span>{userInfo?.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Date of Birth:</span>
                                <span>{new Date(userInfo?.datathOfBirth).toLocaleDateString()}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Member Since:</span>
                                <span>{new Date(userInfo?.createdAt).toLocaleDateString()}</span>
                            </div>
                        </Card>
                    </div>
                );

            case 'posts':
                return (
                    <div className="user-posts">
                        {userPosts.map(post => (
                            <Card key={post._id} className="post-card">
                                <h3>{post.title}</h3>
                                <p>{post.content.substring(0, 150)}...</p>
                                <div className="post-meta">
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    {post.imageLinks?.length > 0 && (
                                        <Badge variant="secondary">{post.imageLinks.length} images</Badge>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                );

            case 'stats':
                return (
                    <div className="user-stats">
                        <Card className="stats-card">
                            <div className="stat-item">
                                <h3>Total Posts</h3>
                                <p className="stat-value">{userStats?.totalPosts}</p>
                            </div>
                            <div className="stat-item">
                                <h3>Member Since</h3>
                                <p className="stat-value">{new Date(userStats?.joinedDate).toLocaleDateString()}</p>
                            </div>
                            <div className="stat-item">
                                <h3>Last Active</h3>
                                <p className="stat-value">{new Date(userStats?.lastActive).toLocaleDateString()}</p>
                            </div>
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <Button
                    variant={activeTab === 'info' ? 'default' : 'ghost'}
                    className="sidebar-button"
                    onClick={() => setActiveTab('info')}
                >
                    User Information
                </Button>
                <Button
                    variant={activeTab === 'posts' ? 'default' : 'ghost'}
                    className="sidebar-button"
                    onClick={() => setActiveTab('posts')}
                >
                    My Posts
                </Button>
                <Button
                    variant={activeTab === 'stats' ? 'default' : 'ghost'}
                    className="sidebar-button"
                    onClick={() => setActiveTab('stats')}
                >
                    Statistics
                </Button>
            </div>
            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserProfile;