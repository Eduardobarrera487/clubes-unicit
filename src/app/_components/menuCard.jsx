'use client'
import React, { useEffect, useState } from 'react';

import Link from "next/link";

function MenuCard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800  rounded-md shadow-lg">
        <div className="flex items-center p-2 space-x-4">
            <img src="Foto del usuario" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
            <div>
                    <h2 className="text-lg font-semibold">{user.username}</h2>
                </div>
        </div>
        <div className="divide-y dark:divide-gray-300">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="dark:bg-gray-100 dark:text-gray-900">
                    <Link rel="noopener noreferrer" href="/pages/Inicio" className="flex items-center p-2 space-x-3 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                        <span>Inicio</span>
                    </Link>
                </li>
                
                <li>
                    <Link rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>

                        <span>Calendario</span>
                    </Link>
                </li>
                <li>
                    <Link rel="noopener noreferrer" href="/pages/userProfile" className="flex items-center p-2 space-x-3 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <span>Mi perfil</span>
                    </Link>
                </li>
            </ul>
            
        </div>
    </div>
  );
}
export default MenuCard;