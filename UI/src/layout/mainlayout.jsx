import React from 'react'
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer'


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            {/* <main>{children}</main> */}
        </>
    )
}

export default MainLayout