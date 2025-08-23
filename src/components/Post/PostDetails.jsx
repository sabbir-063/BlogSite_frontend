import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import {
    Heart,
    MessageCircle,
    Share,
    Bookmark,
    ArrowLeft,
    Clock,
    User,
    ChevronLeft,
    ChevronRight,
    Eye
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/ui/optimized-image';
import CommentSection from './CommentSection';
import { useAuth } from '../../contexts/AuthContext';

const PostDetails = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        if (!postId) return;
        // console.log("Fetching post with ID:", postId);
        axios.get(`/posts/${postId}`)
            .then(res => {
                // console.log("Post fetched successfully:", res.data);
                setPost(res.data);
                setLikeCount(res.data.likes?.length || 0);
                setIsLiked(res.data.likes?.some(like => like._id === user?._id) || false);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [postId, user?._id]);

    const handleLike = async () => {
        if (!user) {
            toast.error('Please login to like posts');
            return;
        }

        setLikeLoading(true);
        try {
            const response = await axios.post(`/posts/${postId}/like`);
            setPost(response.data.post);
            setIsLiked(response.data.isLiked);
            setLikeCount(response.data.post.likes.length);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error toggling like:', error);
            toast.error(error.response?.data?.error || 'Failed to like post');
        } finally {
            setLikeLoading(false);
        }
    };

    const nextImage = () => {
        const images = post?.imageLinks || post?.images?.map(img => img.url) || [];
        if (images.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        const images = post?.imageLinks || post?.images?.map(img => img.url) || [];
        if (images.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        }
    };

    const handleBack = () => {
        navigate("/blogs");
    };

    const handlePostUpdate = (updatedPost) => {
        setPost(updatedPost);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading post...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Post not found</h2>
                    <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
                    <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="mb-6 hover:bg-gray-100"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Posts
                </Button>

                <Card className="bg-white shadow-lg border-0">
                    {/* Header */}
                    <CardHeader className="space-y-6 pb-6">
                        <div className="space-y-4">
                            {/* <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                                {post?.title}
                            </h1> */}

                            {/* Author and Meta Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            <OptimizedImage
                                                src={post?.author?.profilePicture || post?.author?.profileImage?.url}
                                                alt={post?.author?.profilePicture || 'Author'}
                                                className="w-full h-full object-cover"
                                                size="thumbnail"
                                                fallback="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {post?.author?.firstname + " " + post?.author?.lastname || 'Anonymous'}
                                            </p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span>{new Date(post?.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Separator */}
                            <div className="h-px bg-gray-200"></div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        {/* Image Gallery */}
                        {(() => {
                            const images = post?.imageLinks || post?.images?.map(img => img.url) || [];
                            return images.length > 0 && (
                                <div className="relative">
                                    <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                                        <OptimizedImage
                                            src={images[currentImageIndex]}
                                            alt={`Post image ${currentImageIndex + 1}`}
                                            className="w-full h-full object-contain"
                                            size="large"
                                        />
                                    </div>

                                    {/* Image Navigation */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-105"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-105"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>

                                            {/* Image Indicators */}
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                {images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                                                            ? 'bg-white scale-110'
                                                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Image Counter */}
                                            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                                {currentImageIndex + 1} / {images.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })()}

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                                {post?.title}
                            </h1>
                            <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                                {post?.content?.split('\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('# ')) {
                                        return (
                                            <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                                                {paragraph.replace('# ', '')}
                                            </h1>
                                        );
                                    }
                                    if (paragraph.startsWith('## ')) {
                                        return (
                                            <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                                                {paragraph.replace('## ', '')}
                                            </h2>
                                        );
                                    }
                                    if (paragraph.startsWith('### ')) {
                                        return (
                                            <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                                                {paragraph.replace('### ', '')}
                                            </h3>
                                        );
                                    }
                                    if (paragraph.trim().match(/^\d+\./)) {
                                        return (
                                            <p key={index} className="mb-2 pl-4">
                                                <span className="font-semibold">{paragraph}</span>
                                            </p>
                                        );
                                    }
                                    if (paragraph.startsWith('- ')) {
                                        return (
                                            <p key={index} className="mb-2 pl-4">
                                                • {paragraph.replace('- ', '')}
                                            </p>
                                        );
                                    }
                                    return paragraph.trim() ? (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        {/* Engagement Bar */}
                        <div className="relative bg-white">
                            {/* Top Separator */}
                            <div className="h-px bg-gray-200"></div>

                            {/* Engagement Metrics - Single Row with 4 Items */}
                            <div className="flex items-center justify-center py-6 px-6">
                                <div className="flex items-center space-x-30">
                                    {/* Likes */}
                                    <div
                                        className="flex items-center space-x-2 cursor-pointer group"
                                        onClick={handleLike}
                                    >
                                        {likeLoading ? (
                                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <svg className={`w-5 h-5 text-gray-600 transition-colors duration-200 ${isLiked ? 'text-red-500 fill-current' : 'group-hover:text-red-500'
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        )}
                                        <span className="text-gray-600 text-sm font-medium">{likeCount} likes</span>
                                    </div>

                                    {/* Comments */}
                                    <div className="flex items-center space-x-2 cursor-pointer group">
                                        <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span className="text-gray-600 text-sm font-medium">{post?.comments?.length || 0} comments</span>
                                    </div>

                                    {/* Views */}
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-gray-600 text-sm font-medium">{post?.viewCount || 0} views</span>
                                    </div>

                                    {/* Share */}
                                    <div
                                        className="flex items-center space-x-2 cursor-pointer group"
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: post?.title,
                                                    url: window.location.href
                                                });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                                toast.success('Link copied to clipboard!');
                                            }
                                        }}
                                    >
                                        <svg className="w-5 h-5 text-gray-600 group-hover:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                        <span className="text-gray-600 text-sm font-medium">Share</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Separator */}
                            <div className="h-px bg-gray-200"></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Comments Section */}
                <div className="mt-8">
                    <CommentSection post={post} onPostUpdate={handlePostUpdate} />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;