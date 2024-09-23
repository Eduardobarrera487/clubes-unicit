'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null); // Aquí se almacena la información del usuario incluyendo el idUser
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Obtener los datos del usuario autenticado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/check-auth', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();

        if (data.authenticated) {
          // Fijarse que aquí se usa 'IdUser' con la "I" mayúscula
          setUser({
            idUser: data.IdUser,  // Aquí ajustamos para usar 'IdUser'
            username: data.username,
            email: data.email,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setResponseMessage(null);
    setIsSubmitting(true);

    if (!user || !user.idUser) {
      setIsError(true);
      setResponseMessage('No se pudo obtener el ID del usuario.');
      setIsSubmitting(false);
      return;
    }

    const updatedValues = {
      idUser: user.idUser,  // Asegúrate de que este valor esté presente
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    if (formData.profilePicture) {
      updatedValues.profilePicture = formData.profilePicture;
    }

    try {
      const response = await fetch('http://localhost:8000/user', {
        method: 'PUT',
        body: JSON.stringify(updatedValues),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      if (response.ok) {
        setResponseMessage(result.message || 'Usuario actualizado exitosamente');
      } else {
        throw new Error(result.error || 'Error al actualizar el usuario');
      }
    } catch (error) {
      setIsError(true);
      setResponseMessage('Error al actualizar el usuario: ' + error.message);
      console.error('Error completo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No estás autenticado</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 bg-yellow-300 py-4 rounded-t-lg">
          <div className="uppercase tracking-wide text-lg text-blue-900 font-semibold">AJUSTES DE USUARIO</div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Correo
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePicture">
              Cambiar Foto
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/pages/userProfile')}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className={`text-center mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserForm;
