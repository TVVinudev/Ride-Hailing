import React from 'react'
import { logUserRole } from '../utils/getUserRole'
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchAndLogUserRole = async () => {
            try {
                const role = await logUserRole();
                setUserRole(role);
                console.log("User Role:", role, "User Name:", name);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchAndLogUserRole();
    }, []);

    if (!userRole) {
        return <Navigate to='/' />;
    }
    return (
            <Outlet />
    )
}

export default AdminLayout