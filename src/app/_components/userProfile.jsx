'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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
          setUser(data);
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

  const handleUserSettings = () => {
    router.push('/pages/userConfig');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold">Error: {error.message}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold">No estás autenticado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-yellow-400 to-white"></div>
            <div className="absolute inset-1 bg-white rounded-full overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">{user.username.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Perfil de Usuario</div>
            <h2 className="mt-1 text-2xl leading-tight font-medium text-black">{user.username}</h2>
            <p className="mt-2 text-gray-500">{user.email}</p>
            <div className="mt-6">
              <button 
                onClick={handleUserSettings}
                className="px-6 py-2 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded-full shadow-md hover:shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Ajustes de Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}