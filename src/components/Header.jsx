import React,{ useState } from "react"
import {GoBell} from 'react-icons/go'
import { useNavigate } from 'react-router-dom';

const Header = (setIsLoading ) => {
    // State to handle the visibility of the dropdown
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Function to close the dropdown when clicking outside
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = async (e) => {
      try {

        localStorage.removeItem('token');
        navigate('/login');
        
      } catch (err) {
        
      }
        
    };

    return(
        <div className="flex justify-between items-center p-4">
            <div>
                <h1 className="text-xs">Welcome back!</h1>
                <p className="text-xl font-semibold">Alexia</p>
            </div>
            <div className="flex items-center space-x-5">
                {/* <div className="hidden md:flex">
                    <input 
                        type="text"
                        placeholder="Search..."
                        className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
                    />
                </div> */}
                <div className="flex items-center space-x-5 relative">
                    <button className="relative text-2xl text-gray-600">
                        <GoBell size={28} />
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">9</span>
                    </button>

                    {/* Profile Image with Dropdown */}
                    <div className="relative">
                        <img
                        className="w-8 h-8 rounded-full border-4 border-indigo-400 cursor-pointer"
                        src="https://randomuser.me/api/portraits/men/50.jpg"
                        alt="User"
                        onClick={toggleDropdown}
                        />

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeDropdown}>
                                    Settings
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                        )}
                    </div>
                    </div>

            </div>

        </div>
    )
}

export default Header