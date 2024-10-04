import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';   // Adjust the import paths as necessary
import Dashboard from './components/Dashboard';  // Adjust the import paths as necessary
import Orders from './components/Orders';  // Import the new Orders component
import Users from './components/Users';    // Import the new Users component
import Products from './components/Products';  // Import the new Products component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Root path for login */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />  {/* New route for Orders */}
        <Route path="/users" element={<Users />} />    {/* New route for Users */}
        <Route path="/products" element={<Products />} />  {/* New route for Products */}
      </Routes>
    </Router>
  );
}

export default App;

