import React from 'react';
import TripCard from './TripCard';

const TripList = ({ trips, handleStatus, isActive }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? (
            trips.map((trip) => (
                <TripCard key={trip.tripId} trip={trip} handleStatus={handleStatus} isActive={isActive} />
            ))
        ) : (
            <p>No trips available.</p>
        )}
    </div>
);

export default TripList;
