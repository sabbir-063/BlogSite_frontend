import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
        const params = new URLSearchParams(location.search);
        params.set('page', page.toString());
        navigate(`${location.pathname}?${params.toString()}`);

        if (onPageChange) {
            onPageChange(page);
        }

        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Determine which page buttons to show
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are 5 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate start and end of middle range
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust to always show 3 pages in the middle
            if (start === 2) end = Math.min(4, totalPages - 1);
            if (end === totalPages - 1) start = Math.max(2, totalPages - 3);

            // Add ellipsis after first page if needed
            if (start > 2) {
                pageNumbers.push('...');
            }

            // Add middle range
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (end < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            <button
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <FiChevronLeft />
            </button>

            <div className="pagination-numbers">
                {pageNumbers.map((pageNumber, idx) => (
                    <React.Fragment key={idx}>
                        {pageNumber === '...' ? (
                            <span className="pagination-ellipsis">...</span>
                        ) : (
                            <button
                                className={`pagination-number ${pageNumber === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}
                                aria-current={pageNumber === currentPage ? 'page' : undefined}
                            >
                                {pageNumber}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <button
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <FiChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
