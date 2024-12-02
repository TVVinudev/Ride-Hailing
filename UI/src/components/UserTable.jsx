import React, { useEffect, useState } from 'react';

const UsersTable = ({ dashboard }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch('/api/viewAllUsers', {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (resp.ok) {
                    const data = await resp.json();
                    const sortedUsers = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    // Conditional logic based on dashboard prop
                    if (dashboard === true) {
                        setUsers(sortedUsers.slice(0, 3)); // Show only the latest 3 users for the dashboard
                    } else {
                        setUsers(sortedUsers); // Show all users
                    }
                } else {
                    alert('Error fetching users. Check your backend.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('An error occurred while fetching users.');
            }
        };

        fetchData();
    }, [dashboard]); // Dependency array includes `dashboard` to re-fetch if it changes

    const handleDeleteUser = async (userName) => {
        try {
            const resp = await fetch(`/api/deleteUser/${userName}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (resp.ok) {
                alert('User deleted successfully.');
                setUsers(users.filter(user => user.userName !== userName));
            } else {
                alert('Error deleting user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div>
            <div className="py-4">
                <span className="text-xl font-semibold text-gray-400">
                    
                   {dashboard===true?'Latest Users':'User Details'} 
                    
                    </span>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">First Name</th>
                            <th className="px-6 py-3">Last Name</th>
                            <th className="px-6 py-3">User Name</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3"><span className="sr-only">Delete</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.firstName}</td>
                                    <td className="px-6 py-4">{user.lastName}</td>
                                    <td className="px-6 py-4">{user.role === 'admin' ? "*****" : user.userName}</td>
                                    <td className="px-6 py-4">{user.contact}</td>
                                    <td className="px-6 py-4">{user.role === 'admin' ? "*****" : user.email}</td>
                                    <td className="px-6 py-4">{user.role === 'admin' ? <p className='text-green-400'>ADMIN</p> : user.role}</td>
                                    <td className="px-6 py-4 text-right">
                                        {user.role !== 'admin' && (
                                            <button 
                                                className="font-medium text-red-600 hover:underline" 
                                                onClick={() => handleDeleteUser(user.userName)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
