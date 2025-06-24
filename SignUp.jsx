import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/app");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        gap: '10px'
      }}>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '8px',
          }}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '8px',
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '8px',

            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: '8px' }}>
        Already have an account? <a href="/login" style={{ color: '#007bff' }}>Login</a>
      </p>
    </div>
  );
}

export default SignUp;