import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [image, setImage] = useState(null);

  const handleAddRestaurant = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('cuisine', cuisine);
      if (image) {
        formData.append('image', image);
      }
  
      await axios.post('http://localhost:5000/api/restaurants', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      alert('Restaurant added successfully');
  
      // Clear form fields
      setName('');
      setLocation('');
      setCuisine('');
      setImage(null);
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant');
    }
  };
  
  return (
    <div>
      <h1>Add Restaurant</h1>
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
      <button onClick={handleAddRestaurant}>Add</button>
    </div>
  );
};

export default AddRestaurant;
