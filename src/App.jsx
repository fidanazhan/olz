import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login'; 
import Layout from './components/Layout';  
import Home from './pages/Home';     
import StationManagement from './pages/StationManagement';  
import UserManagement from './pages/UserManagement'
import ProtectedRoute from './util/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element=
            {
              <ProtectedRoute requiredRoles={["*"]}>
                <Home />
              </ProtectedRoute>
            } />
          <Route path="station-management" element=
            {
              <ProtectedRoute requiredRoles={["ROLE_SUPER_OP", "ROLE_SUPER_OWN","ROLE_OP","ROLE_OWN"]}>
                <StationManagement />
              </ProtectedRoute>
            }>  
          </Route>
          <Route path="user-management" element=
            {
              <ProtectedRoute requiredRoles={["ROLE_SUPER_OP", "ROLE_SUPER_OWN"]}>
                <UserManagement />
              </ProtectedRoute>
            }>
            </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
