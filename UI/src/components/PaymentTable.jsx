import React, { useState, useEffect } from 'react';

const PaymentTable = () => {
    const [datas, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch('/api/payment/viewAll', {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (resp.ok) {
                    const result = await resp.json();
                    console.log('Fetched payments:', result);


                    setData(result || []);
                } else {
                    alert('Error fetching payment data. Check your backend.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('An error occurred while fetching payment data.');
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (rideId) => {
        console.log('Deleting ride:', rideId);
        try {
            const resp = await fetch(`/api/payment/delete/${rideId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (resp.ok) {
                alert('Payment record deleted successfully.');
                setData(datas.filter(data => data.rideId !== rideId));
            } else {
                alert('Error deleting payment record.');
            }
        } catch (error) {
            console.error('Error deleting payment:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div>
            <div className="py-4">
                <span className="text-md font-semibold text-gray-400">Payment Details</span>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 uppercase">Ride ID</th>
                            <th className="px-6 py-3 uppercase">Rider Name</th>
                            <th className="px-6 py-3 uppercase">Booked User</th>
                            <th className="px-6 py-3 uppercase">Distance</th>
                            <th className="px-6 py-3 uppercase">Pickup</th>
                            <th className="px-6 py-3 uppercase">Drop Location</th>
                            <th className="px-6 py-3 uppercase">Amount</th>
                            <th className="px-6 py-3 uppercase">Payment Status</th>
                            <th className="px-6 py-3"><span className="sr-only">Delete</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.length > 0 ? (
                            [...datas].reverse().map((data, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{data.rideId}</td>
                                    <td className="px-6 py-4">{data.riderName}</td>
                                    <td className="px-6 py-4">{data.bookUser}</td>
                                    <td className="px-6 py-4">{data.distance}</td>
                                    <td className="px-6 py-4">{data.pickupLocation}</td>
                                    <td className="px-6 py-4">{data.dropLocation}</td>
                                    <td className="px-6 py-4">{data.amount}</td>
                                    <td className="px-6 py-4">{data.paymentStatus}</td>
                                    <td className="px-6 py-4 text-right">
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
                                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                                    No payment records found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentTable;
