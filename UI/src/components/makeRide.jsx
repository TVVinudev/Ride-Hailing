import React, { useState } from 'react';

const MakeRide = () => {
    const [routeFields, setRouteFields] = useState([]);

    const addField = () => {
        setRouteFields([...routeFields, { id: routeFields.length }]);
    };

    return (
        <div className="p-4 bg-white rounded-lg md:p-8">
            <div className="flex flex-col space-y-4">
                <div>
                    <label
                        htmlFor="startLocation"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Starting Location:
                    </label>
                    <input
                        type="text"
                        id="startLocation"
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                        placeholder="Enter starting location"
                    />
                </div>
                <div>
                    <label
                        htmlFor="routes"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Routes To:
                    </label>
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            id="routes"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
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
                            <input
                                key={field.id}
                                type="text"
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                                placeholder="Additional route"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex space-x-2 w-full">
                    <div>
                        <label
                            htmlFor="endLocation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            End Location:
                        </label>
                        <input
                            type="text"
                            id="endLocation"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                            placeholder="Enter end location"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="seats"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Available Seats:
                        </label>
                        <select
                            id="seats"
                            className="bg-gray-50 border-none shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 rounded-t-lg block w-full p-2.5"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="dropoff"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date:
                        </label>
                        <input
                            type="date"
                            id="dropoff"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="Time"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Time:
                        </label>
                        <div className='flex'>
                            <select
                                id="seats"
                                className="bg-gray-50 border-none shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 rounded-t-lg block w-full p-2.5"
                            >
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <select
                                id="seats"
                                className="bg-gray-50 border-none shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 rounded-t-lg block w-full p-2.5"
                            >
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                            <select
                                id="seats"
                                className="bg-gray-50 px-3 border-none shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 rounded-t-lg block w-full "
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div>
                    <button
                        type="button"
                        className="inline-block rounded bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                    >
                        <a href="./pages/Rider/addTrip.html">Add Trip</a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakeRide;
