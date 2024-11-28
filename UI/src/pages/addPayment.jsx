import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rideId = location.state?.rideId || 'empty'; // Default value if rideId is missing

    console.log(rideId);

    const [distance, setDistance] = useState('');
    const [amount, setAmount] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (rideId === 'empty') {
            setError('Invalid ride ID');
            setLoading(false);
            return;
        }

        const getData = async () => {
            try {
                const resp = await fetch(`/api/tripInitial/getByRideID/${rideId}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (resp.ok) {
                    const data = await resp.json();
                    console.log(data);
                    setData(data);
                } else {
                    setError('Failed to fetch trip data');
                }
            } catch (error) {
                setError('Error fetching trip data');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [rideId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentData = {
            rideId: rideId,
            pickupLocation: data.pickupLocation,
            dropLocation: data.dropLocation,
            distance,
            amount,
        };

        try {
            const resp = await fetch('/api/payment/addData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData),
            });

            if (resp.ok) {

                alert('Payment Requested successfully');
                navigate('/riderUpdation');
            } else {
                setError('Already Requested');
            }
        } catch (error) {
            setError('Error submitting payment data');
        }

        console.log('Submitting payment data:', paymentData);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen">
            <div className="max-w-lg my-10 mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Add Payment</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                            Distance (km)
                        </label>
                        <input
                            type="number"
                            name="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            required
                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPayment;
