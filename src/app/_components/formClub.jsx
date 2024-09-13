'use client'
import React, { useState } from "react";

const ClubForm = () => {
  const [formData, setFormData] = useState({
    clubName: "",
    photo: null,
    banner: null,
    description: "",
    coachName: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-1/2 mt-3">
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
