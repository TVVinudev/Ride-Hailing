import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ridelogo from "../assets/images/logo/Ride -white.png";
import avathar from '../assets/images/avathar.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logUserRole } from '../utils/getUserRole';
import React, { useState, useEffect } from 'react';
import { logUserName } from '../utils/getUserName';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    // Get the current location (active route)

    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                setIsLoading(true);
                console.error(error);
            }
        };

        fetchAndLogUserRole();
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    if (userName) {
        if (userRole == 'rider') {
            navigation.push(
                { name: 'Rider Updations', href: '/RiderUpdation' }
            );
        }
        navigation.push(
            { name: 'Trip Updations', href: '/tripUpdations' },
        );
    }

    const handleLogout = async () => {
        const resp = await fetch('/api/logout', { credentials: "include" });
        if (resp.ok) {
            alert('Logged out successfully');
            window.location.reload();
            navigate('/')
        }
    };

    return (
        <Disclosure as="nav" className="bg-yellow-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img alt="Your Company" src={ridelogo} className="h-8 w-auto" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {userName ? (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="User Avatar" src={avathar} className="size-8 rounded-full" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <Link
                                            to={`/profile/${userName}`}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Profile <br />
                                            {userName}
                                        </Link>
                                    </MenuItem>
                                    <hr />
                                    <MenuItem>
                                        <Button
                                            onClick={handleLogout}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Sign out
                                        </Button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        ) : (
                            <Link to={'/login'} className="text-gray-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
