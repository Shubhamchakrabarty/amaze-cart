import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';  // Adjust the import paths as necessary
import Dashboard from './components/Dashboard';  // Adjust the import paths as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Add this route for the root path */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
