import React, { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axiosInstance";
import "./Home.css";
import PostCard from "../Post/PostCard";
import SearchBar from "../Search/SearchBar";
import SortFilter from "../Search/SortFilter";
import Pagination from "../Search/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 1
    });
    const navigate = useNavigate();
    const location = useLocation();

    // Parse URL parameters (memoized to avoid dependency issues)
    const getUrlParams = useCallback(() => {
        const params = new URLSearchParams(location.search);
        return {
            query: params.get('query') || '',
            sort: params.get('sort') || 'latest',
            page: parseInt(params.get('page') || '1'),
            timeframe: params.get('timeframe')
        };
    }, [location.search]);

    // Fetch posts with current filters
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const { query, sort, page, timeframe } = getUrlParams();

        try {
            // Determine which endpoint to use
            let endpoint = '/posts/all';
            let params = {
                sort,
                page,
                limit: pagination.limit
            };

            // If query exists, use search endpoint
            if (query) {
                endpoint = '/posts/search';
                params.query = query;
            }

            // Add timeframe filter if it exists
            if (timeframe) {
                const now = new Date();
                let startDate;

                switch (timeframe) {
                    case 'week':
                        startDate = new Date(now);
                        startDate.setDate(startDate.getDate() - 7);
                        params.startDate = startDate.toISOString();
                        break;
                    case 'month':
                        startDate = new Date(now);
                        startDate.setMonth(startDate.getMonth() - 1);
                        params.startDate = startDate.toISOString();
                        break;
                    case 'year':
                        startDate = new Date(now);
                        startDate.setFullYear(startDate.getFullYear() - 1);
                        params.startDate = startDate.toISOString();
                        break;
                    default:
                        // No timeframe filter
                        break;
                }
            }

            // Convert params to query string
            const queryString = new URLSearchParams(params).toString();

            const response = await axios.get(`${endpoint}?${queryString}`);

            if (response.data.posts) {
                // For search or filtered endpoint
                setPosts(response.data.posts);
                setPagination(prev => ({
                    ...prev,
                    page: response.data.pagination.page,
                    total: response.data.pagination.total,
                    pages: response.data.pagination.pages
                }));
            } else {
                // For backward compatibility with existing endpoints
                setPosts(response.data);
                setPagination(prev => ({
                    ...prev,
                    total: response.data.length,
                    pages: 1
                }));
            }
        } catch (err) {
            console.error("Failed to load posts:", err);
        } finally {
            setLoading(false);
        }
    }, [getUrlParams, pagination.limit]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // These handlers aren't actually using the parameters since the component 
    // behavior is driven by URL changes, but we keep them as props for the child components
    const handleSearch = () => {
        // URL updates handled by SearchBar component
    };

    const handleSortChange = () => {
        // URL updates handled by SortFilter component
    };

    const handleFilterChange = () => {
        // URL updates handled by SortFilter component
    };

    const handlePageChange = () => {
        // URL updates handled by Pagination component
    };

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if (loading && posts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const { query } = getUrlParams();

    return (
        <div className="mx-auto px-6 py-8 max-w-7xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
                <p className="text-gray-600">Discover amazing articles and stories</p>
            </div>

            <SearchBar
                onSearch={handleSearch}
                initialQuery={query}
            />

            <SortFilter
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
            />

            {loading ? (
                <div className="flex justify-center my-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {posts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 md:gap-4">
                                {posts.map((post) => (
                                    <PostCard key={post?._id} post={post} onPostClick={handlePostClick} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.pages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-start max-w-md">
                                <FiInfo className="mr-2 mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h3 className="font-medium mb-1">No posts found</h3>
                                    <p className="text-sm">
                                        {query
                                            ? `No posts match your search for "${query}". Try using different keywords or removing some filters.`
                                            : "No posts are available right now. Check back later for new content."}
                                    </p>
                                </div>
                            </div>
                            {query && (
                                <button
                                    className="mt-4 text-blue-600 hover:text-blue-800"
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    Clear all filters and search
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
