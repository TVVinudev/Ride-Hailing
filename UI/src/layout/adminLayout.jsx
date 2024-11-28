import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/footer';

const AdminLayout = () => {


    return (
        <>
            <AdminNavbar />
            <Outlet />
        </>

    )
}

export default AdminLayout