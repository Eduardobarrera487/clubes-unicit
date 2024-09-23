import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

function Skeleton() {
    return (
        <div className="absolute bg-white shadow-lg rounded-lg mt-2 p-4 w-72 top-[6.5%]">
            <h3 className="font-bold mb-2">Resultados:</h3>
            <ul>
                {[...Array(3)].map((_, index) => (
                    <li key={index} className="rounded-lg py-1 bg-gray-300 h-6 animate-pulse mb-1"></li>
                ))}
            </ul>
        </div>
    );
}

export default function Header() {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const resultsRef = useRef(null); // Crear un ref para el cuadro de resultados

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                setSearchResults([]); // Limpiar resultados si se hace clic fuera
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (term) => {
        if (!term) return; // No buscar si el término está vacío
        setLoading(true); // Iniciar el estado de carga
        try {
            const response = await fetch(`http://localhost:8000/club/search?term=${encodeURIComponent(term)}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error al buscar clubes:', error);
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchTerm); // Ejecutar la búsqueda al presionar "Enter"
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} // Añadir el manejador de eventos
                />
                <button
                    onClick={() => handleSearch(searchTerm)} // También ejecutar búsqueda al hacer clic
                    className="ml-3 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-[#FFDF37] transition"
                >
                    Buscar
                </button>
            </div>

            {/* Resultados de búsqueda */}
            {loading ? (
                <Skeleton />
            ) : (
                searchResults.length > 0 && (
                    <div 
                        ref={resultsRef}
                        className="absolute bg-white shadow-lg rounded-lg mt-2 p-4 w-72 top-[6.5%]"
                    >
                        <h3 className="font-bold mb-2">Resultados:</h3>
                        <ul>
                            {searchResults.map((result) => (
                                <li 
                                    key={result.IdClub} 
                                    className="rounded-lg py-1 hover:bg-yellow-50 cursor-pointer p-7"
                                >
                                    <Link href={`/pages/club/${result.IdClub}`} rel="noopener noreferrer" className='w-full'>
                                        {result.ClubName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </header>
    );
}
