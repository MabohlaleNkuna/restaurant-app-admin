import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageRestaurants from './pages/ManageRestaurants';
import AdminDashboard from './pages/AdminDashboard';
import AddRestaurant from './pages/AddRestaurant';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <div className="App" style={styles.appContainer}>
        <h1 style={styles.title}>Restaurant Reservation Admin</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage-restaurants" element={<ManageRestaurants />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          {/* Fallback for undefined routes */}
          <Route path="*" element={<div style={styles.notFound}>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: { padding: '20px', textAlign: 'center', backgroundColor: '#F4C561', minHeight: '100vh' },
  title: { color: '#241D10', fontSize: '32px' },
  notFound: { color: '#FF0000', fontSize: '24px', marginTop: '20px' },
};

export default App;
