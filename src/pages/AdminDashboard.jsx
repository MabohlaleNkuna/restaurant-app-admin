import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => navigate('/add-restaurant')}
        >
          Add Restaurant
        </button>
        <button
          style={styles.button}
          onClick={() => navigate('/manage-restaurants')}
        >
          Manage Restaurants
        </button>
        <button
          style={styles.button}
          onClick={() => navigate('/')}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#241D10',
    color: '#F4C561',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#F4C561',
    color: '#241D10',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    minWidth: '200px',
    textAlign: 'center',
  },
};

export default AdminDashboard;
