import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronDown, FiFilter } from 'react-icons/fi';
import './SortFilter.css';

const SortFilter = ({ onSortChange, onFilterChange }) => {
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get current params from URL
    const urlParams = new URLSearchParams(location.search);
    const currentSort = urlParams.get('sort') || 'latest';

    const sortOptions = [
        { value: 'latest', label: 'Latest Posts' },
        { value: 'oldest', label: 'Oldest Posts' },
        { value: 'most_viewed', label: 'Most Viewed' },
        { value: 'most_liked', label: 'Most Liked' },
        { value: 'most_commented', label: 'Most Commented' }
    ];

    const handleSortChange = (sortValue) => {
        // Update URL parameters
        const params = new URLSearchParams(location.search);
        params.set('sort', sortValue);

        // If there's a page parameter, reset it to 1 when changing sort
        if (params.has('page')) {
            params.set('page', '1');
        }

        navigate(`${location.pathname}?${params.toString()}`);

        // Call the callback if provided
        if (onSortChange) {
            onSortChange(sortValue);
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="sort-filter-container">
            <div className="sort-filter-header">
                <div className="sort-dropdown">
                    <label htmlFor="sort-select">Sort by:</label>
                    <div className="select-wrapper">
                        <select
                            id="sort-select"
                            value={currentSort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="sort-select"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="select-icon" />
                    </div>
                </div>

                <button
                    className="filter-toggle-btn"
                    onClick={toggleFilters}
                    aria-expanded={showFilters}
                >
                    <FiFilter />
                    <span>Filters</span>
                    <FiChevronDown className={`toggle-icon ${showFilters ? 'rotate' : ''}`} />
                </button>
            </div>

            {showFilters && (
                <div className="filters-panel">
                    {/* We can add more filter options here in the future */}
                    <div className="filter-group">
                        <h4>Time Period</h4>
                        <div className="filter-options">
                            <button
                                className={urlParams.get('timeframe') === 'week' ? 'active' : ''}
                                onClick={() => {
                                    const params = new URLSearchParams(location.search);
                                    params.set('timeframe', 'week');
                                    params.set('page', '1');
                                    navigate(`${location.pathname}?${params.toString()}`);
                                    onFilterChange && onFilterChange({ timeframe: 'week' });
                                }}
                            >
                                Last Week
                            </button>
                            <button
                                className={urlParams.get('timeframe') === 'month' ? 'active' : ''}
                                onClick={() => {
                                    const params = new URLSearchParams(location.search);
                                    params.set('timeframe', 'month');
                                    params.set('page', '1');
                                    navigate(`${location.pathname}?${params.toString()}`);
                                    onFilterChange && onFilterChange({ timeframe: 'month' });
                                }}
                            >
                                Last Month
                            </button>
                            <button
                                className={urlParams.get('timeframe') === 'year' ? 'active' : ''}
                                onClick={() => {
                                    const params = new URLSearchParams(location.search);
                                    params.set('timeframe', 'year');
                                    params.set('page', '1');
                                    navigate(`${location.pathname}?${params.toString()}`);
                                    onFilterChange && onFilterChange({ timeframe: 'year' });
                                }}
                            >
                                Last Year
                            </button>
                            <button
                                className={!urlParams.get('timeframe') ? 'active' : ''}
                                onClick={() => {
                                    const params = new URLSearchParams(location.search);
                                    params.delete('timeframe');
                                    params.set('page', '1');
                                    navigate(`${location.pathname}?${params.toString()}`);
                                    onFilterChange && onFilterChange({ timeframe: null });
                                }}
                            >
                                All Time
                            </button>
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button
                            className="clear-filters"
                            onClick={() => {
                                // Clear all filters but keep the sort and query
                                const params = new URLSearchParams();
                                const query = urlParams.get('query');
                                const sort = urlParams.get('sort');

                                if (query) params.set('query', query);
                                if (sort) params.set('sort', sort);

                                navigate(`${location.pathname}?${params.toString()}`);
                                onFilterChange && onFilterChange({});
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortFilter;
