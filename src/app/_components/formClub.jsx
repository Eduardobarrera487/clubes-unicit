'use client';
import React, { useState } from "react";

const ClubForm = () => {
  const [formData, setFormData] = useState({
    photo: null,
    description: "",
    banner: null,
    clubName: "",
    coachName: "",
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
  
    // Crear un nuevo objeto FormData
    const data = new FormData();
  
    // Agregar los datos del formulario al objeto FormData
    data.append('clubName', formData.clubName);
    data.append('description', formData.description);
    data.append('coachName', formData.coachName);
  
    if (formData.photo) {
      data.append('photo', formData.photo);
    }
  
    if (formData.banner) {
      data.append('banner', formData.banner);
    }
  
    try {
      // Enviar la solicitud POST usando fetch
      const response = await fetch('http://localhost:8000/club', {
        method: 'POST',
        body: data,
        // No es necesario especificar 'Content-Type'
      });

      // Verifica el tipo de respuesta antes de procesarla
      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        throw new Error('Error al crear el club: ' + response.statusText);
      }

      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Club creado exitosamente:', result);
      } else {
        const text = await response.text();
        console.error('Respuesta inesperada del servidor:', text);
      }
    } catch (error) {
      console.error('Error al crear el club:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="py-3 rounded-xl text-2xl font-bold mb-6 text-center bg-[#FFDF37] text-[#274790]">Crear un Club</h2>

        {/* Nombre del Club */}
        <div className="mb-4">
          <label htmlFor="clubName" className="block text-gray-700 font-medium mb-2">
            Nombre del Club
          </label>
          <input
            type="text"
            name="clubName"
            id="clubName"
            value={formData.clubName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el nombre del club"
          />
        </div>

        {/* Subir Foto */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
            Subir Foto
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>

        {/* Subir Banner */}
        <div className="mb-4">
          <label htmlFor="banner" className="block text-gray-700 font-medium mb-2">
            Subir Banner
          </label>
          <input
            type="file"
            name="banner"
            id="banner"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
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
            placeholder="Describe el club"
          />
        </div>

        {/* Nombre del Entrenador */}
        <div className="mb-4">
          <label htmlFor="coachName" className="block text-gray-700 font-medium mb-2">
            Nombre del Encargado
          </label>
          <input
            type="text"
            name="coachName"
            id="coachName"
            value={formData.coachName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el nombre del entrenador"
          />
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-[#274790] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Crear Club
        </button>
      </form>
    </div>
  );
};

export default ClubForm;
