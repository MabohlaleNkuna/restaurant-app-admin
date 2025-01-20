import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('/api/restaurants')
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/restaurants/${id}`);
    setRestaurants(restaurants.filter((r) => r._id !== id));
  };

  const handleDeleteAll = async () => {
    await axios.delete('/api/restaurants/deleteAll');
    setRestaurants([]);
  };

  return (
    <div>
      <h1>Manage Restaurants</h1>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <img 
            src={`http://localhost:5000/${restaurant.image}`} 
            alt={restaurant.name} 
            width="100" 
          />
          <p>{restaurant.name}</p>
          <p>{restaurant.location}</p>
          <p>{restaurant.cuisine}</p>
          <button onClick={() => handleDelete(restaurant._id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleDeleteAll}>Delete All</button>
    </div>
  );
};

export default ManageRestaurants;
