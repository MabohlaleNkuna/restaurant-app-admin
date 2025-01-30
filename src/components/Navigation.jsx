import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.navBar}>
      <nav>
        {!isActive('/dashboard') && <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>}
        {!isActive('/manage-restaurants') && <Link to="/manage-restaurants" style={styles.navLink}>Manage Restaurants</Link>}
        {!isActive('/add-restaurant') && <Link to="/add-restaurant" style={styles.navLink}>Add Restaurant</Link>}
        {!isActive('/manage-reservations') && <Link to="/manage-reservations" style={styles.navLink}>Manage Reservations</Link>}
        {!isActive('/notifications') && <Link to="/notifications" style={styles.navLink}>Notifications</Link>}
        {!isActive('/profile') && <Link to="/profile" style={styles.navLink}>Profile</Link>}
        <Link to="#" onClick={handleLogout} style={styles.logoutLink}>
          <span role="img" aria-label="logout">🚪</span> Logout
        </Link>
      </nav>
    </div>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#333',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 15px',
    fontSize: '18px',
    transition: 'color 0.3s ease',
  },
  logoutLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 15px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  navLinkHover: {
    color: '#FF5733', 
  },
};

export default Navigation;
