import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getRolesFromToken } from '../util/Auth'

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    
    return decodedToken.exp && decodedToken.exp < currentTime;
  } catch (error) {
    return true; 
  }
};

const ProtectedRoute = ({ children, requiredRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  const roles = getRolesFromToken(token);

  if (requiredRoles.includes("*")) {
    return children;
  }

  const hasRequiredRole = requiredRoles.some((role) => roles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
