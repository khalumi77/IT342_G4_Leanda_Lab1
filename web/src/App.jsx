import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
// import Login from './components/Login'; // We will make this next

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}

          {/* Redirect base URL to register for now so you can see it */}
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;