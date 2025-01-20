import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');

  useEffect(() => {
    axios.get('/api/admin/reservations')
      .then((res) => {
        setReservations(res.data);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  }, []);

  const handleUpdate = async (id) => {
    const updatedData = { date, time, partySize };
    await axios.put(`/api/admin/reservations/${id}`, updatedData);
    setReservations(reservations.map((reservation) =>
      reservation._id === id ? { ...reservation, date, time, partySize } : reservation
    ));
    setEditMode(null);
    setDate('');
    setTime('');
    setPartySize('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/reservations/${id}`);
    setReservations(reservations.filter((r) => r._id !== id));
  };

  return (
    <div className="manage-reservations">
      <h1>Manage Reservations</h1>
      {reservations.map((reservation) => (
        <div key={reservation._id} className="reservation-item">
          <p><strong>Restaurant:</strong> {reservation.restaurant.name}</p>
          <p><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {reservation.time}</p>
          <p><strong>Party Size:</strong> {reservation.partySize}</p>
          <p><strong>Status:</strong> {reservation.status}</p>

          <button className="delete-btn" onClick={() => handleDelete(reservation._id)}>
            <FaTrashAlt /> Delete
          </button>

          {editMode === reservation._id ? (
            <div className="edit-form">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                type="number"
                placeholder="Party Size"
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
              />
              <button onClick={() => handleUpdate(reservation._id)}>
                Save Changes
              </button>
              <button onClick={() => setEditMode(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(reservation._id)}>
              <FaEdit /> Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageReservations;

<style jsx>{`
  .manage-reservations {
    font-family: Arial, sans-serif;
    padding: 20px;
  }

  h1 {
    text-align: center;
    color: #004AAD;
  }

  .reservation-item {
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .reservation-item p {
    margin: 5px 0;
  }

  .reservation-item button {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #17a2b8;
    color: white;
  }

  .delete-btn {
    background-color: #dc3545;
    color: white;
  }

  .edit-form input {
    margin: 5px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .edit-form button {
    background-color: #004AAD;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }

  .edit-form button:hover {
    background-color: #F4C561;
  }

  .edit-btn:hover, .delete-btn:hover {
    opacity: 0.8;
  }
`}</style>
