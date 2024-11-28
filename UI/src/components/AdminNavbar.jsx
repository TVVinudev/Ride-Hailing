import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation(); // Hook to get the current location
    const navigate = useNavigate()
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Function to check if a link is active
    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        const resp = await fetch('/api/logout', { credentials: "include" });
        if (resp.ok) {
            alert('Logged out successfully');
            navigate('/login')
        }
    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="sm:hidden p-2 mt-2 ms-3 text-gray-500 rounded-md focus:outline-none"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
            >
                <div className="py-6">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/adminDashBoard"
                                className={`flex items-center p-2 rounded-md ${isActive('/adminDashBoard') ? 'bg-yellow-500' : 'text-white hover:bg-yellow-500'}`}
                            >
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/trips"
                                className={`flex items-center p-2 rounded-md ${isActive('/trips') ? 'bg-yellow-500' : 'text-white hover:bg-yellow-500'}`}
                            >
                                <span>Trips</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className={`flex items-center p-2 rounded-md ${isActive('/users') ? 'bg-yellow-500' : 'text-white hover:bg-yellow-500'}`}
                            >
                                <span>Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/riders"
                                className={`flex items-center p-2 rounded-md ${isActive('/riders') ? 'bg-yellow-500' : 'text-white hover:bg-yellow-500'}`}
                            >
                                <span>Riders Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/payment"
                                className={`flex items-center p-2 rounded-md ${isActive('/payment') ? 'bg-yellow-500' : 'text-white hover:bg-yellow-500'}`}
                            >
                                <span>Payment</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className={`flex items-center p-2 rounded-md ${isActive('/logout') ? 'bg-yellow-500' : 'text-white hover:bg-yellow-500'}`}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Content */}
            <div className="ml-64 p-6">
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            </div>
        </div>
    );
};

export default AdminNavbar;
