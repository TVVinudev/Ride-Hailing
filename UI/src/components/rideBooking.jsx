import React, { useEffect, useState } from "react";
import { logUserRole } from "../utils/getUserRole";
import { logUserName } from "../utils/getUserName";
import VerifyLicense from "./verifyLicense";
import MakeRide from "./makeRide";
import BookingRide from "./bookingRide";

const RideBooking = () => {
    const [activeTab, setActiveTab] = useState("needRide");
    const [routeFields, setRouteFields] = useState([]);

    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const fetchAndLogUserRole = async () => {
            try {
                const role = await logUserRole();
                const name = await logUserName();
                setUserRole(role || ''); // Set fallback values
                setUserName(name || ''); // Set fallback values
                console.log("User Role:", userRole, "User Name:", userName);

                setIsLoading(false);

            } catch (error) {
                setIsLoading(true); // Reset loading state
                console.error(error);
            }
        };

        fetchAndLogUserRole();
    }, []);

    const handleTabChange = (tab) => setActiveTab(tab);

    const addField = () => {
        setRouteFields([...routeFields, { id: routeFields.length }]);
    };

    return (
        <div className="w-auto h-auto md:w-100 md:h-auto bg-white mx-4 my-3 md:mx-72 md:my-3 p-10 shadow-xl">
            <div className="text-center my-4">
                <span className="text-xl text-dark bold">Are you Ready for a </span>
                <span className="text-yellow-500 text-3xl font-bold">Ride.?</span>
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select tab
                    </label>
                    <select
                        id="tabs"
                        onChange={(e) => handleTabChange(e.target.value)}
                        className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="needRide">Need a Ride</option>
                        {userRole === 'rider' ?
                            <option value="onRide">Make Ride</option> :

                            <option value="verify">Create Ride</option>
                        }
                    </select>
                </div>
                {/* Tab Buttons */}
                <ul
                    className="hidden text-sm font-medium text-center text-white divide-x divide-gray-200 rounded-2xl sm:flex"
                    id="fullWidthTab"
                    role="tablist"
                >
                    <li className="w-full">
                        <button
                            className={`inline-block w-full p-4 rounded-ss-lg bg-yellow-500 ${activeTab === "needRide" ? "focus:outline-none" : ""
                                }`}
                            onClick={() => handleTabChange("needRide")}
                        >
                            Need a Ride
                        </button>
                    </li>
                    {userRole === 'rider' ?
                        <li className="w-full">
                            <button
                                className={`inline-block w-full p-4 bg-yellow-500 ${activeTab === "onRide" ? "focus:outline-none" : ""
                                    }`}
                                onClick={() => handleTabChange("onRide")}
                            >
                                Create a Ride
                            </button>
                        </li>
                        : <li className="w-full">
                            <button
                                className={`inline-block w-full p-4 bg-yellow-500 ${activeTab === "verify" ? "focus:outline-none" : ""
                                    }`}
                                onClick={() => handleTabChange("verify")}
                            >
                                Create a Ride
                            </button>
                        </li>
                    }
                </ul>

                <div id="fullWidthTabContent" className="border-t border-gray-200">

                    {activeTab === "needRide" && (<BookingRide username={userName} />)}

                    {activeTab === "onRide" && (<MakeRide />)}

                    {activeTab == "verify" && (<VerifyLicense />)}
                </div>

            </div>
        </div>
    );
};

export default RideBooking;
