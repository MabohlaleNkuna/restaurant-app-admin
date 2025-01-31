import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://restaurantapp-server-1.onrender.com/api/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm"></span> : "Login"}
        </button>
      </form>
      <p>Not registered? <Link to="/register">Click here to register</Link></p>
    </div>
  );
};

export default Login;