'use client';
import React, { useState } from "react";

const ClubForm = () => {
  const [formData, setFormData] = useState({
    picture: null,
    Description: "",
    banner: null,
    ClubName: "",
    Coach: "",
    idAnnouncement: null,
    idActivities: null,
  });

  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Reiniciar el mensaje de éxito al enviar el formulario

    // Crear un nuevo objeto FormData
    const data = new FormData();

    // Agregar los datos del formulario al objeto FormData
    if (formData.picture) {
      data.append('picture', formData.picture);
    }
    if (formData.banner) {
      data.append('banner', formData.banner);
    }
    data.append('Description', formData.Description);
    data.append('ClubName', formData.ClubName);
    data.append('Coach', formData.Coach);

    try {
      // Enviar la solicitud POST usando fetch
      const response = await fetch('http://localhost:8000/club', {
        method: 'POST',
        body: data,
      });

      // Verificar si la respuesta es JSON o texto
      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text(); // Si no es JSON, obtener como texto
      }

      if (!response.ok) {
        throw new Error('Error al crear el Club: ' + result);
      }

      console.log('Club creado exitosamente:', result);
      setSuccessMessage("Club creado correctamente"); // Establecer mensaje de éxito
    } catch (error) {
      console.error('Error al crear el Club:', error);
      setSuccessMessage(""); // Reiniciar el mensaje si hay un error
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
          <label htmlFor="ClubName" className="block text-gray-700 font-medium mb-2">
            Nombre del Club
          </label>
          <input
            type="text"
            name="ClubName"
            id="ClubName"
            value={formData.ClubName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el nombre del club"
          />
        </div>

        {/* Subir Foto */}
        <div className="mb-4">
          <label htmlFor="picture" className="block text-gray-700 font-medium mb-2">
            Subir Foto
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
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
          <label htmlFor="Description" className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            name="Description"
            id="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Describe el club"
          />
        </div>

        {/* Nombre del Entrenador */}
        <div className="mb-4">
          <label htmlFor="Coach" className="block text-gray-700 font-medium mb-2">
            Nombre del Encargado
          </label>
          <input
            type="text"
            name="Coach"
            id="Coach"
            value={formData.Coach}
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

        {/* Mensaje de éxito */}
        {successMessage && (
          <p className="mt-4 text-green-600 text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ClubForm;
