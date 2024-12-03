import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingRide = (username) => {
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [count, setCount] = useState(1);
    const [names, setNames] = useState([{ id: Date.now(), name: '' }]);
    const [date, setDate] = useState('');

    const navigate = useNavigate()

    const handleNameChange = (id, value) => {
        setNames((prevNames) =>
            prevNames.map((nameField) =>
                nameField.id === id ? { ...nameField, name: value } : nameField
            )
        );
    };


    const addField = () => {
        setNames((prevNames) => [...prevNames, { id: Date.now(), name: '' }]);
    };


    const handleBooking = async (e) => {
        e.preventDefault();

        if (!pickup || !dropoff || !date || names.some((n) => !n.name.trim())) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = {
            pickup,
            dropoff,
            count: Number(count),
            names: names.map((n) => n.name.trim()),
            date,
            username
        };

        try {
            const resp = await fetch('/api/passenger/addDetails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (resp.ok) {
                navigate('/ridersList/', { state: formData })

                setPickup('');
                setDropoff('');
                setCount(1);
                setNames([{ id: Date.now(), name: '' }]);
                setDate('');
            } else {
                alert('Failed to book the ride.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <div className="p-4 bg-white rounded-lg md:p-8">
            <form onSubmit={handleBooking} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
                        Pick-up Location:
                    </label>
                    <input
                        type="text"
                        id="pickup"
                        className="w-full px-3 py-2 border capitalize rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                        placeholder="Enter pick-up address"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 space-x-3">
                    <div>
                        <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">
                            Drop-off Location:
                        </label>
                        <input
                            type="text"
                            id="dropoff"
                            className="w-full px-3 py-2 border capitalize rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Enter drop-off address"
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                            No. of Passengers
                        </label>
                        <select
                            id="passengers"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 space-x-3">
                    <div>
                        <label htmlFor="routes" className="block text-sm font-medium text-gray-700">
                            Passengers Name:
                        </label>
                        <div className="flex space-x-3">
                            <input
                                type="text"
                                placeholder="Passenger name"
                                className="w-full px-3 py-2 border capitalize rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                                value={names[0]?.name || ''}
                                onChange={(e) => handleNameChange(names[0]?.id, e.target.value)}
                            />
                            <button
                                type="button"
                                className="w-14 md:w-24 rounded-full text-white bg-yellow-500"
                                onClick={addField}
                            >
                                +
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col space-y-2">
                            {names.slice(1).map((field) => (
                                <input
                                    key={field.id}
                                    type="text"
                                    className="w-full px-3 py-2 border capitalize rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                                    placeholder="Additional passenger name"
                                    value={field.name}
                                    onChange={(e) => handleNameChange(field.id, e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded uppercase"
                >
                    Search Cabs
                </button>
            </form>
        </div>
    );
};

export default BookingRide;
