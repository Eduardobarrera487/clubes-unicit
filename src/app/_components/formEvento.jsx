'use client'
import React, { useState } from "react";

const EventoForm = () => {
  const [formData, setFormData] = useState({
    tituloAnuncio: "",
    description: "",
    eventDate: "",
    
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la solicitud POST usando fetch
      const response = await fetch('http://localhost:1337/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el evento: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Evento creado exitosamente:', result);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-1/2">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="py-3 rounded-xl text-2xl font-bold mb-6 text-center bg-[#FFDF37] text-[#274790]">Crear un evento</h2>

        {/* Nombre del Club */}
        <div className="mb-4">
          <label htmlFor="tituloAnuncio" className="block text-gray-700 font-medium mb-2">
            Titulo del anuncio
          </label>
          <input
            type="text"
            name="tituloAnuncio"
            id="tituloAnuncio"
            value={formData.tituloAnuncio}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el titulo del anuncio"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Escribe tu anuncio"
          />
        </div>

        {/* Subir Foto */}
        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-gray-700 font-medium mb-2">
            Escoge la fecha del evento
          </label>
          <input
            type="date"
            name="eventDate"
            id="eventDate"
            onChange={handleChange}
            required
            min="2000-01-01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        
        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-[#274790] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Publicar el anuncio
        </button>
      </form>
    </div>
  );
};

export default EventoForm;
