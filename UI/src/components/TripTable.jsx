import React, { useEffect, useState } from 'react';

const TripTable = () => {
    const [datas, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch('/api/tripInitial/viewAll', {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (resp.ok) {
                    const result = await resp.json();
                    setData(result.data); // Ensure result.data is an array of objects
                } else {
                    alert('Error fetching trip data. Check your backend.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('An error occurred while fetching trips.');
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (rideId) => {
        try {
            const resp = await fetch(`/api/tripInitial/deleteUser/${rideId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (resp.ok) {
                alert('Trip deleted successfully.');
                setData(datas.filter(data => data.rideId !== rideId));
            } else {
                alert('Error deleting trip.');
            }
        } catch (error) {
            console.error('Error deleting trip:', error);
            alert('An error occurred.');
        }
    };


    return (
        <div>
            <div className="py-4">
                <span className="text-md font-semibold text-gray-400">Trip List</span>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Trip ID</th>
                            <th className="px-6 py-3">Ride ID</th>
                            <th className="px-6 py-3">Rider Name</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Pickup</th>
                            <th className="px-6 py-3">Drop Location</th>
                            <th className="px-6 py-3">Passengers</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Booked Seats</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3"><span className="sr-only">Cancel</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.length > 0 ? (
                            datas.map((data, index) => (
                                <tr key={data.tripId || index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{data.tripId}</td>
                                    <td className="px-6 py-4">{data.rideId}</td>
                                    <td className="px-6 py-4">{data.riderName }</td>
                                    <td className="px-6 py-4">{data.bookedUserContact }</td>
                                    <td className="px-6 py-4">{data.pickupLocation }</td>
                                    <td className="px-6 py-4">{data.dropLocation }</td>
                                    <td className="px-6 py-4">{data.passengersName }</td>
                                    <td className="px-6 py-4">{data.date }</td>
                                    <td className="px-6 py-4">{data.bookedSeats }</td>
                                    <td className="px-6 py-4">{data.status}</td>
                                    <td className="px-6 py-4 flex space-x-4">
                                        <button
                                            className="font-medium text-red-600 hover:underline"
                                            onClick={() => handleDelete(data.rideId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                                    No pending requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripTable;
