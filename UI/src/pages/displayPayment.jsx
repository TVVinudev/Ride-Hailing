import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayPayment = () => {
    const { state } = useLocation(); // Destructure 'state' directly
    const tripId = state?.tripId || 'No Trip ID available'; // Default fallback if no tripId
    const [paymentData, setPayment] = useState(null); // Initialize with null
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const findPayment = async () => {
            try {
                const resp = await fetch(`/api/payment/display/${tripId}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (resp.ok) {
                    const data = await resp.json();
                    setPayment(data[0]);
                } else {
                    setError('Failed to fetch payment data.');
                    console.error('Failed to fetch payment data');
                }
            } catch (error) {
                setError('Error fetching payment data.');
                console.error('Error fetching payment data:', error);
            }
        };

        findPayment();
    }, [tripId]);

    const handlePaymentUpdation = async () => {
        try {
            const resp = await fetch(`/api/payment/updateStatus/${tripId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'paid' }) // Pass as an object
            });

            if (resp.ok) {
                console.log('Payment status updated successfully.');

                // Update trip status to 'dropped'
                const response = await fetch(`/api/tripInitial/updateStatus/${tripId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'dropped' }),
                });
                if (response.ok) {
                    console.log("Trip status updated to dropped.");
                    navigate('/'); // Navigate to home after updates
                } else {
                    console.error("Failed to update trip status.");
                }
            } else {
                setError('Failed to update payment status.');
                console.error('Failed to update payment status:', await resp.text());
            }
        } catch (error) {
            setError('Error updating payment status.');
            console.error('Error updating payment status:', error);
        }
    };

    if (!paymentData) {
        return <p>Loading payment details...</p>;
    }

    // Safely parse and compute totalPayment
    const totalPayment = (parseFloat(paymentData.amount) || 0) + 16; // 16 is the additional fee

    return (
        <div className="flex justify-center mt-4 h-screen">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
                <div className="text-center my-1">
                    <span>
                        Service Bill <span className="text-3xl font-bold text-yellow-600">Rider.</span>
                    </span>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-600">Driver Info:</h3>
                    <p className="text-sm text-gray-500">Driver ID: {paymentData.riderName}</p>
                    <p className="text-sm text-gray-500"></p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-600">Passenger INFO:</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">User ID: {paymentData.bookUser}</p>
                            <p className="text-sm text-gray-500">Pickup Location: {paymentData.pickupLocation}</p>
                            <p className="text-sm text-gray-500">Drop Location: {paymentData.dropLocation}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Time: 18:30</p>
                            <p className="text-sm text-gray-500">Duration: 25 mins</p>
                            <p className="text-sm text-gray-500">Passengers count: 2</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-600">Fare Breakdown:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p className="text-gray-500">Base Fare:</p>
                        <p className="text-right text-gray-600">${paymentData.amount}</p>
                        <p className="text-gray-500">Distance Fare (per km):</p>
                        <p className="text-right text-gray-600">$10.00</p>
                        <p className="text-gray-500">Time Fare (per minute):</p>
                        <p className="text-right text-gray-600">$5.00</p>
                        <p className="text-gray-500">Additional Fees:</p>
                        <p className="text-right text-gray-600">$1.00</p>
                        <p className="text-gray-600 font-bold">Total Fare:</p>
                        <p className="text-right font-bold text-gray-900">${totalPayment.toFixed(2)}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-600">Payment Method:</h3>
                    <p className="text-sm text-gray-500">Paid by: Credit Card</p>
                    <p className="text-sm text-gray-500">Card ending in: **** 1234</p>
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handlePaymentUpdation}
                        className="inline-block rounded bg-red-500 px-10 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    >
                        Pay The Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisplayPayment;
