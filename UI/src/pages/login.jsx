import React, { useState } from 'react';
import bg from '../assets/images/daniel-early-xAqmWdhZJJA-unsplash.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { logUserRole } from '../utils/getUserRole';

const Login = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userRole, setUserRole] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newData = {
            userName,
            password,
        };

        try {
            const resp = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            setIsLoading(false); // Reset loading state

            if (resp.ok) {
                alert('Login Successful!');

                try {
                    const resp = await fetch(`/api/search/${userName}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (!resp.ok) {
                        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
                    }

                    const data = await resp.json();
                    if(data.data.role ==='admin'){
                        navigate('/adminDashBoard')
                    }else{
                        navigate('/')
                    }
                    
                } catch (error) {
                    console.error('Failed to fetch user role:', error);
                    throw error;
                }

                // navigate('/');
                // Update this to your desired path
            } else {
                alert('Invalid username or password!');
            }
        } catch (error) {
            setIsLoading(false); // Reset loading state
            alert('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:my-20 w-full h-screen md:w-[800px] md:h-[450px]">
                {/* Form Section */}
                <div className="text-center">
                    <div className="py-5">
                        <span className="text-2xl font-semibold text-yellow-600">LOGIN</span>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="User Name"
                                name="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="border-0 shadow-lg px-9 py-3 md:px-9 md:py-4 text-[14px] rounded-lg bg-yellow-500 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'SIGN IN'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-2">
                        <span className="text-[14px]">
                            Are you new?{' '}
                            <Link to={'/signup'} className="text-[14px] text-yellow-600 hover:text-blue-500">
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </div>

                {/* Image Section */}
                <div className="bg-cover hidden md:block" style={{ backgroundImage: `url(${bg})` }}></div>
            </div>
        </div>
    );
};

export default Login;
