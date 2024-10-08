'use client';
import React, { useState, useEffect } from "react";
import HeaderLogin from "@/app/_components/header";
import MenuCard from "@/app/_components/menuCard";
import AnuncioForm from "@/app/_components/formAnuncio";
import EventoForm from "@/app/_components/formEvento";
import EventoCard from "@/app/_components/eventoCard"; // Importar componente EventoCard
import ClubSettingsForm from '@/app/_components/ClubSettingsForm'; // Importar ClubSettingsForm
import AnnouncementsList from "@/app/_components/announcementList";
import SkeletonLoadingClub from "@/app/_components/skeletonLoadingClub";
//Si
function Page({ params }) {
  const clubId = params.id;
  const [clubs, setClubs] = useState([]);
  const [userclubs, setUserClubs] = useState([]);
  const [eventos, setEventos] = useState([]); // Estado para almacenar los eventos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnuncioFormOpen, setIsAnuncioFormOpen] = useState(false);
  const [isEventoFormOpen, setIsEventoFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("anuncios"); // Estado para el tab activo
  const [isClubSettingsOpen, setIsClubSettingsOpen] = useState(false); // Estado para ClubSettingsForm
  const [joinMessage, setJoinMessage] = useState(""); // Estado para el mensaje de unión


  // Función para abrir/cerrar el formulario de ajustes del club
  const toggleClubSettingsForm = () => {
    setIsClubSettingsOpen(!isClubSettingsOpen);
  };

  const handleJoinClub = async (clubId) => {
    try {
      const response = await fetch('http://localhost:8000/join-club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IdClub: clubId }),
        credentials: 'include', // Esto incluye las cookies de sesión en la solicitud
      });

      const data = await response.json();

      if (data.success) {
        setJoinMessage('Te has unido al club exitosamente.');
        setUserClubs((prev) => [...prev, { IdClub: clubId }]);        // Aquí puedes actualizar el estado de clubs del usuario
      } else {
        setJoinMessage(data.error || 'Error de conexión al unirse al club.');

      }
    } catch (err) {
      console.error('Error uniendo al club:', err);
      alert('Error de conexión al unirse al club.');
    }
  };



  const toggleAnuncioForm = () => {
    setIsAnuncioFormOpen(!isAnuncioFormOpen);
  };

  const toggleEventoForm = () => {
    setIsEventoFormOpen(!isEventoFormOpen);
  };

  


  // Fetch de clubes de usuario
  useEffect(() => {
    const fetchUserClubs = async () => {
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
            console.log('Respuesta del servidor aca en user clubs:', data);

            if (data) {
              setUserClubs(data.clubs);
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

    fetchUserClubs();
  }, []);

  // Fetch de clubes
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:8000/club', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const text = await response.text(); // Obtener la respuesta como texto
          console.log('Texto de la respuesta:', text); // Ver el texto completo

          try {
            const data = JSON.parse(text); // Intentar parsear el JSON
            console.log('Respuesta del servidor aca:', data);

            if (data) {
              setClubs(data);
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

  // Fetch de eventos
  const fetchEventos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user-clubs-activities`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Eventos recibidos:", data); // Log para verificar la respuesta

        // Convertir el objeto de eventos en un array si es un objeto
        const eventosArray = data.activities ? Object.values(data.activities) : [];
        setEventos(eventosArray); // Almacenar eventos como array en el estado
      } else {
        throw new Error('Error al obtener los eventos');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEventos(); // Llamar fetchEventos al montar el componente
  }, [clubId]);

  if (loading) {
    return <div><SkeletonLoadingClub></SkeletonLoadingClub></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const club = clubs.find((club) => club.IdClub == params.id);
  if (!club) {
    // pongan algo mas bonito cuando no se encuentre lol
    return <div><SkeletonLoadingClub></SkeletonLoadingClub></div>;
  }

  // Función para cambiar el tab activo
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(userclubs.find((club) => club.IdClub == clubId), userclubs)
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <HeaderLogin />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 bg-white shadow-md p-4 flex flex-col my-8">
          <MenuCard />
          {/* Botones debajo del sidebar */}
          <div className="mt-8">
            <button onClick={toggleEventoForm} className="bg-blue-600 text-white py-2 px-4 rounded mb-4 w-full">
              Añadir evento
            </button>
            <button onClick={toggleAnuncioForm} className="bg-blue-600 text-white py-2 px-4 rounded mb-4 w-full">
              Anunciar
            </button>
            <button onClick={toggleClubSettingsForm} className="bg-green-600 text-white py-2 px-4 rounded w-full">
              Ajustes del Club
            </button>

          </div>
        </div>



        {/* Main Content */}

        <main className="w-4/5 p-8">
          {/* Banner */}
          <section className="bg-gray-200 h-32 rounded mb-8 flex items-center justify-center">
            {club?.Banner ? (
              <img src={`http://localhost:8000/uploads/${club.Banner}`} alt="Banner del Club" className="w-full h-full object-cover rounded" />
            ) : (
              <p>No hay banner disponible</p>
            )}
          </section>

          {/* Información del club */}
          <section className="bg-white p-6 rounded shadow-md mb-8 relative">
            <div className="flex items-center">
              {club?.Picture ? (
                <img src={`http://localhost:8000/uploads/${club.Picture}`} alt="Foto del Club" className="w-16 h-16 rounded-full mr-4" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
                  <span className="text-gray-700">No Image</span>
                </div>
              )}
              <h2 className="text-2xl">{club?.ClubName}</h2>
            </div>
            {
              userclubs.find((club) => club.IdClub == clubId) ? (
                <p className="absolute right-10 bottom-10">Ya eres miembro de este club.</p>
              ) : (
                <button
                  onClick={() => handleJoinClub(clubId)}
                  className="bg-green-600 text-white py-2 px-4 rounded w-[20%] absolute right-10 bottom-10"
                >
                  Unirse al club
                </button>
              )
            }
          </section>
          {console.log('URL del Banner:', club.Banner)}
          {console.log('URL de la Imagen:', club.Picture)}

          {/* Sección de tabs */}
          <section className="bg-white p-6 rounded shadow-md">
            <div className="flex border-b mb-4">
              <button
                onClick={() => handleTabClick("anuncios")}
                className={`px-4 py-2 ${activeTab === "anuncios" ? "border-blue-600 text-blue-600 border-b-2" : "text-gray-600"}`}
              >
                Anuncios
              </button>
              <button
                onClick={() => handleTabClick("informacion")}
                className={`px-4 py-2 ${activeTab === "informacion" ? "border-blue-600 text-blue-600 border-b-2" : "text-gray-600"}`}
              >
                Información del club
              </button>
              <button
                onClick={() => handleTabClick("eventos")}
                className={`px-4 py-2 ${activeTab === "eventos" ? "border-blue-600 text-blue-600 border-b-2" : "text-gray-600"}`}
              >
                Eventos
              </button>
            </div>

            {/* Renderizado condicional de contenido basado en el tab activo */}
            <div>
              {activeTab === "anuncios" &&  <AnnouncementsList clubId={clubId} />}
              {activeTab === "informacion" && (
                <div className="bg-white p-6 rounded shadow-md">
                  <h3 className="text-xl font-bold mb-4">Información del Club</h3>

                  {/* Mostrar la información del club */}
                  <div className="mb-4">
                    <h4 className="font-semibold">Nombre:</h4>
                    <p>{club?.ClubName}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold">Descripción:</h4>
                    <p>{club?.Description || 'No hay descripción disponible'}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold">Nombre de encargado:</h4>
                    <p>{club?.Coach || 'Encargado no disponible'}</p>
                  </div>

                  {/* Puedes descomentar si deseas mostrar el número de miembros */}
                  {/* 
                  <div className="mb-4">
                    <h4 className="font-semibold">Número de miembros:</h4>
                    <p>{club?.MembersCount || 'No disponible'}</p>
                  </div>
                  */}

                  {/* Agrega más detalles del club según sea necesario */}
                </div>
              )}
              {activeTab === "eventos" && (
                <div>
                  {/* Renderizar los eventos */}
                  {userclubs.find((club) => club.IdClub == clubId) ? (
                    eventos.length > 0 ? (
                      eventos.map((evento, index) => (
                        <EventoCard
                          key={index}
                          title={evento.ActivityName}
                          date={evento.ActivityDate}
                          description={evento.Description}
                        />
                      ))
                    ) : (
                      <p>No hay eventos disponibles</p>
                    )) : (<p>Registrate en el club para poder revisar los eventos!</p>)}
                </div>
              )}
            </div>

            {/* Paginación */}
            <div className="flex justify-end mt-4">
              <button className="px-2 py-1 text-blue-600">{"<"}</button>
              <button className="px-2 py-1 text-blue-600">{">"}</button>
            </div>
          </section>
        </main>
      </div>

      {/* Modal para Anuncio */}
      {isAnuncioFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg relative">
            <button
              onClick={toggleAnuncioForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <AnuncioForm clubId={clubId} />
          </div>
        </div>
      )}

      {/* Modal para Evento */}
      {isEventoFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg relative w-1/2">
            <button
              onClick={toggleEventoForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <EventoForm clubId={clubId} />
          </div>
        </div>
      )}

      {/* Modal para Ajustes del Club */}
      {isClubSettingsOpen && (
        <ClubSettingsForm
          isOpen={isClubSettingsOpen}
          onClose={toggleClubSettingsForm}
          clubData={club}
          idClub={clubId}
        />
      )}
    </div>
  );
}

export default Page;
