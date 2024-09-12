import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';   // Import Login component
import Dashboard from './components/Dashboard';  // Import Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Login page */}
        <Route path="/admin-dashboard" element={<Dashboard />} />  {/* Dashboard page */}
      </Routes>
    </Router>
  );
}

export default App;
