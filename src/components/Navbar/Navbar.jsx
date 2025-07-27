import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        // For dashboard sections, trigger smooth scrolling
        if (path === '/') {
            // If we're already on the dashboard, just scroll to home
            if (window.location.pathname === '/') {
                const event = new CustomEvent('navClick', { detail: { path: '/' } });
                window.dispatchEvent(event);
            } else {
                // Navigate to dashboard first, then scroll
                navigate('/');
                setTimeout(() => {
                    const event = new CustomEvent('navClick', { detail: { path: '/' } });
                    window.dispatchEvent(event);
                }, 100);
            }
        } else if (path === '/services') {
            if (window.location.pathname === '/') {
                const event = new CustomEvent('navClick', { detail: { path: '/services' } });
                window.dispatchEvent(event);
            } else {
                navigate('/');
                setTimeout(() => {
                    const event = new CustomEvent('navClick', { detail: { path: '/services' } });
                    window.dispatchEvent(event);
                }, 100);
            }
        } else if (path === '/about') {
            if (window.location.pathname === '/') {
                const event = new CustomEvent('navClick', { detail: { path: '/about' } });
                window.dispatchEvent(event);
            } else {
                navigate('/');
                setTimeout(() => {
                    const event = new CustomEvent('navClick', { detail: { path: '/about' } });
                    window.dispatchEvent(event);
                }, 100);
            }
        } else if (path === '/contact') {
            if (window.location.pathname === '/') {
                const event = new CustomEvent('navClick', { detail: { path: '/contact' } });
                window.dispatchEvent(event);
            } else {
                navigate('/');
                setTimeout(() => {
                    const event = new CustomEvent('navClick', { detail: { path: '/contact' } });
                    window.dispatchEvent(event);
                }, 100);
            }
        } else if (path === '/blogs') {
            navigate("/blogs");
        } else if (path === '/login') {
            navigate("/login");
        } else if (path === '/register') {
            navigate("/register");
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="bg-white shadowrder-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => handleNavigation('/')}
                            className="text-2xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-200"
                        >
                            NextBlog
                        </button>
                    </div>

                    {/* Center Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <button
                            onClick={() => handleNavigation('/')}
                            className="text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => handleNavigation('/about')}
                            className="text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            About Us
                        </button>
                        
                        <button
                            onClick={() => handleNavigation('/services')}
                            className="text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Services
                        </button>

                        <button
                            onClick={() => handleNavigation('/blogs')}
                            className="text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Blogs
                        </button>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className="text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Right Side - Login registration */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleNavigation('/login')}
                            className="bg-blue-600 hovcursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>Login</span>
                        </button>

                        <button
                            onClick={() => handleNavigation('/register')}
                            className="bg-white hover:bg-cyan-400 cursor-pointer text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>Register</span>
                        </button>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
