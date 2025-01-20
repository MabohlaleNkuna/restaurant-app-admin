import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        alert('Error fetching restaurants');
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Restaurants</h1>
      <div style={styles.restaurantList}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} style={styles.restaurant}>
            <p>{restaurant.name}</p>
          </div>
        ))}
      </div>
      <button style={styles.button}>Add Restaurant</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#F4C561',
    color: '#241D10',
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  restaurantList: {
    marginBottom: '20px',
  },
  restaurant: {
    padding: '10px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#241D10',
    color: '#F4C561',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ManageRestaurants;
