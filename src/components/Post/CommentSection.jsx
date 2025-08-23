import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from '@/components/ui/optimized-image';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import {
    Heart,
    MessageCircle,
    Trash2,
    Send,
    User,
    Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CommentSection = ({ post, onPostUpdate }) => {
    const { user, isAuthenticated } = useAuth();
    const [commentContent, setCommentContent] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);

    const handleAddComment = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to comment');
            return;
        }

        if (!commentContent.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        setCommentLoading(true);
        try {
            const response = await axios.post(`/posts/${post._id}/comments`, {
                content: commentContent.trim()
            });

            onPostUpdate(response.data.post);
            setCommentContent('');
            toast.success('Comment added successfully!');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error(error.response?.data?.error || 'Failed to add comment');
        } finally {
            setCommentLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!isAuthenticated) return;

        setDeleteLoading(commentId);
        try {
            const response = await axios.delete(`/posts/${post._id}/comments/${commentId}`);
            onPostUpdate(response.data.post);
            toast.success('Comment deleted successfully!');
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error(error.response?.data?.error || 'Failed to delete comment');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleToggleCommentLike = async (commentId) => {
        if (!isAuthenticated) {
            toast.error('Please login to like comments');
            return;
        }

        try {
            const response = await axios.post(`/posts/${post._id}/comments/${commentId}/like`);
            onPostUpdate(response.data.post);
        } catch (error) {
            console.error('Error toggling comment like:', error);
            toast.error(error.response?.data?.error || 'Failed to like comment');
        }
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        const diffInSeconds = Math.floor((now - commentDate) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return commentDate.toLocaleDateString();
    };

    const isCommentLiked = (comment) => {
        return comment.likes?.some(like => like._id === user?._id);
    };

    const canDeleteComment = (comment) => {
        return user?._id === comment.user._id || user?.role === 'admin';
    };

    return (
        <div className="mt-8 space-y-6">
            {/* Comment Input Section */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            {user?.profilePicture ? (
                                <OptimizedImage
                                    src={user.profilePicture}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <Textarea
                                placeholder="Share your thoughts..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                className="min-h-[80px] resize-none border-0 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                                disabled={commentLoading}
                            />
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                    {commentContent.length}/1000 characters
                                </span>
                                <Button
                                    onClick={handleAddComment}
                                    disabled={commentLoading || !commentContent.trim()}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {commentLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Posting...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Send className="w-4 h-4" />
                                            <span>Post Comment</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                        Comments ({post.comments?.length || 0})
                    </h3>
                </div>

                {post.comments && post.comments.length > 0 ? (
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <Card key={comment._id} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                                <CardContent className="p-4">
                                    <div className="flex items-start space-x-3">
                                        {/* User Avatar */}
                                        <div className="flex-shrink-0">
                                            {comment.user?.profilePicture ? (
                                                <OptimizedImage
                                                    src={comment.user.profilePicture}
                                                    alt={comment.user.username}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Comment Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-900">
                                                    {comment.user?.firstname} {comment.user?.lastname}
                                                </span>
                                                <Badge variant="secondary" className="text-xs px-2 py-1">
                                                    @{comment.user?.username}
                                                </Badge>
                                                <div className="flex items-center space-x-1 text-gray-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-xs">{formatTimeAgo(comment.createdAt)}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 leading-relaxed mb-3">
                                                {comment.content}
                                            </p>

                                            {/* Comment Actions */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleToggleCommentLike(comment._id)}
                                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-200 ${isCommentLiked(comment)
                                                            ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                                            : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                                                            }`}
                                                    >
                                                        <Heart className={`w-4 h-4 ${isCommentLiked(comment) ? 'fill-current' : ''}`} />
                                                        <span className="text-sm">{comment.likes?.length || 0}</span>
                                                    </Button>
                                                </div>

                                                {/* Delete Button */}
                                                {canDeleteComment(comment) && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteComment(comment._id)}
                                                        disabled={deleteLoading === comment._id}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-full transition-all duration-200"
                                                    >
                                                        {deleteLoading === comment._id ? (
                                                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-lg">No comments yet</p>
                        <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
