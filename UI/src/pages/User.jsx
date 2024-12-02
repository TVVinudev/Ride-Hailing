import React from 'react'
import UsersTable from '../components/UserTable'

const User = () => {
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-none rounded-lg">
                <UsersTable />
            </div>
        </div>
    )
}

export default User