import React, { useEffect, useState } from 'react'
import RideBooking from '../components/rideBooking'
import bannerimage from '../assets/images/10173277_8493.svg'
import { Link } from 'react-router-dom'
import { logUserName } from '../utils/getUserName'
import { logUserRole } from '../utils/getUserRole'




const Home = () => {
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');

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
            }
        };

        fetchAndLogUserRole();
    }, []);

    console.log("User Role:", userRole, "User Name:", userName);
    return (
        <>
            {userName ? <RideBooking /> :
                <div className='w-full h-72 mt-10 text-center bg-yellow-600'>
                    <div className=' font-bold pt-14 text-white'>
                        Please login for the services!
                        <div className='text-center text-md mt-10'>
                            <Link to={'/login'} className='bg-white py-2 px-7 rounded-sm text-black'>Login </Link></div>
                    </div>


                </div>

            }
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:ml-72 md:mt-40  mt-4">
                    <span className=" text-3xl font-semibold ">Drive when you want, </span>
                    <span className=" text-3xl font-semibold ">Make what you need </span>
                    <p className="text-justify mt-6 mx-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ad temporibus a nulla sed autem
                        eveniet quae, explicabo velit sequi hic! Blanditiis explicabo ea accusamus rem praesentium corrupti
                        esse amet!
                    </p>
                    <div className="ml-3  md:mt-4 md:ml-6">
                        <button type="button"
                            className="inline-block rounded bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            Explore
                        </button>
                    </div>
                </div>
                <div className="my-4 mx-14 ">
                    <img src={bannerimage} alt="" />
                </div>
            </div>

        </>
    )
}

export default Home