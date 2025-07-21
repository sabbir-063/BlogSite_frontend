import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MessageCircle, Bookmark, Share, Heart } from 'lucide-react';

export default function PostCard({ post, onPostClick }) {
    const handleImageClick = () => {
        console.log("Image clicked for post ID:", post._id);
        onPostClick(post._id);
    };

    const handleTitleClick = () => {
        onPostClick(post._id);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="bg-card border-border overflow-hidden">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between" >
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold leading-tight text-foreground h-[70px] hover:cursor-pointer" onClick={handleTitleClick}>
                                {post?.title.slice(0,40)}
                            </h2>
                            <Badge variant="secondary" className="w-fit text-xs">
                                {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown Date'}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    {/* Hero image */}
                    <div className="relative mx-4 mb-4 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={handleImageClick}>
                        <div className="aspect-[16/10] relative">
                            <img
                                src={post?.imageLinks[0] || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'}
                                alt="Post Images"
                                className="w-full h-[225px]  object-cover"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
                                    Read More
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Engagement metrics */}
                    <div className="px-4 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                {/* Views/Trending */}
                                {/* <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">99</span>
                                </Button> */}

                                {/* Likes */}
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-red-500">
                                    <Heart className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">124</span>
                                </Button>

                                {/* Comments */}
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-blue-500">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">18</span>
                                </Button>
                            </div>

                            <div className="flex items-center space-x-1">
                                {/* Bookmark */}
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-yellow-500">
                                    <Bookmark className="w-4 h-4" />
                                </Button>

                                {/* Share */}
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-green-500">
                                    <Share className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}