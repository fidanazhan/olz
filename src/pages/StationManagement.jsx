import React, {useState} from 'react';
import StationListing from '../components/Station/StationListing';
import { HiMagnifyingGlass } from "react-icons/hi2";


const StationManagement = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const [submittedTerm, setSubmittedTerm] = useState(''); // State for the submitted search term

    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Search Term:', searchTerm); // Log the search term to the console
            setSubmittedTerm(searchTerm); // Update the submitted term
            setSearchTerm(''); // Optional: Clear the input after submission
          }
      };

    return(
        <div className="px-4 lg:px-14 py-2">
            <div className="py-4 bg-white px-6 rounded-md flex justify-between">
                <span className="font-bold text-3xl">Station Management</span>
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search..."
                        value={searchTerm} // Bind the search value to the input
                        onChange={handleSearchChange} // Update search term on change
                        onKeyDown={handleKeyDown} // Handle key down events
                        className="bg-indigo-100/30 px-4 pl-10 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600 w-full"
                    />
                    <span className="absolute inset-y-0 left-3 flex items-center text-lg">
                        <HiMagnifyingGlass />
                    </span>
                </div>
            </div>

            <div className="bg-gray-100">
                <StationListing searchTerm={submittedTerm} />
            </div>
        </div>
    )
}

export default StationManagement;