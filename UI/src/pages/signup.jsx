import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bg from '../assets/images/bg1.jpg'
import { toast } from 'react-toastify'

const Signup = () => {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        const newData = {
            firstName,
            lastName,
            userName,
            password,
            email,
            contact
        };

        try {
            const resp = await fetch('/api/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(newData)
            });

            if (resp.ok) {
                toast.success('Login Successfully!');
                navigate('/login');
            } else {
                toast.error('Please check the input data');
            }

        } catch (error) {
          console.log(error);
          
        }

    };



    return (
        <div className="w-full h-screen flex justify-center">
            <div
                className="grid grid-cols-1 md:grid-cols-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:my-20 w-full md:w-[800px] md:h-auto">

                <div className="text-center">
                    <div className="py-5">
                        <span className="text-2xl font-semibold text-yellow-600">SIGN UP</span>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className="mt-4">
                            <input className=" border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                type="text"
                                placeholder="First Name"
                                name='firstName'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required />
                        </div>
                        <div className="mt-4">
                            <input type="text"
                                placeholder="Last Name"
                                className=" border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                name='lastName'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required />
                        </div>

                        <div className="mt-4">
                            <input type="text"
                                placeholder="User Name"
                                className=" border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                name='userName'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required />
                        </div>
                        <div className="mt-4">
                            <input type="password"
                                placeholder="Password"
                                className=" border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <div className="mt-4">
                            <input type="email"
                                placeholder="Email"
                                className=" border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="mt-4">
                            <input type="text"
                                placeholder="Contact"
                                className=" border-0 shadow-lg p-6 md:p-4 text-sm rounded-lg"
                                name='contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required />
                        </div>
                        <div className="mt-4">
                            <button className=" border-0 shadow-lg px-9 py-3 md:px-9 md:py-4 text-[14px] rounded-lg bg-yellow-500 text-white" type='submit'>SIGN UP</button>
                        </div>
                    </form>
                    <div className="mt-2">
                        <span className="text-[14px]">Already have an account ?{' '}<Link to={'/login'} className="text-[14px] text-yellow-600 hover:text-blue-500">Sign In</Link></span>
                    </div>

                </div>

                <div className="bg-cover invisible md:visible" style={{ backgroundImage: `url(${bg})` }} >

                </div>
            </div>

        </div>

    )
}

export default Signup