import React, { useState } from 'react';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [availableSlots, setAvailableSlots] = useState('');

  const handleAddRestaurant = () => {
    if (!name || !location || !cuisine) {
      alert('All fields are required');
      return;
    }
    alert(`Restaurant "${name}" added successfully!`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Restaurant</h1>
      <input
        style={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Available Slots (comma-separated)"
        value={availableSlots}
        onChange={(e) => setAvailableSlots(e.target.value)}
      />
      <button style={styles.button} onClick={handleAddRestaurant}>
        Add
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#241D10',
    color: '#F4C561',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#F4C561',
    color: '#241D10',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddRestaurant;
