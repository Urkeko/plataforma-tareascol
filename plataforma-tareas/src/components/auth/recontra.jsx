import React, { useState } from 'react';

const RecuperarContraseña = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [message, setMessage] = useState('');

    const { email } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/recuperar-contrasena', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage('Correo de recuperación enviado');
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('Error de red');
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 flex flex-col justify-center items-center text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">TAREASCOL</h1>
                    <p className="text-sm text-center">
                        ¿Olvidaste tu contraseña? No te preocupes, ingresa tu correo para recuperar el acceso a tu cuenta.
                    </p>
                </div>

                <div className="w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Recupera tu contraseña
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
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Recuperar contraseña
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center text-sm">{message}</p>}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            ¿Recuperaste tu cuenta?{' '}
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

export default RecuperarContraseña;
