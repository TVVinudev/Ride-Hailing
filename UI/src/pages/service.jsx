import React from 'react'
import about from '../assets/images/about.jpg'

const Services = () => {
    return (
        <>
            <div className="w-full h-auto md:h-[40vh] shadow-lg bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(112.1deg, rgba(32, 38, 57, 0.351) 11.4%, rgb(227, 162, 97, 0.9) 70.2%), url(${about})` }}>
                <div className="flex justify-center items-center pt-20">
                    <span className="text-[80px] font-semibold uppercase text-white">Services</span>
                </div>
            </div>

            <section className="bg-yellow-600 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">A New Way to Share Your Ride</h1>
                    <p className="mt-4 text-lg">Affordable, community-focused, and environmentally conscious transport</p>
                    <a href="#"
                        className="mt-6 inline-block bg-white text-orange-600 py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-gray-200">Get
                        Started</a>
                </div>
            </section>


            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">


                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-green-500 mb-4">

                                🚗
                            </div>
                            <h3 className="text-xl font-bold mb-2">Ride Sharing</h3>
                            <p className="text-gray-600">Share rides with drivers going your way. Join a community of responsible
                                drivers and reduce your commute costs.</p>
                        </div>


                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-yellow-500 mb-4">
                                💸
                            </div>
                            <h3 className="text-xl font-bold mb-2">Cost-Effective Travel</h3>
                            <p className="text-gray-600">Save money on every trip. Drivers earn enough to cover their expenses,
                                while riders enjoy affordable, transparent fares.</p>
                        </div>


                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-green-500 mb-4">
                                🌱
                            </div>
                            <h3 className="text-xl font-bold mb-2">Environmentally Friendly</h3>
                            <p className="text-gray-600">Reduce your carbon footprint by carpooling. Fewer cars on the road means
                                less traffic and lower emissions.</p>
                        </div>

                    </div>
                </div>
            </section>


            <section className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-yellow-500 mb-4">
                                🔍
                            </div>
                            <h3 className="text-xl font-bold mb-2">Search for a Ride</h3>
                            <p className="text-gray-600">Find a ride based on your destination and see available drivers heading
                                your way.</p>
                        </div>


                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-yellow-500 mb-4">
                                🤝
                            </div>
                            <h3 className="text-xl font-bold mb-2">Connect with a Driver</h3>
                            <p className="text-gray-600">Connect with trusted drivers from your community. View mutual connections
                                and references.</p>
                        </div>


                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-yellow-500 mb-4">
                                🚗
                            </div>
                            <h3 className="text-xl font-bold mb-2">Enjoy the Journey</h3>
                            <p className="text-gray-600">Track your ride via GPS, enjoy transparent pricing, and stay safe with
                                in-app communication and emergency features.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Join a Community of Responsible Riders and Drivers</h2>
                    <div className="mt-12 space-y-8">
                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <p className="text-gray-600">"I've met so many people in my neighborhood just by sharing rides. It's a
                                great way to save money and help the planet!"</p>
                            <p className="text-green-700 font-bold mt-4">– Jessica P.</p>
                        </div>
                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <p className="text-gray-600">"As a driver, this app allows me to offset fuel costs while helping others
                                get around. Win-win!"</p>
                            <p className="text-green-700 font-bold mt-4">– Michael S.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-yellow-500 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Your Safety is Our Priority</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-green-500 mb-4">
                                🛡️
                            </div>
                            <h3 className="text-xl font-bold mb-2">Safety Features</h3>
                            <p className="text-gray-600">All drivers undergo background checks, and every ride is tracked via GPS.
                                Build trust by connecting with drivers through mutual connections.</p>
                        </div>


                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <div className="text-4xl text-green-500 mb-4">
                                ☎️
                            </div>
                            <h3 className="text-xl font-bold mb-2">Emergency Support</h3>
                            <p className="text-gray-600">In case of emergency, the app offers in-app SOS features, 24/7 support, and
                                real-time ride tracking for safe journeys.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Start Saving and Sharing Today!</h2>
                    <div className="mt-8">
                        <a href="#" className="px-8 py-4 bg-yellow-400 text-white rounded-lg hover:bg-green-700 mx-4">Become a
                            Driver</a>
                        <a href="#" className="px-8 py-4 bg-yellow-400 text-white rounded-lg hover:bg-green-700 mx-4">Find a Ride</a>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Services