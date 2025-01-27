import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const AdminDashboard = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Restaurants Available',
        data: [10, 20, 25, 30, 35, 40, 45],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [5000, 7000, 8000, 12000, 15000, 18000, 20000],
        backgroundColor: ['#F4C561', '#004AAD', '#241D10', '#F4C561', '#004AAD', '#241D10', '#F4C561'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="container py-5 text-light" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <h1 className="text-center mb-5" style={{ color: '#F4C561' }}>Admin Dashboard</h1>

      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="p-4 bg-dark rounded shadow">
            <h3 className="text-center mb-3" style={{ color: '#F4C561' }}>Restaurant Growth</h3>
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <div className="p-4 bg-dark rounded shadow">
            <h3 className="text-center mb-3" style={{ color: '#F4C561' }}>Monthly Revenue</h3>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
