import React, { useState } from 'react';
import axios from 'axios'; // Importamos axios

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        email,
        password,
      });

      console.log('Usuario registrado:', response.data);
      
      window.location.reload();
    } catch (error) {
      console.error('Error de registro:', error.response?.data.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Columna izquierda con diseño */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">BLUEBACK</h1>
          <p className="text-sm text-center">
            Únete a nuestra comunidad para gestionar tus tareas y organizar tu día a día con facilidad.
          </p>
        </div>

        {/* Columna derecha con formulario */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Crea tu cuenta
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-indigo-600 hover:underline">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
