import React, { useEffect, useState } from "react";
import { auth, getUserRole } from "../firebase";  // Import Firebase methods

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div>
      {error && <p>{error}</p>}
      {role === 'super_admin' && <h1>Hi, Super Admin!</h1>}
      {role === 'admin' && <h1>Hi, Admin!</h1>}
      {role === '' && <h1>Loading...</h1>}
    </div>
  );
};

export default Dashboard;
