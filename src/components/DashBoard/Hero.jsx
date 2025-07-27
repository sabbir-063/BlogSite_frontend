import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Users, BookOpen, Heart, Award } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
    return (
        <section id="home" className="pt-8 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <div className="mb-8">
                        <span className="inline-block animate-bounce text-4xl mb-4">🚀</span>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                            Welcome to NextBlog
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Your gateway to knowledge, creativity, and innovation. Discover amazing content, 
                            share your thoughts, and connect with like-minded individuals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                onClick={() => scrollToSection('about')}
                            >
                                Learn More
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="text-lg px-8 py-3"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in Touch
                            </Button>
                        </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
                        {[
                            { icon: Users, value: '10K+', label: 'Active Users' },
                            { icon: BookOpen, value: '500+', label: 'Articles' },
                            { icon: Heart, value: '50K+', label: 'Likes' },
                            { icon: Award, value: '100+', label: 'Awards' }
                        ].map((stat, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 