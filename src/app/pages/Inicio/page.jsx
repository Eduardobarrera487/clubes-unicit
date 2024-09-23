'use client'; // Marcar el componente como Client Component

import React, { useEffect, useState } from 'react';
import MenuCard from "@/app/_components/menuCard";
import HeaderLogin from "@/app/_components/header";
import PopularClubs from "@/app/_components/popularClubs";
import AnunciosFeed from "@/app/_components/anunciosFeed";

function Skeleton() {
    return (
        <div className="flex flex-row flex-wrap w-full p-10">
            <div className='w-[30%] flex flex-row flex-wrap justify-center relative'>
                <div className="bg-gray-300 h-32 w-full animate-pulse rounded-md"></div>
            </div>
            <div className='w-[37%] flex flex-row flex-wrap p-0 justify-center'>
                <div className="bg-gray-300 h-32 w-full animate-pulse rounded-md"></div>
            </div>
            <div className='w-[30%] flex flex-row flex-wrap justify-end'>
                <div className="bg-gray-300 h-32 w-full animate-pulse rounded-md"></div>
            </div>
        </div>
    );
}

function Page() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:8000/check-auth', {
                    method: 'GET',
                    credentials: 'include', // Incluye cookies de sesión
                });
                const data = await response.json();
                console.log("Datos de autenticación:", data); // Mensaje de depuración
                if (data.authenticated) {
                    setAuthenticated(true);
                } else {
                    // Redirigir al login si no está autenticado
                    window.location.href = '/';
                }
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                window.location.href = '/';
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <Skeleton />; // Mostrar el esqueleto mientras se carga
    }

    if (!authenticated) {
        return null; // No renderiza nada si no está autenticado
    }

    return (
        <div>
            <HeaderLogin />
            <div className="p-10 flex flex-row flex-wrap w-full">
                <div className='w-[30%] flex flex-row flex-wrap justify-center relative'><MenuCard /></div>
                <div className='w-[37%] flex flex-row flex-wrap p-0 justify-center '><AnunciosFeed /></div>
                <div className='w-[30%] flex flex-row flex-wrap justify-end'><PopularClubs /></div>
            </div>
        </div>
    );
}

export default Page;
