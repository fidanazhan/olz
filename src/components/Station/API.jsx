import { configAPI, configEndpoint } from "../../api/API";


export const fetchStationListData = async (searchTerm, page) => {


  const token = localStorage.getItem('token');  

  const bodyData = {
    ownerId: 1
  };

  const response = await fetch( configAPI.apiURL + configEndpoint.getListStations + '?searchTerm=' + searchTerm, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(bodyData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch list data');
  }

  return await response.json();
};



export const fetchStationSpecificData = async (id) => {

  const token = localStorage.getItem('token');  

  const response = await fetch(configAPI.apiURL + configEndpoint.getSpecificStation +  '/' + id, {
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

export const fetchTanksBasedOnStation = async(stationId) => {

  const token = localStorage.getItem('token');

  const response = await fetch(configAPI.apiURL + configEndpoint.getListTanksBasedOnStationId + "/" + stationId, {
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

export const fetchTanksDataBasedOnStation = async (searchTerm, stationId) => {


  const token = localStorage.getItem('token');  

  const response = await fetch(configAPI.apiURL + configEndpoint.getListTanksBasedOnStationId + '/' + stationId, {
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

  const response = await fetch(configAPI.apiURL + configEndpoint.getSpecificTank + "/" + tankId, {
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