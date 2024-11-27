import React from 'react'
import about from '../assets/images/about.jpg'
const About = () => {
    return (
        <>

            <div className="w-full h-auto md:h-[40vh] shadow-lg bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(112.1deg, rgba(32, 38, 57, 0.351) 11.4%, rgb(227, 162, 97, 0.9) 70.2%), url(${about})` }}>
                <div className="flex justify-center items-center pt-20">
                    <span className="text-[80px] font-semibold uppercase text-white">About</span>
                </div>
            </div>
            <div className="flex justify-center item-center h-auto md:h-[40vh] border">

                <div className="text-center md:mx-40 md:mt-14 ">
                    <span className="text-6xl font-semibold ">Our Story</span> <br />
                    <p className=" text-justify md:text-center  text-sm mx-4 mt-3">
                        The inspiration came from severe parking crunch we faced at our offices. While at the
                        same a number of people would wait at the reception to get the company cab home. A
                        number of employees were also travelling to and fro the same route or destination, but
                        were hesitant to offer rides. It was then, that the idea struck us, to develop a
                        fully automated way for employees to carpool.
                    </p>
                </div>
            </div>

            <div className="container mx-auto mb-10">

                <div className="text-center my-6">
                    <span className="font-semibold text-[20px]">Why</span>
                    <span className="text-[30px] text-yellow-600 font-semibold">Ride?</span>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">


                    <div className="flex flex-col items-center justify-center h-24 rounded shadow-xl bg-white">
                        <div className="text-center">
                            <h6 className="text-gray-400 text-sm">On Time Every Time</h6>
                            <div className="flex justify-center items-center">
                                <span className="text-[40px] font-bold text-lime-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center h-24 rounded shadow-xl bg-white">
                        <div className="text-center">
                            <h6 className="text-gray-400 text-sm">Lower and Consistent Fare</h6>
                            <div className="flex justify-center items-center">
                                <span className="text-[40px] font-bold text-lime-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center h-24 rounded shadow-xl bg-white">
                        <div className="text-center">
                            <h6 className="text-gray-400 text-sm">No Last Minute Cancellation</h6>
                            <div className="flex justify-center items-center">
                                <span className="text-[40px] font-bold text-lime-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center h-24 rounded shadow-xl bg-white">
                        <div className="text-center">
                            <h6 className="text-gray-400 text-sm">Assured AC Rides</h6>
                            <div className="flex justify-center items-center">
                                <span className="text-[40px] font-bold text-lime-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center h-24 rounded shadow-xl bg-white">
                        <div className="text-center">
                            <h6 className="text-gray-400 text-sm">Courteous Drivers</h6>
                            <div className="flex justify-center items-center">
                                <span className="text-[40px] font-bold text-lime-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center h-24 rounded shadow-xl bg-white">
                        <div className="text-center">
                            <h6 className="text-gray-400 text-sm">Save Money</h6>
                            <div className="flex justify-center items-center">
                                <span className="text-[40px] font-bold text-lime-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




        </>
    )
}

export default About