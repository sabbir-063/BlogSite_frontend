import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const searchTimeoutRef = useRef(null);

    // Load initial query from URL params if available
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('query');
        if (queryParam) {
            setQuery(queryParam);
        }
    }, [location.search]);

    // Handle input changes with debounce for suggestions
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.length > 2) {
            setIsLoading(true);
            // Set a new timeout to fetch suggestions
            searchTimeoutRef.current = setTimeout(() => {
                fetchSuggestions(value);
            }, 300);
        } else {
            setSuggestions([]);
            setIsLoading(false);
        }
    };

    const fetchSuggestions = async (searchQuery) => {
        try {
            const response = await axios.get(`/posts/search?query=${searchQuery}&limit=5`);
            if (response.data && response.data.posts) {
                setSuggestions(response.data.posts.map(post => ({
                    id: post._id,
                    title: post.title
                })));
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);

            // Update URL with search query
            const params = new URLSearchParams(location.search);
            params.set('query', query);
            navigate(`${location.pathname}?${params.toString()}`);

            // Close suggestions
            setSuggestions([]);
        }
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        searchInputRef.current.focus();

        // Remove query from URL and trigger search with empty query
        const params = new URLSearchParams(location.search);
        params.delete('query');
        navigate(`${location.pathname}?${params.toString()}`);
        onSearch('');
    };

    const handleSuggestionClick = (suggestion) => {
        // Navigate to the post detail page
        navigate(`/posts/${suggestion.id}`);
        setSuggestions([]);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className={`search-form ${isFocused ? 'focused' : ''}`}>
                <div className="search-input-container">
                    <FiSearch className="search-icon" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder="Search posts..."
                        className="search-input"
                    />
                    {query && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            <FiX />
                        </button>
                    )}
                </div>
                <button type="submit" className="search-button" aria-label="Search">
                    Search
                </button>
            </form>

            {isFocused && suggestions.length > 0 && (
                <div className="search-suggestions">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <FiSearch className="suggestion-icon" />
                            <span>{suggestion.title}</span>
                        </div>
                    ))}
                </div>
            )}

            {isLoading && query.length > 2 && (
                <div className="search-suggestions">
                    <div className="suggestion-loading">
                        <div className="loading-spinner"></div>
                        <span>Searching...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
