import React, { useEffect, useState } from "react";
import { auth, getUserRole } from "../firebase";  // Import Firebase methods
import { Link, useNavigate } from 'react-router-dom';  // For navigation links
import './Dashboard.css';  // Import styles (you can create a separate CSS file for styling)

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  // Fetch user role when component mounts
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const user = auth.currentUser;  // Get the current user
        if (user) {
          const userRole = await getUserRole(user.uid);  // Fetch user's role from Firestore
          setRole(userRole);  // Set the role
        }
      } catch (err) {
        setError('Error fetching user role.');
      }
    };
    fetchRole();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');  // Redirect to login page after logout
    } catch (error) {
      setError('Error logging out. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <nav className="sidebar">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>

      <div className="main-content">
        <header className="top-bar">
          <p>Welcome, {role === 'super_admin' ? 'Super Admin' : role === 'admin' ? 'Admin' : 'User'}!</p>
          <button onClick={handleLogout}>Logout</button>  {/* Logout button */}
        </header>

        <div className="dashboard-body">
          {error && <p>{error}</p>}
          {role === '' && <h1>Loading...</h1>}

          {/* Placeholder dashboard content */}
          {role && (
            <div className="stats">
              <h2>Dashboard</h2>
              <div className="card">Total Orders: 0</div>
              <div className="card">Total Revenue: $0</div>
              <div className="card">Total Users: 0</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
