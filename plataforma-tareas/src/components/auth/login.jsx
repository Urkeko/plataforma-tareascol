import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://tu-servidor.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login exitoso:', data);
            } else {
                console.error('Error en el login:', data);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                {/* Columna izquierda con diseño */}
                <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 flex flex-col justify-center items-center text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">TAREASCOL</h1>
                    <p className="text-sm text-center">
                        Bienvenido a nuestra plataforma de gestión de tareas colaborativa. Administra tus tareas, colabora y mantente organizado con tu equipo.
                    </p>
                </div>

                {/* Columna derecha con formulario */}
                <div className="w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Bienvenido
                    </h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Inicia sesión en tu cuenta para continuar
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Contraseña:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="text-right">

                          <Link
                                to="/recontra"
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                 ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <Link
                                to="/register"
                                className="text-indigo-600 hover:underline"
                            >
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
