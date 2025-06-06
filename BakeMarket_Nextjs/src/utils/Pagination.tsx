import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-1 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-md border
                    ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"}`}
            >
                ← Previous
            </button>

            <div className="hidden md:flex space-x-1">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 text-sm font-medium rounded-md border
                            ${currentPage === index + 1
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className="md:hidden text-sm text-gray-600 px-4">
                Page {currentPage} of {totalPages}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-md border
                    ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"}`}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;