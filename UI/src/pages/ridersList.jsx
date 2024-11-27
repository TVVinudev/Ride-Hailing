import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RidersList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pickup, dropoff, date, count, names, username } = location.state || {};

    console.log(pickup, dropoff, date, count, names, username);


    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const resp = await fetch(
                    `/api/trip/filter?value1=${encodeURIComponent(pickup)}&value2=${encodeURIComponent(dropoff)}&date=${encodeURIComponent(date)}&seats=${count}`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!resp.ok) {
                    throw new Error('Failed to fetch drivers');
                }

                const data = await resp.json();
                setDrivers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (pickup && dropoff && date && count) {
            fetchDriver();
        }
    }, [pickup, dropoff, date, count]);



    const handleBookRide = async (driver) => {
        const newData = {
            tripId: driver.tripId,
            riderName: driver.userName,
            bookUser: username.username,
            startingLocation: driver.startingLocation,
            endingLocation: driver.endingLocation,
            passengersName: names,
            pickupLocation: pickup,
            dropLocation: dropoff,
            date: date,
            bookedSeats: count,
        }
        console.log('Booking Data:', newData);

        confirm('Are you Confirm to Books?');
        try {
            const resp = await fetch('/api/tripInitial/addData', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            if (resp.ok) {
                alert('booking Successfully!')
                setTimeout(() => {
                    navigate('/tripUpdations');
                }, 1000);
            } else {
                alert('Server Error')
            }
        } catch (error) {
            alert(error)
        }

    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Riders List</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && drivers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drivers.map((driver, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-gray-600 mt-2">
                                    <strong>Vehicle:</strong> {driver.vehicle}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Seats Available:</strong> {driver.availableSeats}
                                </p>
                                <p className="text-gray-600">
                                    <strong>User Name:</strong> {driver.userName}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Time:</strong> {driver.scheduledTime}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Vehicle Registration:</strong> {driver.vehicleRegistrationNumber}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Routes:</strong> {driver.startingLocation} - {driver.tripRoutes.join(', ')} - {driver.endingLocation}
                                </p>
                            </div>
                            <button
                                onClick={() => handleBookRide(driver)} // Pass driver data to handler
                                className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                            >
                                Book Ride
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {drivers.length === 0 && !loading && !error && (
                <p>No drivers found for the selected routes and seats.</p>
            )}
        </div>
    );
};

export default RidersList;
