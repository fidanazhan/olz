import React, { useEffect, useState, useRef } from 'react';
import { configAPI, configEndpoint } from '../../api/API';

const ModalStation = ({ id, isOpen, onClose }) => {
    const modalRef = useRef();

  const [data, setData] = useState({ 
    siteName: "",
    siteId: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    status: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && id) {      
      setLoading(true);
      fetchDetailData(id)
        .then((response) => {
          setData({
            siteName: response.specificDTO.siteName,
            siteId: response.specificDTO.siteId,
            address: response.specificDTO.address,
            city: response.specificDTO.city,
            state: response.specificDTO.state,
            country: response.specificDTO.country,
            postalCode: response.specificDTO.postalCode,
            status: response.specificDTO.status 
          });

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching details:", error);
          setLoading(true);
        });
    }
  }, [isOpen, id]);


  
  // Handle click outside the modal content
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal if clicked outside
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener when the modal is open
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Clean up the event listener when the modal is closed
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const fetchDetailData = async (id) => {
    const token = localStorage.getItem('token');  

    const response = await fetch(configAPI.apiURL + configEndpoint.getSpecificStation + '/' + id, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });  
    return response.json();
  };

  if (!isOpen) return null; // Don't render the modal if it is not open

  return (
    <div className="p-12 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-10 rounded-lg shadow-lg max-w-5xl w-full relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-5">Station Modal</h2>

        {loading ? (
             <div>Loading...</div>
        ) : ( 
        <form className="flex space-x-8">

          <div className="w-96 h-60 bg-gray-200 rounded-md overflow-hidden">
            <img alt="Site" className="object-cover w-full h-full" />
          </div>

          <div className='w-full'>

            {/* First Row */}
            <div className='flex space-x-4 mb-2'>
              <div className='w-7/12'>
                <label className="block text-gray-700" htmlFor="siteName">Site Name</label>
                <input
                  type="text"
                  id="siteName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Site Name"
                  value={data.siteName}
                  onChange={(e) => setData({
                    ...data, siteName: e.target.value
                  })}
                />
              </div>
              <div className='w-5/12'>
                <label className="block text-gray-700" htmlFor="siteId">Site ID</label>
                <input
                  type="text"
                  id="siteId"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Site ID"
                  value={data.siteId}
                  onChange={(e) => setData({
                    ...data, siteName: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Second Row */}
            <div className='flex space-x-4 mb-2'>
              <div className='w-8/12'>
                <label className="block text-gray-700" htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Address"
                  value={data.address}
                  onChange={(e) => setData({
                    ...data, address: e.target.value
                  })}
                />
              </div>
              <div className='w-4/12'>
                <label className="block text-gray-700" htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Postal Code"
                  value={data.postalCode}
                  onChange={(e) => setData({
                    ...data, postalCode: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Third Row */}
            <div className='flex space-x-4 mb-2'>
              <div className='w-4/12'>
                <label className="block text-gray-700" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => setData({
                    ...data, city: e.target.value
                  })}
                />
              </div>

              <div className='w-4/12'>
                <label className="block text-gray-700" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="State"
                  value={data.state}
                  onChange={(e) => setData({
                    ...data, state: e.target.value
                  })}
                />
              </div>

              <div className='w-4/12'>
                <label className="block text-gray-700" htmlFor="Country">Country</label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Country"
                  value={data.country}
                  onChange={(e) => setData({
                    ...data, country: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Fourth Row */}
            <div className='flex space-x-4 mb-10'>
              <div className='w-4/12'>
                <label className="block text-gray-700" htmlFor="status">Status</label>
                <input
                  type="text"
                  id="status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Status"
                  value={data.status}
                  onChange={(e) => setData({
                    ...data, country: e.target.value
                  })}
                />
              </div>
              <div className='w-7/12'>
                <label className="block text-gray-700" htmlFor="url">URL</label>
                <input
                  type="text"
                  id="url"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="URL"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-24 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save
              </button>
            </div>

          </div>

        </form>
        )}
      </div>
    </div>
  );
};

export default ModalStation;
