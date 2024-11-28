import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MakeRide = () => {
    const [startLocation, setStartLocation] = useState('');
    const [routes, setRoutes] = useState('');
    const [routeFields, setRouteFields] = useState([]);
    const [endLocation, setEndLocation] = useState('');
    const [seats, setSeats] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [time, setTime] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [distance, setDistance] = useState('');

    const navigate = useNavigate();

    const addField = () => {
        setRouteFields([...routeFields, { id: routeFields.length, value: '' }]);
    };

    const handleRouteChange = (id, value) => {
        setRouteFields((prev) =>
            prev.map((field) => (field.id === id ? { ...field, value } : field))
        );
    };

    const removeField = (id) => {
        setRouteFields((prev) => prev.filter((field) => field.id !== id));
    };

    const handleSubmit = async () => {
        const routeValues = routeFields.map((field) => field.value);

        const newData = {
            startLocation,
            routes: [routes, ...routeValues],
            endLocation,
            seats,
            dropoff,
            time,
            vehicleModel,
            registrationNumber,
            distance,
        }

        console.log(newData);
        try {
            const resp = await fetch('/api/trip/addTrip', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            })

            if (resp.ok) {
                alert('Trip Added');
                setStartLocation('');
                setRoutes('');
                setRouteFields([]);
                setEndLocation('');
                setSeats('');
                setDropoff('');
                setTime('');
                setVehicleModel('');
                setRegistrationNumber('');
                setDistance('');

                navigate('/riderUpdation')


            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
            }

        } catch (error) {
            alert(`Network error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg md:p-8">
            <div className="flex flex-col space-y-4">
                {/* Starting Location */}
                <div>
                    <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700">
                        Starting Location:
                    </label>
                    <input
                        type="text"
                        id="startLocation"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        className="w-full px-3 py-2 border capitalize rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                        placeholder="Enter starting location"
                    />
                </div>

                {/* Routes Section */}
                <div>
                    <label htmlFor="routes" className="block text-sm font-medium text-gray-700">
                        Routes To:
                    </label>
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            id="routes"
                            value={routes}
                            onChange={(e) => setRoutes(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md capitalize shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Enter route stop"
                        />
                        <button
                            type="button"
                            className="w-14 md:w-24 rounded-full text-white bg-yellow-500"
                            onClick={addField}
                        >
                            +
                        </button>
                    </div>
                    <div id="inputFields" className="mt-4 flex flex-col space-y-2">
                        {routeFields.map((field) => (
                            <div key={field.id} className="flex space-x-3">
                                <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => handleRouteChange(field.id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm capitalize focus:outline-none focus:ring focus:ring-yellow-500"
                                    placeholder="Additional route"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField(field.id)}
                                    className="px-3 py-2 text-white bg-red-500 rounded-md"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other Input Fields */}
                <div className="flex space-x-2 w-full justify-between">
                    {/* End Location */}
                    <div>
                        <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700">
                            End Location:
                        </label>
                        <input
                            type="text"
                            id="endLocation"
                            value={endLocation}
                            onChange={(e) => setEndLocation(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md capitalize shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Enter end location"
                        />
                    </div>

                    {/* Seats */}
                    <div>
                        <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
                            Available Seats:
                        </label>
                        <select
                            id="seats"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            className="bg-gray-50 border-none shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 rounded-t-lg block w-full p-2.5"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    {/* Dropoff Date */}
                    <div>
                        <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="dropoff"
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md shadow-sm capitalize focus:outline-none focus:ring focus:ring-yellow-500"
                        />
                    </div>

                    {/* Time */}
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Time:
                        </label>
                        <input
                            type="text"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md capitalize shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Eg: 10:00AM"
                        />
                    </div>
                </div>
                <div className="flex space-x-2 w-full justify-between">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Vehicle Model:
                        </label>
                        <input
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md shadow-sm capitalizefocus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Eg: Tiago"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Vehicle Registration Number:
                        </label>
                        <input
                            type="text"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md capitalize shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Eg: 1234ABC"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Distance:
                        </label>
                        <input
                            type="text"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md capitalize shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Eg: 120Km"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-block rounded bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                    >
                        Add Trip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakeRide;
