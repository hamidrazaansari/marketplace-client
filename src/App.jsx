import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MarketPlace from './pages/MarketPlace';
import AdminPannel from './pages/AdminPannel';
import Language from './pages/Language';
import Category from './pages/Category';
import Country from './pages/Country';
import Niche from './pages/Niche';
import Sites from './pages/Sites';
import ImpNotes from './pages/ImpNotes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication on page load (e.g., token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove token on logout
  };

  return (
    <Routes>
      <Route path="/" element={<MarketPlace />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <AdminPannel onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/lang"
        element={
          isAuthenticated ? <Language /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/category"
        element={
          isAuthenticated ? <Category /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/country"
        element={
          isAuthenticated ? <Country /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/niche"
        element={
          isAuthenticated ? <Niche /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/sites"
        element={
          isAuthenticated ? <Sites /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/notes"
        element={
          isAuthenticated ? <ImpNotes /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
