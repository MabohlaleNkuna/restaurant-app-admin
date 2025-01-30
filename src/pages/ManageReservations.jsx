import React, { useState, useEffect } from "react";

const ManageReservations = ({ restaurantId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/reservations/admin", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setReservations(data);
      } else {
        setError(data.message || "Error fetching reservations");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
        setReservations((prevReservations) =>
          prevReservations.map((res) =>
            res._id === reservationId ? { ...res, status: data.status } : res
          )
        );
      } else {
        setError(data.message || "Error updating reservation status");
      }
    } catch (err) {
      setError("Error updating reservation status");
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (response.ok) {
        setReservations((prevReservations) =>
          prevReservations.filter((res) => res._id !== reservationId)
        );
      } else {
        const data = await response.json();
        setError(data.message || "Error deleting reservation");
      }
    } catch (err) {
      setError("Error deleting reservation");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [restaurantId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Reservations</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Party Size</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.user?.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(reservation.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{reservation.time}</td>
                <td className="border border-gray-300 px-4 py-2">{reservation.partySize}</td>
                <td className="border border-gray-300 px-4 py-2">{reservation.status}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => updateReservationStatus(reservation._id, "Confirmed")}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateReservationStatus(reservation._id, "Cancelled")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteReservation(reservation._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageReservations;
