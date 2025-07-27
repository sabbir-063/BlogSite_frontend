import React from 'react';
import { BookOpen, Globe, Zap, Star } from 'lucide-react';

const AboutUs = () => {
    return (
        <section id="about" className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're passionate about creating a platform where knowledge meets creativity
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <BookOpen className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Knowledge Sharing</h3>
                                    <p className="text-gray-600">
                                        We believe in the power of sharing knowledge. Our platform connects
                                        writers, thinkers, and learners from around the world.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Globe className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Community</h3>
                                    <p className="text-gray-600">
                                        Join our diverse community of creators and readers. Share your
                                        stories, learn from others, and grow together.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                                    <p className="text-gray-600">
                                        We're constantly innovating to provide the best experience for
                                        our users. From modern design to powerful features.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🎯</div>
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-lg opacity-90">
                                    To empower individuals to share their knowledge, stories, and ideas
                                    with the world, creating a more connected and informed global community.
                                </p>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-pulse">
                            <Star className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs; 