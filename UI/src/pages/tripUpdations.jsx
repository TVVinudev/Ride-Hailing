import React, { useState, useEffect } from 'react';
import { logUserName } from '../utils/getUserName';
import { useNavigate } from 'react-router-dom';

const TripUpdations = () => {
    const [userName, setUserName] = useState('');
    const [tripData, setTripData] = useState([]);
    const [activeTab, setActiveTab] = useState('booked');
    const navigate = useNavigate();

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
            case 'request': return 'bg-yellow-200 text-yellow-800 mt-2';
            case 'accept': return 'bg-white text-yellow-300 mt-2';
            case 'ongoing': return 'bg-green-200 text-green-800 mt-2';
            case 'cancelled': return 'bg-red-200 text-red-800 mt-2';
            case 'pickup': return 'bg-blue-200 text-blue-800 mt-2';
            case 'dropped': return 'bg-green-300 text-white mt-2';
            case 'waiting': return 'bg-orange-200 text-orange-800 mt-2';
            default: return 'bg-gray-200 text-gray-800 mt-2';
        }
    };

    const today = new Date().toISOString().split('T')[0];

    const bookedTrips = tripData.filter(trip => trip.date >= today && trip.status.toLowerCase() !== 'dropped' && trip.status.toLowerCase() !== 'cancelled');
    const completedTrips = tripData.filter(trip => trip.date < today || trip.status.toLowerCase() === 'dropped' || trip.status.toLowerCase() === 'cancelled');

    const handlePaymentNavigation = (tripId) => {
        navigate('/displayPayment', { state: { tripId } });
    };

    const handleCancelling = async (tripId, status) => {
        try {
            const response = await fetch(`/api/tripInitial/updateStatus/${tripId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                alert(`Trip status successfully updated to '${status}'.`);
                setTripData(tripData.map(trip => trip.rideId === tripId ? { ...trip, status } : trip));
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to update trip status.'}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An unexpected error occurred while updating the trip status.');
        }
    };

    const renderTrips = (trips) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length > 0 ? (
                trips.map((element, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600"><strong>Trip ID:</strong> {element.rideId}</p>
                            <p className="text-sm text-gray-600"><strong>Date:</strong> {element.date}</p>
                            <p className="text-sm text-gray-600"><strong>Rider Name:</strong> {element.riderName}</p>
                            <p className="text-sm text-gray-600"><strong>Booked Seats:</strong> {element.bookedSeats}</p>
                            <p className="text-sm text-gray-600"><strong>Pickup Location:</strong> {element.pickupLocation}</p>
                            <p className="text-sm text-gray-600"><strong>Drop Location:</strong> {element.dropLocation}</p>
                            <p className={`text-sm font-semibold py-1 px-2 rounded-lg inline-block ${getStatusClass(element.status)}`}>
                                {element.status === 'dropped' ? 'completed' : element.status}
                            </p>
                        </div>
                        {activeTab === 'booked' && (
                            <>
                                {element.status === 'request' && (
                                    <button
                                        onClick={() => handleCancelling(element.rideId, 'cancelled')}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                                        Cancel Ride
                                    </button>
                                )}
                                {element.status === 'accept' && (
                                    <p className="text-gray-600">Waiting for the call from the rider...</p>
                                )}
                                {element.status === 'pickup' && (
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                                        onClick={() => handlePaymentNavigation(element.rideId)}
                                    >
                                        Payment
                                    </button>
                                )}
                            </>
                        )}
                        {activeTab === 'completed' && (
                            <p className="text-gray-600 italic">Trip is {element.status === 'dropped' ? 'completed' : element.status}.</p>
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

           
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('booked')}
                    className={`py-2 px-4 rounded-lg transition ${activeTab === 'booked' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                >
                    Booked Rides
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`py-2 px-4 rounded-lg transition ${activeTab === 'completed' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                >
                    Completed Rides
                </button>
            </div>

           
            {activeTab === 'booked' ? renderTrips(bookedTrips) : renderTrips(completedTrips)}
        </div>
    );
};

export default TripUpdations;
