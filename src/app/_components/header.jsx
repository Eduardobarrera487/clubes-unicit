import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success) {
                // Redirigir manualmente
                window.location.href = '/';
            } else {
                console.error('Error al hacer logout:', data.message);
            }
        } catch (error) {
            console.error('Error al hacer logout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="h-[30%] py-2 w-full flex items-center justify-around flex-row flex-wrap bg-[#274790]">
            {/* Logo */}
            <div className="flex items-center">
                <div className="bg-[url(/logo-unicit.png)] bg-contain bg-no-repeat w-44 h-12"></div>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="ml-3 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-[#FFDF37] transition">
                    Buscar
                </button>
            </div>

            {/* Barra de navegación */}
            <nav className="flex space-x-5">
                <Link href='/notifications' className="text-white hover:text-[#FFDF37] hover:cursor-pointer">
                    Notificaciones
                </Link>
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`text-white hover:text-[#FFDF37] hover:cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Saliendo...' : 'Salir'}
                </button>
            </nav>
        </header>
    );
}
