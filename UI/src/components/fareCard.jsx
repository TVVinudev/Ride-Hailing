import React, { useEffect, useState } from 'react'

const FareCard = () => {
    const [fares, setFares] = useState([]);


    const fetchData = async () => {
        try {
            const resp = await fetch('/api/fare/getAll', {
                headers: { 'Content-Type': 'application/json' },
            });

            if (resp.ok) {
                const data = await resp.json();
                console.log(data[0]);
                setFares(data[0]);
            } else {
                alert('Error fetching users. Check your backend.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while fetching users.');
        }
    };

    useEffect(() => {
        fetchData();
    }, [])



    const cards = [
        { title: 'Base Fee', count: fares.amount, color: 'text-lime-500' },
        { title: 'Additional Fee', count: fares.additionalFee, color: 'text-red-500' },
        { title: 'Peek Time Fee', count: fares.peekTimeFee, color: 'text-blue-500' }, 
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="flex items-center justify-center h-24 rounded shadow-xl bg-white"
                >
                    <div className="text-center">
                        <h6 className="text-gray-400 text-sm">{card.title}</h6>
                        <span className={`text-[40px] font-bold ${card.color}`}>₹{card.count}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FareCard