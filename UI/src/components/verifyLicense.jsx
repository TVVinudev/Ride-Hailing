import React, { useEffect, useState } from 'react'
import { logUserName } from '../utils/getUserName';

const VerifyLicense = () => {

    const [status, setStatus] = useState('');
    const [license, setLicense] = useState('')
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchAndLogUserRole = async () => {
            try {
                const name = await logUserName();
                setUserName(name);
                console.log("User Name:", name);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchAndLogUserRole();
    }, []);

    const handleVerification = async (e) => {
        e.preventDefault();
      
        const newData = {
            license
        }
        console.log(newData)

        try {
            const resp = await fetch('/api/rider/addDetails', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            if (resp.ok) {
                alert('please Wait for the Approvel!')
            } else {
                alert('something issue !')
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (!userName) return;

        const riderValidation = async () => {
            try {
                const resp = await fetch(`/api/rider/search/${userName}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!resp.ok) {
                    throw new Error(`Error: ${resp.status} ${resp.statusText}`);
                }

                const data = await resp.json();
                console.log('Fetched status:', data.data[0].Status);
                const currentStatus = data.data[0].Status
                console.log(currentStatus);
                

                setStatus(currentStatus); 
                setError(null);  
            } catch (err) {
                console.error('Failed to fetch user validation status:', err);
                setError('Failed to fetch data. Please try again later.');
                setStatus(null);
            }
        };

        riderValidation();
    }, [userName]);





    return (
        <div className="p-4 bg-white rounded-lg md:p-8">
            {status !== 'pending' ?
                <div className="text-center">
                    <h1 className="text-[25px] text-yellow-500 font-bold" >How to Make a Ride ? </h1> <br />
                    <p>Do you want to be a rider? Before that you should verify your lisiness.</p>
                    <p>Please input your Driver's License Number</p>

                    <form action="" onSubmit={handleVerification}>
                        <div className="flex justify-center items-center space-x-3">
                            <input
                                type="text"
                                id="endLocation"
                                className="md:w-54 w-auto mt-3 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
                                name="license"
                                value={license}
                                onChange={(e) => setLicense(e.target.value)}
                                placeholder="License Number"
                            />
                            <button type="submit"
                                className="inline-block rounded bg-yellow-500 px-6 pb-2 pt-2.5 mt-3 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                submit
                            </button>
                        </div>
                    </form>
                </div>
                :
                <div className="text-center">
                    <h1 className="text-[25px] text-yellow-500 font-bold" >Wait for the Verification process!</h1> <br />
                    <p className='text-3xl text-green-400 uppercase' >{status}</p>
                    
                </div>
            }
        </div>
    )
}

export default VerifyLicense