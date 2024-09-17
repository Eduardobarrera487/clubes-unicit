'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

function PopularClubs({ userId }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los clubes desde el backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // Cambiar la URL para que apunte a tu API donde obtienes los clubes del usuario
        const response = await fetch(`http://localhost:8000/user_clubs?user_id=${IdUser}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener los clubes');
        }
        
        const data = await response.json();
        setClubs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchClubs(); // Ejecutar la función solo si hay un userId disponible
    }
  }, [userId]);

  // Mostrar un mensaje de carga mientras los datos se están obteniendo
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mostrar un mensaje de error en caso de que ocurra algún problema
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800 rounded-md shadow-lg">
      <div className="mb-6 bg-[#FFDF37] text-[#274790] font-bold text-center py-3 rounded-t-lg">
        <h2>Mis Clubes</h2>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <li key={club.id} className="dark:bg-gray-100 dark:text-gray-900">
                <Link
                  rel="noopener noreferrer"
                  href={`/club/${club.id}`} // Cambiar el enlace para dirigir a la página del club
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  {/* Cambiar el src de la imagen para que sea dinámico */}
                  <img
                    src={club.Picture ? club.Picture : "/default-club-logo.png"} // Usar una imagen por defecto si no tiene logo
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
