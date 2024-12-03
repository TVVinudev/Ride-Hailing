import React from 'react';
import FareForm from '../components/fareForm';
import FareCard from '../components/fareCard';

const AddFareData = () => {


    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-none rounded-lg">
                <FareCard />
                <FareForm />
            </div>
        </div>
    );
};

export default AddFareData;
