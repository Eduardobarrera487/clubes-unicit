'use client'
import React, { useState, useEffect } from "react";
import HeaderLogin from "@/app/_components/header";
import MenuCard from "@/app/_components/menuCard";
import AnuncioForm from "@/app/_components/formAnuncio";
import EventoForm from "@/app/_components/formEvento";
import EventoCard from "@/app/_components/eventoCard";
import ClubSettingsForm from "@/app/_components/clubSettingsForm";

function Page({ params }) {
  const clubId = params.id;
  const [clubs, setClubs] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnuncioFormOpen, setIsAnuncioFormOpen] = useState(false);
  const [isEventoFormOpen, setIsEventoFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("anuncios");
  const [miembros, setMiembros] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Estado para manejar el modal de ajustes del club
  const [clubData, setClubData] = useState(null); // Estado para almacenar la información del club

  const toggleAnuncioForm = () => {
    setIsAnuncioFormOpen(!isAnuncioFormOpen);
  };

  const toggleEventoForm = () => {
    setIsEventoFormOpen(!isEventoFormOpen);
  };

  // Función para abrir/cerrar el modal de ajustes del club
  const toggleSettingsForm = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Función para guardar los cambios del club
  const handleSaveSettings = (newData) => {
    // Aquí podrías hacer una llamada a la API para guardar los datos actualizados
    console.log("Datos actualizados del club:", newData);
    setClubData(newData); // Actualiza los datos en el estado
  };

  // Fetch de clubes
  useEffect(() => {
    const fetchUserClubs = async () => {
      try {
        const response = await fetch('http://localhost:8000/user-clubs', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          const club = data.clubs.find(c => c.IdClub === clubId);
          setClubData(club); // Almacena los datos del club en el estado
          setClubs(data.clubs);
        } else {
          throw new Error('Error al obtener los clubes');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserClubs();
  }, [clubId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const club = clubs.find((club) => club.IdClub == params.id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HeaderLogin />

      <div className="flex">
        <div className="w-1/5 bg-white shadow-md p-4 flex flex-col my-8">
          <MenuCard />
          <div className="mt-8">
            <button onClick={toggleEventoForm} className="bg-blue-600 text-white py-2 px-4 rounded mb-4 w-full">
              Añadir evento
            </button>
            <button onClick={toggleAnuncioForm} className="bg-blue-600 text-white py-2 px-4 rounded w-full">
              Anunciar
            </button>
            {/* Botón para abrir el formulario de ajustes del club */}
            <button onClick={toggleSettingsForm} className="bg-green-600 text-white py-2 px-4 rounded mt-4 w-full">
              Ajustes del Club
            </button>
          </div>
        </div>

        <main className="w-4/5 p-8">
          {/* Aquí se puede renderizar la información y los eventos del club */}
        </main>
      </div>

      {/* Modal del formulario de ajustes del club */}
      {isSettingsOpen && (
        <ClubSettingsForm
          isOpen={isSettingsOpen}
          onClose={toggleSettingsForm}
          clubData={clubData}
          onSave={handleSaveSettings}
        />
      )}

      {isAnuncioFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AnuncioForm onClose={toggleAnuncioForm} />
        </div>
      )}

      {isEventoFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EventoForm onClose={toggleEventoForm} />
        </div>
      )}
    </div>
  );
}

export default Page;
