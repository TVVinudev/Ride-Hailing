import React, { useState } from 'react';
import avathar from '../assets/images/avathar.jpg';

const ProfileCard = ({ firstName, lastName, userName, contact, email, role }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [formData, setFormData] = useState({
        firstName,
        lastName,
        contact,
        email,
    });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetch(`/api/update/${userName}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        console.log(resp);
        window.location.reload();
        toggleModal();
    };

    return (
        <div className="max-w-sm mx-auto my-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                    <img alt="User Avatar" src={avathar} className="rounded-full" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">{firstName} {lastName}</h2>
                <p className="text-sm text-gray-500">@{userName}</p>
            </div>
            <div className="mt-6">
                <p className="text-gray-600">
                    <span className="font-semibold">Contact:</span> {contact}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {email}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Role:</span> {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
            </div>
            <button
                onClick={toggleModal}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
                Edit Profile
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="text-right">
                            <button
                                onClick={toggleModal}
                                className="text-gray-600 font-semibold text-xl"
                            >
                                &times;
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-sm text-gray-600">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-sm text-gray-600">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="contact" className="block text-sm text-gray-600">Contact</label>
                                <input
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
