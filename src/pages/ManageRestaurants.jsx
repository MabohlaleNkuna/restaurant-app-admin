import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaTrash } from 'react-icons/fa';

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('/api/restaurants/admin',{headers: {
      'Content-Type': 'multipart/form-data',
       "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
  }},)
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset');  // Use your Cloudinary upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
        setImage(response.data.secure_url); // Cloudinary image URL
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
  };

  return (
    <div className="manage-restaurants">
      <h1>Manage Restaurants</h1>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="restaurant-item">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            width="100" 
            className="restaurant-image"
          />
          <p>{restaurant.name}</p>
          <p>{restaurant.location}</p>
          <p>{restaurant.cuisine}</p>

          <button className="delete-btn" onClick={() => handleDelete(restaurant._id)}>
            <FaTrashAlt />
          </button>

          {editMode === restaurant._id ? (
            <div className="edit-form">
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
                onChange={handleImageUpload}
              />
              <button className="save-btn" onClick={() => handleUpdate(restaurant._id)}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-btn" onClick={() => handleEdit(restaurant)}>
              <FaEdit />
            </button>
          )}
        </div>
      ))}
    
      <style jsx>{`
        .manage-restaurants {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          padding: 20px;
          background-color: black;
          color: white;
        }

        .restaurant-item {
          background-color: transparent;
          border: 2px solid #004aad;
          border-radius: 20px;
          padding: 20px;
          margin: 10px;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .restaurant-item img {
          border-radius: 8px;
        }

        button {
          background-color: #004aad;
          color: #fff;
          border: none;
          padding: 10px;
          margin-top: 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #241d10;
        }

        .delete-btn, .edit-btn, .delete-all-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn {
          background-color: #f44336;
        }

        .delete-all-btn {
          background-color: #f44336;
          width: 100%;
          margin-top: 20px;
        }

        .edit-btn {
          background-color: #ff9800;
        }

        .save-btn, .cancel-btn {
          background-color: #4caf50;
          margin-top: 10px;
        }

        .save-btn:hover, .cancel-btn:hover {
          background-color: #388e3c;
        }

        .edit-form input {
          margin: 5px;
          padding: 10px;
          width: 100%;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        @media (max-width: 768px) {
          .restaurant-item {
            max-width: 90%;
          }

          .restaurant-item img {
            width: 80%;
          }

          button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .restaurant-item {
            padding: 15px;
          }

          .restaurant-item img {
            width: 70%;
          }

          button {
            padding: 8px;
          }

          .edit-form input {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageRestaurants;
