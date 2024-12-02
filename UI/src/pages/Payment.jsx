import React from 'react'
import PaymentTable from '../components/PaymentTable'

const Payment = () => {
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-none rounded-lg">
                <PaymentTable />
            </div>
        </div>
    )
}

export default Payment