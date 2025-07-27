import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <div className="text-2xl font-bold mb-4">NextBlog</div>
                <p className="text-gray-400 mb-6">
                    Empowering creators, connecting communities, sharing knowledge
                </p>
                <div className="flex justify-center space-x-6 mb-6">
                    <button className="text-gray-400 hover:text-white transition-colors">Privacy</button>
                    <button className="text-gray-400 hover:text-white transition-colors">Terms</button>
                    <button className="text-gray-400 hover:text-white transition-colors">Support</button>
                </div>
                <div className="text-gray-500 text-sm">
                    © 2024 NextBlog. Made with ❤️ for the community
                </div>
            </div>
        </footer>
    );
};

export default Footer;