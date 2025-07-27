import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';
import './MyPosts.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
    FileText,
    Plus,
    Edit,
    Trash2,
    Eye,
    Calendar,
    User,
    Image as ImageIcon,
    AlertCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingPost, setDeletingPost] = useState(null);
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const fetchMyPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('user/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Failed to load your posts');
        } finally {
            setLoading(false);
        }
    };

    const handleEditPost = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const handleViewPost = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const handleDeletePost = (postId) => {
        setPostToDelete(postId);
        setShowDeleteDialog(true);
    };

    const confirmDeletePost = async () => {
        if (!postToDelete) return;
        try {
            setDeletingPost(postToDelete);
            await axiosInstance.delete(`/posts/${postToDelete}`);
            setPosts(posts.filter(post => post._id !== postToDelete));
            toast.success('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error(error.response?.data?.error || 'Failed to delete post');
        } finally {
            setDeletingPost(null);
            setShowDeleteDialog(false);
            setPostToDelete(null);
        }
    };

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-8 h-8" />
                                My Posts
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage and view all your published posts
                            </p>
                        </div>
                        <Button
                            onClick={handleCreatePost}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4" />
                            Create New Post
                        </Button>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                                    <div className="text-sm text-gray-600">Total Posts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {posts.filter(post => new Date(post.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                                    </div>
                                    <div className="text-sm text-gray-600">This Week</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {posts.filter(post => new Date(post.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                                    </div>
                                    <div className="text-sm text-gray-600">This Month</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">
                                        {posts.length > 0 ? new Date(posts[0].createdAt).toLocaleDateString() : 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-600">Latest Post</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
                            <p className="text-gray-600 mb-6">
                                You haven't created any posts yet. Start sharing your thoughts with the world!
                            </p>
                            {/* <Button
                                onClick={handleCreatePost}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Create Your First Post
                            </Button> */}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-3 lg:grid-cols-3 lg:gap-6 md:gap-4">
                        {posts.map((post) => (
                            <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                {/* Post Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.imageLinks?.[0] || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Badge variant="secondary" className="bg-black bg-opacity-50 text-gray-900">
                                            {post.imageLinks?.length || 0} images
                                        </Badge>
                                    </div>
                                </div>

                                {/* Post date, Author name */}
                                <CardHeader className="pb-3">
                                    <div className="space-y-2">
                                        <CardTitle className="text-lg font-semibold line-clamp-2 h-12">
                                            {post.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {post.author?.firstname} {post.author?.lastname}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 h-16">
                                        {post.content}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewPost(post._id)}
                                            className="flex items-center gap-1 flex-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditPost(post._id)}
                                            className="flex items-center gap-1"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeletePost(post._id)}
                                            disabled={deletingPost === post._id}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            {deletingPost === post._id ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination or Load More */}
                {posts.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Showing {posts.length} of {posts.length} posts
                        </p>
                    </div>
                )}
            </div>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                    </DialogHeader>
                    <div>Are you sure you want to delete this post? This action cannot be undone.</div>
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setShowDeleteDialog(false)} disabled={deletingPost === postToDelete}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDeletePost} disabled={deletingPost === postToDelete}>
                            {deletingPost === postToDelete ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyPosts; 