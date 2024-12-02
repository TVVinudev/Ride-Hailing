import React, { useEffect, useState } from 'react';

const RiderRequests = () => {
    const [datas, setData] = useState([]);

    const fetchData = async () => {
        try {
            const resp = await fetch('/api/rider/viewAll', {
                headers: { 'Content-Type': 'application/json' },
            });

            if (resp.ok) {
                const result = await resp.json();
                console.log("Fetched data:", result); // Debugging log
                setData(result);
            } else {
                alert('Error fetching rider requests. Check your backend.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while fetching rider requests.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAccept = async (id) => {

        const resp = await fetch(`/api/rider/verified/${id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            alert('Accept As A rider?')
        } else {
            alert('Error fetching rider requests. Check your backend.');
        }

    };

    const handleCancel = async (id) => {
        const resp = await fetch(`/api/rider/cancelled/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            alert('Cancelled?')
        } else {
            alert('Error. Check your backend.');
        }
    };

    return (
        <div>
            <div className="py-4">
                <span className="text-md font-semibold text-gray-400">Request List</span>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">User Name</th>
                            <th className="px-6 py-3">License</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3"><span className="sr-only">Accept</span></th>
                            <th className="px-6 py-3"><span className="sr-only">Cancel</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.filter(data => data.Status !== 'verified' && data.Status !== 'cancelled').length > 0 ? (
                            datas
                                .filter(data => data.Status !== 'verified' && data.Status !== 'cancelled')
                                .map((data, index) => (
                                    <tr key={data.id || index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{data.userName}</td>
                                        <td className="px-6 py-4">{data.license}</td>
                                        <td className="px-6 py-4">{data.Status || 'Pending'}</td>
                                        <td className="px-6 py-4 flex space-x-4">
                                            <button
                                                className="font-medium text-green-600 hover:underline"
                                                onClick={() => handleAccept(data.userName)}
                                                disabled={data.Status === 'verified'}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="font-medium text-red-600 hover:underline"
                                                onClick={() => handleCancel(data.userName)}
                                                disabled={data.Status === 'Cancelled'}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
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

export default RiderRequests;
