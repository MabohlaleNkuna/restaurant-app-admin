// Profile.js
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setUserData({
        name: 'Admin Name',
        email: 'admin@example.com',
        role: 'Admin',
      });
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Profile</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-danger ms-2">Delete Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
