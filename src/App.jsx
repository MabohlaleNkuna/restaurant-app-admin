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
      <div className="App">
        <h1>Restaurant Reservation Admin</h1>
        <Routes>
          {/* Default route points to login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage-restaurants" element={<ManageRestaurants />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
