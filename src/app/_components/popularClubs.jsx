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
          const text = await response.text(); // Obtener la respuesta como texto
          console.log('Texto de la respuesta:', text); // Ver el texto completo

          try {
            const data = JSON.parse(text); // Intentar parsear el JSON
            console.log('Respuesta del servidor:', data);

            if (data.success) {
              setClubs(data.clubs);
            } else {
              setError(data.message);
            }
          } catch (err) {
            console.error('Error al parsear JSON:', err);
            setError('Error al procesar la respuesta del servidor');
          }
        } else {
          throw new Error('Error al obtener los clubes');
        }
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
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
                  href={`/club/${club.IdClub}`}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <img
                    src={club.Picture ? club.Picture : "/default-club-logo.png"}
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
