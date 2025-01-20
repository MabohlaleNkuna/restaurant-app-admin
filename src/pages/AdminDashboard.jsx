import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <button style={styles.button} onClick={() => navigate('/add-restaurant')}>
        Add Restaurant
      </button>
      <button style={styles.button} onClick={() => navigate('/manage-restaurants')}>
        Manage Restaurants
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center', backgroundColor: '#F4C561', color: '#241D10', minHeight: '100vh' },
  title: { fontSize: '28px', marginBottom: '20px' },
  button: { margin: '10px', padding: '10px 20px', backgroundColor: '#241D10', color: '#F4C561', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default AdminDashboard;
