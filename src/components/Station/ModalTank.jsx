// RedModal.js
import React, { useEffect, useState, useRef } from 'react';
import OilTank from './OilTank.jsx';

import ClipLoader from 'react-spinners/ClipLoader'; // Importing a spinner
import { fetchTanksDataBasedOnStation, fetchSpecificTankData } from './API.jsx'

const ModalTank = ({ isOpen, onClose, stationId }) => {
  const modalRef = useRef();

  const [boxes, setBoxes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [activeBox, setActiveBox] = useState(null);
  const [error, setError] = useState(null);

  const [data, setData] = useState({ 
    tankNumber: "",
    capacity: "",
    product: "",
    status:""
  });

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // If the user click outside of the modal, the modal will be closed.
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();  // Close the modal
      setActiveBox(null);  // Reset active box when the modal is closed
    }
  };
  

  useEffect(() => {
    if (isOpen && stationId) {      
      setLoading(true);
      fetchTanksDataBasedOnStation(stationId)
        .then((response) => {

          const reqRes = response.specificDTO;

          if (Array.isArray(reqRes)) {
            setBoxes(reqRes); 
            setLoading(false);
          } else {
            throw new Error('Invalid data format: Expected an array');
          }
          setLoading(false);
          
        })
        .catch((error) => {
          // Uncomment for debugging
          console.error(error)
          setLoading(true);
        });
        
    }
  }, [isOpen, stationId]);

  
  

  if (!isOpen) return null;


  

  const handleSelectedDataClick = async  (box) => {
    setActiveBox(box);
    setDetailsLoading(true);

    try {
      const result = await fetchSpecificTankData(box.id);

      setDetailsLoading(false);
      setData({
        tankNumber: result.specificDTO.tankNumber,
        capacity: result.specificDTO.capacity,
        product: result.specificDTO.product.name,
        status: result.specificDTO.status
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setDetailsLoading(false);
    }
    
  };






  return (
    <div className="p-12 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full relative h-auto overflow-auto"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-5">Tank Modal</h2>
        <div className="flex space-x-2">

          {/* Left side: List of boxes, scrollable */}
          <div className={`w-full lg:w-8/12 overflow-y-auto scrollbar-none flex flex-wrap gap-2 p-2 ${!loading ? 'h-96' : ''}`}>
            {loading && <p>Loading...</p>} {/* Display loading state */}
            {error && <p>Error: {error}</p>} {/* Display error if any */}
            {!loading && !error && boxes.map((box) => (
              <button
                key={box.id}
                onClick={() => handleSelectedDataClick(box)}
                className={`cursor-pointer text-left bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex-grow ${
                  activeBox?.id === box.id ? 'border-2 border-blue-500' : ''
                }`}
                style={{  boxSizing: 'border-box', height: "auto"}}
              >
                <OilTank
                  key={box.id}
                  tankNumber={box.tankNumber}
                  capacity={box.capacity}
                  productId={box.productId}
                  tankProduct={box.product.name}
                  tankProductColor={box.product.productColour}
                  status={box.status}
                  initialLevel={(box.capacity * 80) / 100} 
                />
              </button>
            ))}
          </div>



          {/* Right side: Active box content, static */}
        <div className="relative hidden lg:flex lg:flex-col lg:w-4/12 bg-white p-6 rounded-lg shadow-md lg:min-h-[100px]">
          {activeBox ? (
            <>
              <h3 className="text-2xl font-semibold mb-5">Tank</h3>

              {/* Show loading spinner while data is being fetched */}
              {detailsLoading ? (
                <div className="flex justify-center items-center h-20">
                  <ClipLoader size={35} color={"#3498db"} /> {/* Circular spinner */}
                </div>
              ) : data ? (
                <div className="mt-4">
                  <form>
                    {/* First Row */}
                    <div className='flex space-x-4 mb-2'>
                      <div className='w-7/12'>
                        <label className="block text-gray-700" htmlFor="siteName">Tank Number</label>
                        <input
                          type="text"
                          id="siteName"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Site Name"
                          value={data.tankNumber}
                          onChange={(e) => setData({
                            ...data, tankNumber: e.target.value
                          })}
                        />
                      </div>
                      <div className='w-5/12'>
                        <label className="block text-gray-700" htmlFor="siteId">Capacity</label>
                        <input
                          type="text"
                          id="siteId"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Site ID"
                          value={data.capacity}
                          onChange={(e) => setData({
                            ...data, capacity: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className='flex space-x-4 mb-2'>
                      <div className='w-full'>
                        <label className="block text-gray-700" htmlFor="address">Product</label>
                        <input
                          type="text"
                          id="address"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Address"
                          value={data.product}
                          onChange={(e) => setData({
                            ...data, product: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    {/* Third Row */}
                    <div className='flex space-x-4 mb-2'>
                      <div className='w-full'>
                        <label className="block text-gray-700" htmlFor="address">Status</label>
                        <input
                          type="text"
                          id="address"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Address"
                          value={data.status}
                          onChange={(e) => setData({
                            ...data, status: e.target.value
                          })}
                        />
                      </div>
                    </div>
                  </form>
                  
                  <br />

                </div>
              ) : null}

            </>
          ) : (
            <div className='flex justify-center text-center'>
              <p className="text-gray-500">Select a box to see details</p>
            </div>
          )}
        </div>


        </div>
      </div>
    </div>
  );
};

export default ModalTank;
