import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    
    return decodedToken.exp && decodedToken.exp < currentTime;
  } catch (error) {
    return true; 
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  console.log("Token (1) : " + token)

  
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
