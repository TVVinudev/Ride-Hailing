import React, { useState, useEffect } from 'react';

const FareForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    additionalFee: '',
    peek: ''
  });

  const fetchData = async () => {
    try {
      const resp = await fetch('/api/fare/getAll', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (resp.ok) {
        const data = await resp.json();
        setFormData({
          amount: data[0]?.amount || '',
          additionalFee: data[0]?.additionalFee || '',
          peek: data[0]?.peekTimeFee || ''
        });
      } else {
        alert('Error fetching fare data. Check your backend.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while fetching fare data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/fare/updateData', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Fare data updated successfully!');
        window.location.reload();
      } else {
        alert('Error updating fare data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Update Fare Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Additional Fee</label>
          <input
            type="number"
            name="additionalFee"
            value={formData.additionalFee}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Peak Time Fee</label>
          <input
            type="number"
            name="peek"
            value={formData.peek}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-yellow-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FareForm;
