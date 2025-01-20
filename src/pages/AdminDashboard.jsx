import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Restaurants Available',
        data: [10, 20, 25, 30, 35, 40, 45],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.chartContainer}>
        <h2 style={styles.chartTitle}>Restaurant Growth</h2>
        <Line data={chartData} options={chartOptions} width={300} height={200} />
      </div>

      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={() => navigate('/add-restaurant')}>
          Add Restaurant
        </button>
        <button style={styles.button} onClick={() => navigate('/manage-restaurants')}>
          Manage Restaurants
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#F4C561',
    color: '#241D10',
    minHeight: '100vh',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
    fontWeight: '600',
    color: '#241D10',
  },
  chartContainer: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    display: 'inline-block',
    width: '100%',
    maxWidth: '500px',
  },
  chartTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#241D10',
    fontWeight: '600',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#241D10',
    color: '#F4C561',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#3E3A35',
  },
};

export default AdminDashboard;
