import React, { useState, useEffect } from 'react';

function Skeleton() {
    return (
        <div className="py-10 w-full">
            <h2 className="text-2xl font-bold mb-4 animate-pulse bg-gray-300 h-8 w-1/4"></h2>
            <ul className='w-full flex flex-col gap-5'>
                {[...Array(3)].map((_, index) => (
                    <li key={index} className="bg-gray-300 animate-pulse rounded-lg p-4 h-24"></li>
                ))}
            </ul>
        </div>
    );
}

function AnunciosFeed() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:8000/posts', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setAnnouncements(data.announcements);
                    } else {
                        setError(data.message);
                    }
                } else {
                    throw new Error('Error al obtener los anuncios');
                }
            } catch (err) {
                console.error('Error fetching announcements:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="py-10 w-full">
            <h2 className="text-2xl font-bold mb-4">Anuncios</h2>
            <ul className='w-full flex flex-col gap-5'>
                {Array.isArray(announcements) && announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <li key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 w-full">
                            <h3 className="text-lg font-semibold">{announcement.Name}</h3>
                            <p className="text-gray-700">{announcement.Description}</p>
                             {/* Verifica si existe una imagen para el anuncio */}
                             {announcement.Picture && (
                                <img
                                    src={`http://localhost:8000/${announcement.Picture}`} // Ruta completa a la imagen
                                    alt={announcement.Name}
                                    className="w-full h-64 object-cover mb-4 rounded-lg"
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <p>No hay anuncios disponibles</p>
                )}
            </ul>
        </div>
    );
}

export default AnunciosFeed;
