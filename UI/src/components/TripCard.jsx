import React from 'react';

const TripCard = ({ trip, handleStatus, isActive }) => {
  const { tripId, rideId, bookedUserContact, bookUser, bookedSeats, pickupLocation, dropLocation, status, date } = trip;
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold text-gray-800">Trip ID: {tripId}</h3>
      <div className="mt-2 text-gray-600">
        <p><strong>Ride ID:</strong> {rideId}</p>
        <p><strong>Contact Number:</strong> {bookedUserContact}</p>
        <p><strong>Booked by:</strong> {bookUser}</p>
        <p><strong>Booked Seats:</strong> {bookedSeats}</p>
        <p><strong>Pickup Location:</strong> {pickupLocation}</p>
        <p><strong>Drop Location:</strong> {dropLocation}</p>
        <p><strong>Status:</strong> {status == 'dropped' ? 'Completed' : status}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>

      {isActive && (
        <div className="mt-4">
          {status === 'request' && (
            <div className="flex space-x-2">
              <button className="bg-yellow-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('accept', rideId)}>Accept</button>
              <button className="bg-red-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('cancelled', rideId)}>Cancel</button>
            </div>
          )}
          {status === 'accept' && (
            <div className="flex space-x-3 mt-2">
              <button className="bg-green-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('waiting', rideId)}>Ready To</button>
              <button className="bg-red-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('cancelled', rideId)}>Cancel</button>
            </div>
          )}
          {status === 'waiting' && (
            <div className="flex space-x-3 mt-2">
              <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('pickup', rideId)}>Pickup</button>
              <button className="bg-red-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('cancelled', rideId)}>Cancel</button>
            </div>
          )}
          {
            status === 'pickup' && (
              <div className="flex space-x-3 mt-2">
                <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={() => handleStatus('pickup', rideId)}>Add Payment</button>
              </div>
            )
          }
          {
            status === 'dropped' && (
              <div className="flex space-x-3 mt-2">
                <p className='text-green-300'> Trip Completed</p>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default TripCard;
