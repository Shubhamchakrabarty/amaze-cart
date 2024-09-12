import React, { useState } from 'react';
import { auth, getUserRole } from '../firebase';  // Import Firebase methods
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";  // Updated to use useNavigate
import './Login.css';  // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Updated to use navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = await getUserRole(user.uid);

      if (role === 'super_admin' || role === 'admin') {
        navigate('/admin-dashboard');  // Updated to use navigate
      } else {
        setError('Access Denied: You are not an admin.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Amazecart Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
