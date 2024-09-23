import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchTerm); // Ejecutar la búsqueda al presionar "Enter"
        }
    };

    return (
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
                onClick={() => onSearch(searchTerm)} // También ejecutar búsqueda al hacer clic
                className="ml-3 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-[#FFDF37] transition"
            >
                Buscar
            </button>
        </div>
    );
}
