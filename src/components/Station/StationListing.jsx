import React, { useState, useEffect } from 'react';
import OilTank from './OilTank.jsx';

import ClipLoader from 'react-spinners/ClipLoader'; // Importing a spinner
import { fetchStationListData, fetchStationSpecificData } from './API.jsx'

const StationListing = () => {


  // State to track the active box
  const [listError, setListError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // useState for Loading Animation
  const [listLoading, setListLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // useState for handle click button
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBox, setActiveBox] = useState(null);

  // useState for fetching data from the API
  const [boxes, setBoxes] = useState([]);
  const [boxDetails, setBoxDetails] = useState(null);

  // useState for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);



  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };



  const fetchData = async (pageNumber) => {
    try {
      setIsFetching(true);
      const result = await fetchStationListData(pageNumber);
      const reqRes = result.specificDTO.data;
      const last = result.specificDTO.last;      

      if (Array.isArray(reqRes)) {
        setBoxes((prevBoxes) => [...prevBoxes, ...reqRes]); 
        if (last === true) setHasMore(false); 
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

  const handleLoadMoreClick = () => {
    setIsFetching(true);
    if (isFetching || !hasMore) return; 
    setCurrentPage((prevPage) => prevPage + 1); 
    fetchData(currentPage + 1);
    setIsFetching(false)

  };


  // Listing the station data on mount
  useEffect(() => {
    const fetchDataOnMount = async () => {
      try {
        setListLoading(true); 
        const result = await fetchStationListData(1);
        
        const reqRes = result.specificDTO.data;

        if (Array.isArray(reqRes)) {
          setBoxes(reqRes); // Set the boxes state if it's an array
        } else {
          throw new Error('Invalid data format: Expected an array');
        }
      } catch (err) {
        setListError(err.message);
      } finally {
        setListLoading(false); 
      }
    };

    fetchDataOnMount(); 
  }, []);









  return (
    <div className="mt-4 py-2 flex gap-4">
      
        {/* Left side: List of boxes, scrollable */}
        <div className="w-full lg:w-4/12 h-screen overflow-y-scroll scrollbar-none flex flex-col gap-2">
          {listLoading  && <p>Loading...</p>} {/* Display loading state */}
          {error && <p>Error: {error}</p>} {/* Display error if any */}
          {!listLoading && !listError && boxes.map((box) => (
            <button
              key={box.id}
              onClick={() => handleSelectedDataClick(box)}
              className={`cursor-pointer text-left bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
                activeBox?.id === box.id ? 'border-2 border-blue-500' : ''
              }`}
            >
              <h2 className="text-md font-bold mb-1">{box.siteName}</h2>  {/* Or any other valid field */}
              <span className="text-gray-700">{box.city}</span>, <span className="text-gray-700">{box.state}</span>
            </button>
          ))}

          
          {/* Load more button at the bottom */}
          { hasMore ? 
              (<button
                onClick={handleLoadMoreClick}
                disabled={isFetching} // Disable button when fetching more data
                className="mt-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button> ) : (
                <button  className="mt-1 p-2 disabled:bg-gray-300 text-black rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-500 transition-colors delay-[80ms]">
                  No more data to load
                </button>
              )
          }
        </div>

        {/* Right side: Active box content, static */}
        <div className="relative hidden lg:flex lg:flex-col lg:w-8/12 bg-white p-6 rounded-lg shadow-md lg:min-h-[100px]">
          {activeBox ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{activeBox.siteName}</h2>
              <p className="text-gray-700"><span>{activeBox.city}</span>, <span>{activeBox.state}</span></p>

              {/* Show loading spinner while data is being fetched */}
              {detailsLoading ? (
                <div className="flex justify-center items-center h-20">
                  <ClipLoader size={35} color={"#3498db"} /> {/* Circular spinner */}
                </div>
              ) : boxDetails ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Station Data</h3>
                  <p className="text-gray-600">Site: {boxDetails.siteName}</p>
                  <p className="text-gray-600">Site Id: {boxDetails.siteId}</p>
                  <p className="text-gray-600">Address: 
                    <span> {boxDetails.address}</span>
                    <span>,</span>
                    <span> {boxDetails.city}</span>
                    <span> {boxDetails.state}</span>
                    <span> {boxDetails.country}</span>
                  </p>
                  <br />
                  <h3 className="text-lg font-semibold mb-5">Tank</h3>
                  <div className="tanks-container">
                    {boxDetails.tankListDTO.map(tank => (
                      <OilTank
                        key={tank.id}
                        tankNumber={tank.tankNumber}
                        capacity={tank.capacity}
                        productId={tank.productId}
                        initialLevel={(tank.capacity * 80) / 100} // Example fill level
                      />
                    ))}
                  </div>

                </div>
              ) : null}

            </>
          ) : (
            <p className="text-gray-500">Select a box to see details</p>
          )}

          {/* Button at the bottom right */}
          <button
            className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 text-sm"
            onClick={toggleModal}
          >
            Update
          </button>
        </div>
      </div>
  );
};

export default StationListing;
