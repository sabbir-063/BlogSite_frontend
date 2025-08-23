import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar2 = ({ user }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/login");
    };

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
        } else if (path === '/create-post') {
            navigate("/create-post");
        } else if (path === '/profile') {
            navigate("/profile");
        } else if (path === '/my-posts') {
            navigate("/my-posts");
        } else {
            navigate("/");
        }
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
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

                    {/* Right Side - Create Post and User Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Create Post Button */}
                        <button
                            onClick={() => handleNavigation('/create-post')}
                            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Create Post</span>
                        </button>

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-200"
                            >
                                {/* Profile Picture */}
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {user?.profilePicture ? (
                                        <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-xs">{user?.username?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>

                                {/* Username - Hidden on small screens */}
                                <span className="hidden sm:block text-sm font-medium">{user?.username}</span>

                                {/* Dropdown Arrow */}
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {/* User Info Header */}
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                                        <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <button
                                        onClick={() => {
                                            handleNavigation('/profile');
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleNavigation('/my-posts');
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                        My Posts
                                    </button>

                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        {/* <div className="md:hidden">
                            <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar2;
