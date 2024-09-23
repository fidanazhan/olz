import { configAPI, configEndpoint } from "../api/API";
import { jwtDecode } from 'jwt-decode';

export const login = async (username, password) => {
    try {
      const response = await fetch(configAPI.apiURL + configEndpoint.signIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        

        localStorage.setItem('token', data.reqRes.token);
        return data; 
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  export const getRolesFromToken = (token) => {
    if (!token) return null;
    
    try {
      const decodedToken = jwtDecode(token);
      const authorities = decodedToken.authorities; 
      console.log("Authorities : " + authorities)
  
      return authorities ? authorities.split(',') : [];
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  