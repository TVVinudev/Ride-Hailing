import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
            <p className="text-gray-500 mb-8">
                Oops! The page you are looking for does not exist or has been moved.
            </p>
            <button
                onClick={handleGoHome}
                className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotFoundPage;
