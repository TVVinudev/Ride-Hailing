import React from 'react';
import DashboardCards from '../components/DashboardCards';
import UsersTable from '../components/UserTable';

const Dashboard = () => {

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-none rounded-lg">
                <DashboardCards />
                <UsersTable />
            </div>
        </div>
    );
};

export default Dashboard;
