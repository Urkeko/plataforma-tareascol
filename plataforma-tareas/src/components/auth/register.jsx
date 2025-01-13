import React, { useState } from 'react';

const onSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),  // Enviar los datos del formulario
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Usuario registrado:', data);
            // Redirigir o hacer alguna otra acción como mostrar un mensaje de éxito
        } else {
            const errorData = await response.json();
            console.log('Error de registro:', errorData.message); // Muestra el error recibido
        }
    } catch (error) {
        console.error('Hubo un error al registrar:', error);
    }
};

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Lógica de registro aquí
        console.log('Usuario registrado:', formData);
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
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nombre de usuario:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={onChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
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
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
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
                            <a
                                href="/login"
                                className="text-indigo-600 hover:underline"
                            >
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
