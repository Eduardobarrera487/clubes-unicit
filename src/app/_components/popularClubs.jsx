'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

function PopularClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:8000/user-clubs', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.text(); // Convertir la respuesta a JSON
          if (data.success) {
            setClubs(data.clubs); 
            console.log(data)// Establecer los clubes en el estado
          } else {
            setError(data.message); // Establecer el mensaje de error en el estado
          }
        } else {
          throw new Error('Error al obtener los clubes');
        }
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError(err.message); // Establecer el mensaje de error en el estado
      } finally {
        setLoading(false); // Cambiar a false en cualquier caso
      }
    };

    fetchClubs(); // Ejecutar la función para obtener los clubes al cargar el componente
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Mensaje de error
  }

  return (
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800 rounded-md shadow-lg">
      <div className="mb-6 bg-[#FFDF37] text-[#274790] font-bold text-center py-3 rounded-t-lg">
        <h2>Mis Clubes</h2>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {Array.isArray(clubs) && clubs.length > 0 ? (
            clubs.map((club) => (
              <li key={club.IdClub} className="dark:bg-gray-100 dark:text-gray-900">
                <Link
                  rel="noopener noreferrer"
                  href={`/club/${club.IdClub}`} // Enlace a la página del club
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <img
                    src={club.Picture ? club.Picture : "/default-club-logo.png"} // Imagen por defecto si no hay logo
                    alt={`${club.ClubName} logo`}
                    className="h-10 w-10"
                  />
                  <span>{club.ClubName}</span>
                </Link>
              </li>
            ))
          ) : (
            <p>No perteneces a ningún club.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PopularClubs;
