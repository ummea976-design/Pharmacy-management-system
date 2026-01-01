import React from 'react';

const Pagination = () => {
    return (
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-center">
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <a className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 cursor-pointer">
                    <span className="text-sm font-medium px-2">Previous</span>
                </a>
                <a aria-current="page" className="relative z-10 inline-flex items-center bg-blue-50 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-inset ring-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:ring-blue-800 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer">1</a>
                <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 cursor-pointer">2</a>
                <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 cursor-pointer">
                    <span className="text-sm font-medium px-2">Next</span>
                </a>
            </nav>
        </div>
    );
};

export default Pagination;
