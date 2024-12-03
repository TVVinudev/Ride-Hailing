import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayPayment = () => {
    const { state } = useLocation();
    const tripId = state?.tripId || 'No Trip ID available';
    const navigate = useNavigate();

    const [paymentData, setPaymentData] = useState(null);
    const [fares, setFares] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchFares = async () => {
            try {
                const response = await fetch('/api/fare/getAll', {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok){
                    const data = await response.json();
                    setFares(data[0]);
                } else {
                    throw new Error('Error fetching fare data.');
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchFares();
    }, []);

    // Fetch payment details from the server
    useEffect(() => {
        const fetchPayment = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/payment/display/${tripId}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPaymentData(data[0]);
                } else {
                    throw new Error('Failed to fetch payment data.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPayment();
    }, [tripId]);

  
    const handlePaymentUpdate = async () => {
        setLoading(true);
        try {
            await updatePaymentStatus(tripId, 'paid');
            await updateTripStatus(tripId, 'dropped');
            navigate('/', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentStatus = async (tripId, status) => {
        const response = await fetch(`/api/payment/updateStatus/${tripId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update payment status.');
        }
    };


    const updateTripStatus = async (tripId, status) => {
        const response = await fetch(`/api/tripInitial/updateStatus/${tripId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update trip status.');
        }
    };


    const calculateTotalFare = () => {
        const { amount = 0, additionalFee = 0, peekTimeFee = 0 } = fares;
        return parseFloat(paymentData?.amount || 0) + additionalFee + peekTimeFee + parseFloat(amount);
    };


    if (loading) return <p>Loading payment details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex justify-center mt-4 h-screen">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
                <Header />
                <DriverInfo riderName={paymentData?.riderName} />
                <PassengerInfo paymentData={paymentData} />
                <FareBreakdown fares={fares} totalFare={calculateTotalFare()} paymentData={paymentData} />
                <PaymentMethod />
                <PaymentButton loading={loading} handlePaymentUpdate={handlePaymentUpdate} />
            </div>
        </div>
    );
};

const Header = () => (
    <div className="text-center my-1">
        <span>
            Service Bill <span className="text-3xl font-bold text-yellow-600">Rider.</span>
        </span>
    </div>
);

const DriverInfo = ({ riderName }) => (
    <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-600">Driver Info:</h3>
        <p className="text-sm text-gray-500">Driver ID: {riderName || 'N/A'}</p>
    </div>
);

const PassengerInfo = ({ paymentData }) => (
    <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-600">Passenger Info:</h3>
        <p className="text-sm text-gray-500">User ID: {paymentData?.bookUser || 'N/A'}</p>
        <p className="text-sm text-gray-500">Pickup Location: {paymentData?.pickupLocation || 'N/A'}</p>
        <p className="text-sm text-gray-500">Drop Location: {paymentData?.dropLocation || 'N/A'}</p>
        <p className="text-sm text-gray-500">Distance: {paymentData?.distance || '0.00'} km</p>
    </div>
);

const FareBreakdown = ({ fares, totalFare }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600">Fare Breakdown:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
            <p className="text-gray-500">Base Fare:</p>
            <p className="text-right text-gray-600">₹{fares.amount || '0.00'}</p>
            <p className="text-gray-500">Additional Fees:</p>
            <p className="text-right text-gray-600">₹{fares.additionalFee || '0.00'}</p>
            <p className="text-gray-500">Peek Time Fees:</p>
            <p className="text-right text-gray-600">₹{fares.peekTimeFee || '0.00'}</p>
            <p className="text-gray-500 font-bold">Total Fare:</p>
            <p className="text-right font-bold text-gray-900">₹{totalFare.toFixed(2)}</p>
        </div>
    </div>
);

const PaymentMethod = () => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600">Payment Method:</h3>
        <p className="text-sm text-gray-500">Paid by: Credit Card</p>
        <p className="text-sm text-gray-500">Card ending in: **** 1234</p>
    </div>
);

const PaymentButton = ({ loading, handlePaymentUpdate }) => (
    <div className="text-center">
        <button
            type="button"
            onClick={handlePaymentUpdate}
            disabled={loading}
            className={`inline-block rounded bg-red-500 px-10 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
        >
            {loading ? 'Processing...' : 'Pay The Bill'}
        </button>
    </div>
);

export default DisplayPayment;
