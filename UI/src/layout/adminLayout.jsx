import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import NotFoundPage from '../components/notFound';
import { logUserRole } from '../utils/getUserRole';
import { logUserName } from '../utils/getUserName';

const AdminLayout = () => {
    const [userRole, setUserRole] = useState(null); 
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndLogUserRole = async () => {
            try {
                const role = await logUserRole();
                const name = await logUserName();
                setUserRole(role);
                setUserName(name);
                console.log("User Role:", role, "User Name:", name);
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate('/error'); 
            }
        };

        fetchAndLogUserRole();
    }, [navigate]);

    if (userRole === null) {
        return <p>Loading...</p>;
    }

    return userRole === 'admin' ? (
        <>
            <AdminNavbar />
            <Outlet />
        </>
    ) : (
        <NotFoundPage />
    );
};

export default AdminLayout;
