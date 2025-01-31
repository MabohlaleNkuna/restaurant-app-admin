import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          alert('Unauthorized! Please login again.');
          navigate('/login');
          return;
        }

        const response = await axios.get('https://restaurantapp-server-1.onrender.com/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('https://restaurantapp-server-1.onrender.com/api/admin/profile', admin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating admin profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Admin Profile</h2>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={admin.name}
            disabled={!isEditing}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={admin.email}
            disabled={!isEditing}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          />
        </div>
        {isEditing ? (
          <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>Edit Details</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
