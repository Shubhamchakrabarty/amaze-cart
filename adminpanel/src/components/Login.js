import React, { useState } from 'react';
import { auth, getUserRole } from '../firebase';  // Import Firebase methods
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";  // Updated to use useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Updated to use useNavigate

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
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
