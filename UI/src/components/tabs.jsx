import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-4 mb-6">
    <button
      onClick={() => setActiveTab('updation')}
      className={`py-2 px-4 rounded-lg transition ${activeTab === 'updation' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
    >
      Ride Updation
    </button>
    <button
      onClick={() => setActiveTab('completed')}
      className={`py-2 px-4 rounded-lg transition ${activeTab === 'completed' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
    >
      Completed Rides
    </button>
  </div>
);

export default Tabs;
