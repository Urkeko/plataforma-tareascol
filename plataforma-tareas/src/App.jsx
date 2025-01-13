import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/auth/login';
import Register from './components/auth/register';
import RecuperarContraseña from './components/auth/recontra';
import Dashboard from './components/principal/dashboard';
import TaskModal from './components/modals/taskmodal';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const fetchLogue = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        const response = await axios.get('http://localhost:3001/api/logue', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsLoggedIn(false);
      }
    };
    fetchLogue();
  }, []);

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('authToken');
    
    // Actualizar el estado para indicar que el usuario ya no está autenticado
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recontra" element={<RecuperarContraseña />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/taskmodal" element={isLoggedIn ? <TaskModal /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
