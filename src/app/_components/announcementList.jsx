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

  if (loading) return <div>Cargando anuncios...</div>;
  if (error) return <div>Error: {error}</div>;

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
