import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [image, setImage] = useState(null);

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

  const handleUpdate = async (id) => {
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (location) formData.append('location', location);
    if (cuisine) formData.append('cuisine', cuisine);
    if (image) formData.append('image', image);

    await axios.put(`/api/restaurants/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant._id === id
          ? { ...restaurant, name, location, cuisine, image: image ? URL.createObjectURL(image) : restaurant.image }
          : restaurant
      )
    );

    setEditMode(null);
    setName('');
    setLocation('');
    setCuisine('');
    setImage(null);
  };

  const handleEdit = (restaurant) => {
    setEditMode(restaurant._id);
    setName(restaurant.name);
    setLocation(restaurant.location);
    setCuisine(restaurant.cuisine);
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

          {editMode === restaurant._id ? (
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button onClick={() => handleUpdate(restaurant._id)}>Save</button>
              <button onClick={() => setEditMode(null)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleEdit(restaurant)}>Edit</button>
          )}
        </div>
      ))}
      <button onClick={handleDeleteAll}>Delete All</button>
    </div>
  );
};

export default ManageRestaurants;
