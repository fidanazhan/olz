

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

export const fetchTanksBasedOnStation = async(id) => {

  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:8081/api/tank/getTanks/' + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });

  if (response.status == "204") {
      throw new Error('No Data Found');
    }

  return await response.json();

}

export const fetchTanksDataBasedOnStation = async (stationId) => {
  const token = localStorage.getItem('token');  

  const response = await fetch('http://localhost:8081/api/tank/getTanks/' + stationId, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });

  if (response.status == "204") {
    throw new Error('Failed to fetch list data');
  }

  return response.json();
};

export const fetchSpecificTankData = async (tankId) => {
  const token = localStorage.getItem('token');  

  const response = await fetch('http://localhost:8081/api/tank/' + tankId, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });

  if (response.status == "204") {
    throw new Error('Failed to fetch list data');
  }

  return response.json();
}