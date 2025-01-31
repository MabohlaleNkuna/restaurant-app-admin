const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://restaurantapp-server-1.onrender.com/api/admin/register', { name, email, password });
      localStorage.setItem('adminToken', response.data.token);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Error registering admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Admin Registration</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm"></span> : "Register"}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Click here to login</Link></p>
    </div>
  );
};

export default Register;
