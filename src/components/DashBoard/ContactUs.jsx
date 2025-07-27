import React from 'react';
import { Button } from '../ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const ContactUs = () => {
    return (
        <section id="contact" className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to start your journey? Let's connect and create something amazing together
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">hello@nextblog.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Phone className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                                    <p className="text-gray-600">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {[
                                    { icon: Github, href: '#', label: 'GitHub' },
                                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                    { icon: Twitter, href: '#', label: 'Twitter' }
                                ].map((social, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="icon"
                                        className="w-10 h-10"
                                        onClick={() => window.open(social.href, '_blank')}
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                        <div className="text-center">
                            <div className="text-6xl mb-4">💬</div>
                            <h3 className="text-2xl font-bold mb-4">Let's Start a Conversation</h3>
                            <p className="text-lg opacity-90 mb-6">
                                Whether you have a question, want to collaborate, or just want to say hello,
                                we'd love to hear from you!
                            </p>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-gray-100"
                            >
                                Send Message
                                <Mail className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs; 