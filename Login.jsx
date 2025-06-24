import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation - in production, add proper validation
    if (email && password) {
      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true); // Update the state
      navigate("/app"); // Navigate programmatically
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Login</button>
      </form>
      <p style={{ marginTop: '8px' }}>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;