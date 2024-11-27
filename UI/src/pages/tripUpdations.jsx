import React, { useState, useEffect } from 'react';
import { logUserName } from '../utils/getUserName';

const TripUpdations = () => {
    const [userName, setUserName] = useState('');
    const [tripData, setTripData] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'ended'

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await logUserName();
                setUserName(name);
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };
        fetchUserName();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!userName) return;
            try {
                const resp = await fetch(`/api/tripInitial/getUserData/${userName}`, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (resp.ok) {
                    const data = await resp.json();
                    setTripData(data);
                } else {
                    console.error("Failed to fetch trip data");
                }
            } catch (error) {
                console.error("Error fetching trip data:", error);
            }
        };
        fetchData();
    }, [userName]);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'request':
                return 'bg-yellow-200 text-yellow-800 mt-2';
            case 'accept':
            case 'ongoing':
                return 'bg-green-200 text-green-800 mt-2';
            case 'cancelled':
                return 'bg-red-200 text-red-800 mt-2';
            case 'pickup':
                return 'bg-blue-200 text-blue-800 mt-2';
            case 'dropped':
                return 'bg-gray-300 text-gray-800 mt-2';
            case 'waiting':
                return 'bg-orange-200 text-orange-800 mt-2';
            default:
                return 'bg-gray-200 text-gray-800 mt-2';
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const upcomingTrips = tripData.filter(trip => trip.date >= today && trip.status.toLowerCase() !== 'dropped');
    const endedTrips = tripData.filter(trip => trip.date < today || trip.status.toLowerCase() === 'dropped');

    const renderTrips = (trips) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length > 0 ? (
                trips.map((element, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600"><strong>Trip ID:</strong> {element.tripId}</p>
                            <p className="text-sm text-gray-600"><strong>Date:</strong> {element.date}</p>
                            <p className="text-sm text-gray-600"><strong>Rider Name:</strong> {element.riderName}</p>
                            <p className="text-sm text-gray-600"><strong>Booked Seats:</strong> {element.bookedSeats}</p>
                            <p className="text-sm text-gray-600"><strong>Pickup Location:</strong> {element.pickupLocation}</p>
                            <p className="text-sm text-gray-600"><strong>Drop Location:</strong> {element.dropLocation}</p>
                            <p className={`text-sm font-semibold py-1 px-2 rounded-lg inline-block ${getStatusClass(element.status)}`}>
                                {element.status}
                            </p>
                        </div>
                        {activeTab === 'ended' ? (
                            <></> // No action for ended trips
                        ) : (
                            element.status === 'request' ? (
                                <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                                    Cancel Ride
                                </button>
                            ) : (element.status === 'accept' ?
                                <p>Waiting for the Call from the Rider...</p> : (element.status === 'pickup' ? 
                                <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"  >
                                    Payment
                                </button> : '')
                            )
                        )}
                    </div>
                ))
            ) : (
                <p>No trips available.</p>
            )}
        </div>
    );

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Trip Updations</h1>

            {/* Tab Buttons */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`py-2 px-4 rounded-lg transition ${activeTab === 'upcoming' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                >
                    Upcoming Rides
                </button>
                <button
                    onClick={() => setActiveTab('ended')}
                    className={`py-2 px-4 rounded-lg transition ${activeTab === 'ended' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                >
                    Ended Rides
                </button>
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === 'upcoming' ? renderTrips(upcomingTrips) : renderTrips(endedTrips)}
        </div>
    );
};

export default TripUpdations;
