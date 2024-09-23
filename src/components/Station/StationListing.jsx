import React, { useState, useEffect } from 'react';

import ClipLoader from 'react-spinners/ClipLoader'; // Importing a spinner
import { fetchStationListData, fetchStationSpecificData } from './API.jsx'
import { GiGasPump, GiFuelTank } from "react-icons/gi";
import { RiBuildingLine } from "react-icons/ri";
import ModalStation from './ModalStation.jsx';
import ModalTank from './ModalTank.jsx';

const StationListing = ({searchTerm}) => {


  // State to track the active box
  const [listError, setListError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // useState for Loading Animation
  const [listLoading, setListLoading] = useState(true);

  // useState for handle click button
  const [modalOpen, setModalOpen] = useState(null);

  // useState for fetching data from the API
  const [boxes, setBoxes] = useState([]);

  // useState for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [isModalStationOpen, setModalStationOpen] = useState(false);
  const [isModalTankOpen, setModalTankOpen] = useState(false);

  const openModalStation = (id) => {
    setSelectedId(id);
    setModalStationOpen(true);
  };

  const closeModalStation = () => {
    setModalStationOpen(false);
    setSelectedId(null);
  };

    const openModalTank = (id) => {
    setSelectedId(id);
    setModalTankOpen(true);
  };

  const closeModalTank = () => {
    setModalTankOpen(false);
    setSelectedId(null);
  };

  const fetchData = async (searchTerm, pageNumber) => {
    try {
      setIsFetching(true);
      const result = await fetchStationListData(searchTerm, pageNumber);
      
      const reqRes = result.specificDTO.data;
      const last = result.specificDTO.last;      

      if (Array.isArray(reqRes)) {
        setBoxes((prevBoxes) => [...prevBoxes, ...reqRes]); 
        if (last === false) setHasMore(true); 
      } else {
        throw new Error('Invalid data format: Expected an array');
      }
    } catch (err) {
      setListError(err.message);
    } finally {
      setIsFetching(false);
    }
  };


  const handleSelectedDataClick = async  (box) => {
    setActiveBox(box);
    setDetailsLoading(true);

    try {
      const result = await fetchStationSpecificData(box.id);
      const reqRes = result.specificDTO;
      console.log("Tank : " + reqRes.tankListDTO)

      setDetailsLoading(false);
      setBoxDetails(reqRes);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDetailsLoading(false);
    }
    
  };

  // Fetch more data for station listing when user click 'Load More'
  const handleLoadMoreClick = () => {
    setIsFetching(true);
    if (isFetching || !hasMore) return; 
    setCurrentPage((prevPage) => prevPage + 1); 
    fetchData(searchTerm, currentPage + 1);
    setIsFetching(false)

  };


  // Listing the station data on mount
  useEffect(() => {
    const fetchDataOnMount = async () => {
      try {
        setListLoading(true); 
        
        const result = await fetchStationListData(searchTerm, 1);
        const reqRes = result.specificDTO.data;
        const last = result.specificDTO.last;   

        if (Array.isArray(reqRes)) {
          setBoxes(reqRes); // Set the boxes state if it's an array
          if (last === false) setHasMore(true); 

        } else {
          throw new Error('Invalid data format: Expected an array');
        }
      } catch (err) {
        setListError(err.message);
        throw new Error(err.message);
      } finally {
        setListLoading(false); 
      }
    };

    fetchDataOnMount(); 
  }, [searchTerm]);

  return (
    <div className="mt-4 py-2 flex gap-4">
      
        {/* Left side: List of boxes, scrollable */}
        <div className="w-full h-screen overflow-y-scroll scrollbar-none flex flex-col gap-2">
          {listLoading  && <p>Loading...</p>} {/* Display loading state */}
          {error && <p>Error: {error}</p>} {/* Display error if any */}
          {!listLoading && !listError && boxes.map((box) => (
            <div
              key={box.id}
              className={`flex text-left bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="w-52 h-48 bg-gray-200 rounded-md overflow-hidden">
                <img src={box.imageUrl} alt="Site" className="object-cover w-full h-full" /> {/* Placeholder for image */}
              </div>
              <div className='p-4 flex justify-between items-start w-full'>
                <div className=''>
                  <h2 className="text-xl font-bold mb-1">{box.siteName}</h2>
                  <p className="text-gray-700">{box.address}</p> 
                  <p className="text-gray-700">{box.city}, {box.state}, {box.country}</p>
                  <div className='inline-block text-sm text-white bg-blue-200 px-2 py-1 font-semibold rounded-md'>{box.status}</div>
                </div>
                <div className='space-y-2 mr-10'>
                <button className="px-4 py-2 w-32 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white rounded-md border-2 border-red-200 flex gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                  onClick={() => openModalStation(box.id)}
                >
                  <RiBuildingLine className="w-5 h-5" />
                  <span className="pl-2 border-l-2 border-red-400">Station</span>
                </button>

                <button className="px-4 py-2 w-32 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-md border-2 border-green-200 flex gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                  onClick={() => openModalTank(box.id)}
                >
                  <GiFuelTank className="w-5 h-5" />
                  <span className="pl-2 border-l-2 border-green-400  w-10">Tank</span>
                </button>

                <button className="px-4 py-2 w-32 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-md border-2 border-blue-200 flex gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                  <GiGasPump className="w-5 h-5" />
                  <span className="pl-2 border-l-2 border-blue-400  w-10">Pump</span>
                </button>



                  
                </div>

              </div>
            </div>
          ))}

          
          {/* Load more button at the bottom */}
          { !hasMore ? 
              (
                <button  className="mt-1 p-2 disabled:bg-gray-300 text-black rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-500 transition-colors delay-[80ms]">
                  No more data to load
                </button>
              )
              : 
              (
                <button
                  onClick={handleLoadMoreClick}
                  disabled={isFetching} // Disable button when fetching more data
                  className="mt-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                >
                  {isFetching ? 'Loading...' : 'Load More'}
                </button> 
              )
              
              
          }

          {/* Modals */}
          <ModalStation id={selectedId} isOpen={isModalStationOpen} onClose={closeModalStation} />
          <ModalTank stationId={selectedId} isOpen={isModalTankOpen} onClose={closeModalTank} />

          
        </div>

      </div>
  );
};

export default StationListing;
