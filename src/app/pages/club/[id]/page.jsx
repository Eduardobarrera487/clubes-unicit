'use client'
import React from "react";
import HeaderLogin from "@/app/_components/header";
import MenuCard from "@/app/_components/menuCard";
import AnuncioForm from "@/app/_components/formAnuncio";
import EventoForm from "@/app/_components/formEvento";
import { useState, useEffect } from "react";

function Page({ params }) {

  console.log(params)
  const clubId = params.id;
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnuncioFormOpen, setIsAnuncioFormOpen] = useState(false);

  const toggleAnuncioForm = () => {
    setIsAnuncioFormOpen(!isAnuncioFormOpen);
  };

  const [isEventoFormOpen, setIsEventoFormOpen] = useState(false);

  const toggleEventoForm = () => {
    setIsEventoFormOpen(!isEventoFormOpen);
  };
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:8000/club', {
          method: 'GET',
          credentials: 'include'
        });

        console.log(response)

        if (response.ok) {
          const text = await response.text(); // Obtener la respuesta como texto
          // console.log('Texto de la respuesta:', text); // Ver el texto completo

          try {
            const data = JSON.parse(text); // Intentar parsear el JSON
            // console.log('Respuesta del servidor:', data);
            console.log("data", data)

            if (data) {
              setClubs(data)

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

  const club = clubs.find((club) => club.IdClub == params.id);




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
            <button onClick={toggleAnuncioForm} className="bg-blue-600 text-white py-2 px-4 rounded w-full">
              Anunciar
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="w-4/5 p-8">
          {/* Banner */}
          <section className="bg-gray-200 h-32 rounded mb-8 flex items-center justify-center">
            <img src={club.Banner} alt="" />
          </section>
          {/* Información del club */}
          <section className="bg-white p-6 rounded shadow-md mb-8">
            <div className="flex items-center">
              {/* Imagen del club */}
              <img src={club.Picture} alt="" className="w-16 h-16 rounded-full mr-4" />
              <h2 className="text-2xl">{club.ClubName}</h2>
            </div>
          </section>

          {/* Sección de anuncios y tabs */}
          <section className="bg-white p-6 rounded shadow-md">
            <div className="flex border-b mb-4">
              <button className="px-4 py-2 border-blue-600 text-blue-600 border-b-2">Anuncios</button>
              <button className="px-4 py-2 text-gray-600">Información del club</button>
              <button className="px-4 py-2 text-gray-600">Eventos</button>
            </div>

            {/* Contenido del tab */}
            <div>
              <p>Este es una prueba de anuncio</p>
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
            <AnuncioForm />
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
            <EventoForm clubId={clubId} /> {/* Aquí pasamos el clubId */}
          </div>
        </div>
      )}
    </div>
  );



}
export default Page;