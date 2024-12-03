import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
    const { id } = useParams();
    const [datas, setDatas] = useState({});
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const resp = await fetch(`/api/search/${id}`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (resp.ok) {
                const data = await resp.json();
                // console.log(data.data.firstName);
                setDatas(data.data);
            } else {
                setError('Failed to fetch user data');
            }
        } catch (err) {
            setError('An error occurred while fetching user data');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    if (!datas.firstName) {
        return <p className="text-gray-500 text-center mt-4">Loading...</p>;
    }

    return (
        <div className='h-[80vh]'>
            <ProfileCard
                firstName={datas.firstName}
                lastName={datas.lastName}
                userName={id}
                contact={datas.contact}
                email={datas.email}
                role={datas.role}
            />
        </div>

    );
};

export default Profile;
