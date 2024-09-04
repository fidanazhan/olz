

export const fetchStationListData = async (page) => {

  const token = localStorage.getItem('token');  

  const response = await fetch('http://localhost:8081/api/station/getStations?searchTerm=bangi&page=' + page + '&size=2', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });  

  if (!response.ok) {
    throw new Error('Failed to fetch list data');
  }

  return await response.json();
};



export const fetchStationSpecificData = async (id) => {

  const token = localStorage.getItem('token');  

  const response = await fetch('http://localhost:8081/api/station/' + id, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });  

  if (!response.ok) {
    throw new Error('Failed to fetch list data');
  }

  return await response.json();
};

