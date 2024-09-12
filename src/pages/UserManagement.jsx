import React from 'react';
import { HiMagnifyingGlass } from "react-icons/hi2";
import UserListing from '../components/User/UserListing';


const UserManagement = () => {
    return(
        <div className="px-4 lg:px-14 py-2 bg-white-200">
            <div className="py-4 bg-white px-6 rounded-md flex justify-between">
                <span className="font-bold text-3xl">User Management</span>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search..."
                        className="bg-indigo-100/30 px-4 pl-10 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600 w-full"
                    />
                    <span className="absolute inset-y-0 left-3 flex items-center text-lg">
                        <HiMagnifyingGlass />
                    </span>
                </div>
            </div>


            <div className="bg-gray-100">
                <UserListing />
            </div>
        </div>
    )
}

export default UserManagement