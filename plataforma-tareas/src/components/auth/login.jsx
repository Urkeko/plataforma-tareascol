import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/dashboard'); // Navegar a dashboard
      window.location.reload();  
    } catch (error) {
      setError(error.response?.data?.message || 'Error de conexión con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">TAREASCOL </h1>
          <p className="text-sm text-center">
            Bienvenido, plataforma para gestion de tareas.
          </p> 
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Iniciar Sesión
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-2 px-4 rounded-md shadow transition-colors`}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
          
          {/* Enlaces para registro y recuperación de contraseña */}
          <div className="mt-4 text-center">
            <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-800">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/recontra" className="text-sm text-indigo-600 hover:text-indigo-800">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
