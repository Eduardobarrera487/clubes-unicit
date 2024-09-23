'use client'
import React, { useState } from "react";

const EventoForm = ({ clubId }) => {
  const [formData, setFormData] = useState({
    tituloEvento: "",
    description: "",
    eventDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Asegúrate de que los valores no están vacíos antes de agregar
    if (clubId) data.append('clubId', clubId);
    if (formData.tituloEvento) data.append('tituloEvento', formData.tituloEvento);
    if (formData.description) data.append('description', formData.description);
    if (formData.eventDate) data.append('eventDate', formData.eventDate);

    try {
      const response = await fetch('http://localhost:8000/activities', {
        method: 'POST',
        body: data,
      });

      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      if (!response.ok) {
        throw new Error('Error al crear el Evento: ' + result.message || result);
      }
      alert('Evento creado exitosamente');
      console.log('Evento creado exitosamente:', result);
    } catch (error) {
      alert('Error al crear el Evento: ' + error.message);
      console.error('Error al crear el Evento:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-1/2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="py-3 rounded-xl text-2xl font-bold mb-6 text-center bg-[#FFDF37] text-[#274790]">Crear un evento</h2>

        <div className="mb-4">
          <label htmlFor="tituloEvento" className="block text-gray-700 font-medium mb-2">
            Titulo del anuncio
          </label>
          <input
            type="text"
            name="tituloEvento"
            id="tituloEvento"
            value={formData.tituloEvento}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el titulo del anuncio"
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-gray-700 font-medium mb-2">
            Escoge la fecha del evento
          </label>
          <input
            type="date"
            name="eventDate"
            id="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            min="2000-01-01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

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
