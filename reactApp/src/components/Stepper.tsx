// Steps/Stepper.js

import { useRouterState } from '@tanstack/react-router'

export const Stepper = ({ step }) => {
    const location = useRouterState({
        select: (state) => state.location,
    });

    const getLinkClass = (path) => {
        return (
            "nav-link " + (path === location.pathname ? "" : "")
        );
    };

    const isActive = (path) => {
        return path === location.pathname
    };

    return (

        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-4 sm:space-x-4">
            <li className="flex md:w-full items-center text-gray-500">
                <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ${step >= 1 ? "text-blue-600" : ""}`}>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    Tribute Details</span>
            </li>
            <li className="flex md:w-full items-center text-gray-500">
                <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ${step >= 2 ? "text-blue-600" : ""}`}>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    Education</span>
            </li>
            <li className="flex md:w-full items-center text-gray-500">
                <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ${step >= 3 ? "text-blue-600" : ""}`}>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    Payment</span>
            </li>
        </ol>

    );
};