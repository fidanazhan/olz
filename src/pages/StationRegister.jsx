import React from 'react';
import StationListing from '../components/Station/StationListing';
import { HiMagnifyingGlass } from "react-icons/hi2";


const StationRegister = () => {
    return(
        <div className="px-4 lg:px-6 py-2">
            <div className="py-4 bg-white px-6 rounded-md flex justify-between">
                <span className="font-bold text-3xl">Station Management</span>
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
                <StationListing />
            </div>
        </div>
    )
}

export default StationRegister;