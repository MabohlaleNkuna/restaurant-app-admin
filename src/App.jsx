import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageRestaurants from './pages/ManageRestaurants';
import AdminDashboard from './pages/AdminDashboard';
import AddRestaurant from './pages/AddRestaurant';
import Login from './pages/Login';
import Register from './pages/Register';
import ManageReservations from './pages/ManageReservations';
import Navigation from './components/Navigation';
import Profile from './pages/Profile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      <div className="App" style={styles.appContainer}>
        <h1 style={styles.title}>Restaurant Reservation Admin</h1>

        {isLoggedIn && <Navigation handleLogout={handleLogout} />}

        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={isLoggedIn ? <AdminDashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/manage-restaurants" element={isLoggedIn ? <ManageRestaurants /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/add-restaurant" element={isLoggedIn ? <AddRestaurant /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/manage-reservations" element={isLoggedIn ? <ManageReservations /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<div style={styles.notFound}>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    padding: '0',
    margin: '0',
    textAlign: 'center',
    backgroundColor: 'black',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    color: 'white',
    fontSize: '32px',
    marginBottom: '20px',
  },
  notFound: {
    color: '#FF0000',
    fontSize: '24px',
    marginTop: '20px',
  },
};

export default App;
