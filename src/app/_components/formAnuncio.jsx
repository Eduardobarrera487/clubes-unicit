'use client'
import React, { useState } from "react";

const AnuncioForm = () => {
  const [formData, setFormData] = useState({
    tituloAnuncio: "",
    description: "",
    picture: null,
    
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
    data.append('tituloAnuncio', formData.tituloAnuncio);
    if (formData.picture) {
      data.append('picture', formData.picture);
    }

    data.append('description', formData.description);
    try {
      // Enviar la solicitud POST usando fetch
      const response = await fetch('http://localhost:8000/announcement', {
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
        throw new Error('Error al crear el anuncio: ' + result);
      }
      console.log('Anuncio creado exitosamente:', result);
    } catch (error) {
      console.error('Error al crear el Anuncio:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-1/2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="py-3 rounded-xl text-2xl font-bold mb-6 text-center bg-[#FFDF37] text-[#274790]">Anunciar</h2>

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

export default AnuncioForm;
