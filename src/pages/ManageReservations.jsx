import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({ date: '', time: '', partySize: '' });

  // Fetch reservations on load and periodically update
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await axios.get('/api/admin/reservations'); // Make sure this is correct URL for your backend
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();

    const interval = setInterval(fetchReservations, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (id) => {
    try {
      const updatedReservation = await axios.put(`/api/admin/reservations/${id}`, formData);
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, ...updatedReservation.data } : r))
      );
      setEditMode(null);
      setFormData({ date: '', time: '', partySize: '' });
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/reservations/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Manage Reservations</h1>
      <div className="row">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{reservation.restaurant.name}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <strong>Time:</strong> {reservation.time}
                </p>
                <p className="card-text">
                  <strong>Party Size:</strong> {reservation.partySize}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(reservation._id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                  {editMode === reservation._id ? (
                    <div>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Party Size"
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleUpdate(reservation._id)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        setEditMode(reservation._id);
                        setFormData({
                          date: reservation.date.split('T')[0],  // Assuming date format is ISO string
                          time: reservation.time,
                          partySize: reservation.partySize,
                        });
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReservations;
