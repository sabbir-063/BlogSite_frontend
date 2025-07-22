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
    ChevronRight
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetails = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!postId) return;
        // console.log("Fetching post with ID:", postId);
        axios.get(`/posts/${postId}`)
            .then(res => {
                // console.log("Post fetched successfully:", res.data);
                setPost(res.data);
                setLikeCount(res.data.likes || 0);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [postId]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post?.title,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    const nextImage = () => {
        if (post?.imageLinks?.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === post.imageLinks.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (post?.imageLinks?.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? post.imageLinks.length - 1 : prev - 1
            );
        }
    };

    const handleBack = () => {
        navigate("/");
    }

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
                            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                                {post?.title}
                            </h1>

                            {/* Author and Meta Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            <img
                                                src={post?.author?.username || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                                                alt={post?.author?.username || 'Author'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {post?.author?.username || 'Anonymous'}
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

                                {/* Engagement Stats */}
                                {/* <div className="flex items-center space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <Heart className="w-4 h-4" />
                                        <span>{likeCount} likes</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{post?.comments || 11} comments</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        {/* Image Gallery */}

                        {post?.imageLinks && post?.imageLinks.length > 0 && (
                            <div className="relative">
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                                    <img
                                        src={post?.imageLinks[currentImageIndex]}
                                        alt={`Post image ${currentImageIndex + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Image Navigation */}
                                {post?.imageLinks.length > 1 && (
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
                                            {post?.imageLinks.map((_, index) => (
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
                                            {currentImageIndex + 1} / {post?.imageLinks.length}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}


                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
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
                        <div className="flex items-center justify-between py-6 border-y border-gray-200">
                            <div className="flex items-center space-x-6">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={handleLike}
                                    className={`hover:bg-red-50 transition-colors duration-200 ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                                    <span className="font-medium">{likeCount}</span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <MessageCircle className="w-6 h-6 mr-2" />
                                    <span className="font-medium">{post?.comments || 11}</span>
                                </Button>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={handleBookmark}
                                    className={`transition-colors duration-200 ${isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                >
                                    <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={handleShare}
                                    className="text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                                >
                                    <Share className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Tags/Categories */}
                        {/* <div className="pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="px-3 py-1 text-sm">Web Development</Badge>
                                <Badge variant="secondary" className="px-3 py-1 text-sm">React</Badge>
                                <Badge variant="secondary" className="px-3 py-1 text-sm">Node.js</Badge>
                                <Badge variant="secondary" className="px-3 py-1 text-sm">JavaScript</Badge>
                                <Badge variant="secondary" className="px-3 py-1 text-sm">Tutorial</Badge>
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PostDetails;