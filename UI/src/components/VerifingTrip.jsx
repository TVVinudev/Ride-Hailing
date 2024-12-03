import React, { useEffect, useState } from 'react';

const VerifingTrip = () => {
  const [trips, setTrips] = useState([]);

  const fetchTripData = async () => {
    try {
      const resp = await fetch('/api/trip/getAll', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (resp.ok) {
        const data = await resp.json();
        setTrips(data);
      } else {
        console.log('404 error');
      }
    } catch (error) {
      console.log('500 internal error');
    }
  };

  useEffect(() => {
    fetchTripData();
  }, []);

  const handleApprovel = async (tripId) => {
    try {
      const resp = await fetch(`/api/trip/update/${tripId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (resp.ok) {
        console.log('Trip approved successfully');
        fetchTripData(); 
      } else {
        console.log('404 error');
      }
    } catch (error) {
      console.log('Error approving trip:', error);
    }
  };

  const handleCancelling = async (tripId) => {
    try {
      const resp = await fetch(`/api/trip/update/${tripId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (resp.ok) {
        console.log('Trip cancelled successfully');
        fetchTripData(); 
      } else {
        console.log('404 error');
      }
    } catch (error) {
      console.log('Error cancelling trip:', error);
    }
  };

  return (
    <div>
      <div className="py-4">
        <span className="text-md font-semibold text-gray-400">Trip Request List</span>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3 ">Trip ID</th>
              <th className="px-6 py-3 ">Rider Name</th>
              <th className="px-6 py-3 ">Starting Location</th>
              <th className="px-6 py-3 ">Ending Location</th>
              <th className="px-6 py-3 ">Trip Routes</th>
              <th className="px-6 py-3 ">Distance</th>
              <th className="px-6 py-3 ">Date</th>
              <th className="px-6 py-3 ">Time</th>
              <th className="px-6 py-3 ">Vehicle</th>
              <th className="px-6 py-3 ">Registration Number</th>
              <th className="px-6 py-3 ">Seats</th>
              <th className="px-6 py-3 ">Status</th>
              <th className="px-6 py-3 "><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {trips.length > 0 ? (
              trips.slice().reverse().map((trip, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } border-b hover:bg-gray-100 text-center transition-all duration-200`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-700">{trip.tripId}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.userName}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.startingLocation}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.endingLocation}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.tripRoutes.join(' - ')}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.distance} km</td>
                  <td className="px-6 py-4 text-gray-600">{trip.scheduledDate}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.scheduledTime}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.vehicle}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.vehicleRegistrationNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{trip.availableSeats}</td>
                  <td
                    className={`px-6 py-4 font-medium ${trip.status === 'pending'
                        ? 'text-yellow-600'
                        : trip.status === 'approved'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                  >
                    {trip.status}
                  </td>
                  {trip.status === 'pending' && (
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      <button
                        onClick={() => handleApprovel(trip.tripId)}
                        className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center space-x-1 transition-all duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleCancelling(trip.tripId)}
                        className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center space-x-1 transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center py-4 text-gray-500 text-md">
                  No data Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifingTrip;
