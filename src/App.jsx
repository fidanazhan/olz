import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login'; 
import Layout from './components/Layout';  
import Home from './pages/Home';     
import StationRegister from './pages/StationRegister';  
import ProtectedRoute from './util/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element=
            {
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          <Route path="station-management" element=
            {
              <ProtectedRoute>
                <StationRegister />
              </ProtectedRoute>
            }></Route>
          <Route path="user-management" element=
            {
              <ProtectedRoute>
                <StationRegister />
              </ProtectedRoute>
            }></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
