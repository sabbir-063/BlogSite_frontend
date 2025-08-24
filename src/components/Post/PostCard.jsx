import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MessageCircle, Bookmark, Share, Heart, Eye } from 'lucide-react';
import { Calendar, User } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';

export default function PostCard({ post, onPostClick }) {
    const handleImageClick = () => {
        // console.log("Image clicked for post ID:", post._id);
        // console.log(post);
        onPostClick(post._id);
    };

    const handleTitleClick = () => {
        onPostClick(post._id);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="bg-card border-border overflow-hidden">
                <CardHeader className="pb-3">
                    <div className="space-y-2">
                        <CardTitle className="text-lg font-semibold line-clamp-2 h-12 hover:cursor-pointer" onClick={handleTitleClick}>
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

                <CardContent className="p-0">
                    {/* Hero image */}
                    <div className="relative mx-4 mb-4 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={handleImageClick}>
                        <div className="aspect-[16/10] relative">
                            <OptimizedImage
                                src={post?.imageLinks[0] || post?.images?.[0]?.url}
                                alt="Post Images"
                                className="w-full h-[225px] z-10 object-cover"
                                size="medium"
                                fallback="https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                            />
                            <div className="absolute top-2 right-2">
                                <Badge variant="secondary" className="bg-black bg-opacity-50 text-gray-900">
                                    {post?.imageLinks?.length || post?.images?.length || 0} images
                                </Badge>
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute z-0 inset-0 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
                                    Read More
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Engagement metrics */}
                    <div className="px-4 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-evenly w-full">
                                {/* Views */}
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                                    <Eye className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">{post?.viewCount || 0}</span>
                                </Button>

                                {/* Likes */}
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-red-500">
                                    <Heart className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">{post?.likes?.length || 0}</span>
                                </Button>

                                {/* Comments */}
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-blue-500">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">{post?.comments?.length || 0}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}