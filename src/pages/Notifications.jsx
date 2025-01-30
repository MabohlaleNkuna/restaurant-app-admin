import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/notifications", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
      });
      const data = await response.json();
      if (response.ok) {
        setNotifications(data);
      } else {
        setError(data.message || "Error fetching notifications");
      }
    } catch (err) {
      setError("Error fetching notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Auto-refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Notifications</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {notifications.map((notif) => (
          <li key={notif._id} className="border-b p-2">
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
