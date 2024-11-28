import React, { useEffect, useState } from 'react';
import Tabs from '../components/tabs';
import TripList from '../components/TripList';
import { logUserName } from '../utils/getUserName';
import { useNavigate } from 'react-router-dom';

const RiderUpdation = () => {
  const [userName, setUserName] = useState('');
  const [trips, setTripData] = useState([]);
  const [activeTab, setActiveTab] = useState('updation');
  const [loading, setLoading] = useState(false);  // Loading state for trips
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await logUserName();
        setUserName(name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!userName) return;  // Prevent fetching if no userName

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/tripInitial/getRiderData/${userName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }
        const data = await response.json();
        setTripData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [userName]);

  const handleStatus = async (newStatus, rideId) => {
    try {
      const response = await fetch(`/api/tripInitial/updateStatus/${rideId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setTripData(prevTrips =>
        prevTrips.map(trip => (trip.rideId === rideId ? { ...trip, status: newStatus } : trip))
      );

      if (newStatus === 'pickup') {
        navigate('/addPayment', { state: { rideId } });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const activeTrips = trips.filter(trip => !['dropped', 'cancelled'].includes(trip.status.toLowerCase()));
  const completedTrips = trips.filter(trip => ['dropped', 'cancelled'].includes(trip.status.toLowerCase()));

  return (
    <div className="p-6 max-w-full bg-gray-100 h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Ride Details</h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {loading && <p>Loading trips...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {activeTab === 'updation' ? (
          <TripList trips={activeTrips} handleStatus={handleStatus} isActive={true} />
        ) : (
          <TripList trips={completedTrips} handleStatus={handleStatus} isActive={false} />
        )}
      </div>
    </div>
  );
};

export default RiderUpdation;
