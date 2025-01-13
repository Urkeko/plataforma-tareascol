import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import './index.css';
import RecuperarContraseña from './components/auth/recontra';
import Dashboard from './components/principal/dashboard';
import TaskModal from './components/modals/taskmodal';


const App = () => {
  return (
    
    <Router>
      <Routes>
        //Rutas, / ruta principal el login
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recontra" element={<RecuperarContraseña/>}  />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskmodal" element={<TaskModal />} />
        
      </Routes>
    </Router>

    
  );
};

export default App;
