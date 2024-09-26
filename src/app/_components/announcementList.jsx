// components/AnnouncementsList.jsx
import { useState, useEffect } from 'react';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementsList = ({ clubId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Realizar la solicitud cuando se carga el componente
  useEffect(() => {
    console.log('Fetching announcements for club', clubId);
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:8000/club-announcements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ IdClub: clubId }),  // Se envía el ID del club al backend
        });

        if (!response.ok) {
          throw new Error('Error al obtener los anuncios');
        }

        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        } else {
          setError(data.message || 'Error desconocido');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [clubId]); // Ejecutar cuando `clubId` cambie

  // components/SkeletonAnnouncementCard.jsx
const SkeletonAnnouncementCard = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-lg p-4">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="h-64 bg-gray-300 rounded"></div>
    </div>
  );
};



  if (loading) return <div> <SkeletonAnnouncementCard></SkeletonAnnouncementCard></div>;
  if (error) return <div>Error: {error}</div>;
  // components/AnnouncementCard.jsx
const AnnouncementCard = ({ announcement }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold">{announcement.Name}</h3>
      <p className="text-gray-700">{announcement.Description}</p>
      {/* Verifica si existe una imagen para el anuncio */}
      {announcement.Picture && (
        <img
          src={`http://localhost:8000/${announcement.Picture}`} // Ruta a la imagen
          alt={announcement.Name}
          className="w-full h-64 object-cover mb-4 rounded-lg mt-5"
        />
      )}
    </div>
  );
};


  return (
    <div className="grid grid-cols-1 gap-4">
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <AnnouncementCard key={announcement.IdAnnouncement} announcement={announcement} />
        ))
      ) : (
        <div>No hay anuncios disponibles.</div>
      )}
    </div>
  );
};

export default AnnouncementsList;
