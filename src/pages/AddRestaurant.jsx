import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleAddRestaurant = async () => {
    setLoading(true); 
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('cuisine', cuisine);
      if (image) {
        formData.append('image', image);
      }

      await axios.post('https://restaurantapp-server-1.onrender.com/api/restaurants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      alert('Restaurant added successfully');
      setName('');
      setLocation('');
      setCuisine('');
      setImage(null);
    } catch (error) {
      alert(`Failed to add restaurant: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: 'black', color: '#F4C561', minHeight: '100vh' }}>
      <h1 className="text-center mb-5" style={{ color: '#F4C561' }}>Add Restaurant</h1>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card p-4 bg-dark text-light shadow-lg rounded">
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: '#F4C561' }}>Restaurant Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter restaurant name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label" style={{ color: '#F4C561' }}>Location</label>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cuisine" className="form-label" style={{ color: '#F4C561' }}>Cuisine</label>
              <input
                type="text"
                id="cuisine"
                className="form-control"
                placeholder="Enter cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label" style={{ color: '#F4C561' }}>Upload Image</label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              className="btn btn-warning w-100 mt-3"
              onClick={handleAddRestaurant}
              style={{ backgroundColor: '#F4C561', color: 'black' }}
              disabled={loading} 
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Adding...
                </>
              ) : (
                "Add Restaurant"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
