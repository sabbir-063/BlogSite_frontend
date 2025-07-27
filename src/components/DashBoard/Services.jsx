import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const Services = () => {
    const services = [
        {
            icon: '✍️',
            title: 'Content Creation',
            description: 'Create beautiful, engaging content with our intuitive editor',
            color: 'blue'
        },
        {
            icon: '🌍',
            title: 'Global Publishing',
            description: 'Reach readers worldwide with instant publishing',
            color: 'green'
        },
        {
            icon: '👥',
            title: 'Community',
            description: 'Connect with like-minded individuals and grow together',
            color: 'purple'
        },
        {
            icon: '📊',
            title: 'Analytics',
            description: 'Track your content performance with detailed insights',
            color: 'orange'
        },
        {
            icon: '📱',
            title: 'Mobile Ready',
            description: 'Access your content anywhere, anytime on any device',
            color: 'pink'
        },
        {
            icon: '🎨',
            title: 'Custom Themes',
            description: 'Personalize your blog with beautiful, customizable themes',
            color: 'indigo'
        }
    ];

    return (
        <section id="services" className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to create, share, and discover amazing content
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-4 text-4xl">{service.icon}</div>
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <Badge variant="outline" className={`border-${service.color}-200 text-${service.color}-700`}>
                                    Learn More
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services; 