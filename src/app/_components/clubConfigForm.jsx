'use client'
import React, { useState } from "react";

const GroupForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    manager: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la sumisión del formulario
    console.log(formData);
  };

  return (
    <div className="bg-purple-50 p-8 flex flex-wrap gap-4 max-w-4xl mx-auto rounded-lg shadow-md">
      {/* Sección Izquierda */}
      <div className="w-full md:w-3/4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre del grupo</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Descripción</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Encargado</label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Cambiar Foto</label>
          <input
            type="file"
            name="profilePicture"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Cambiar Banner</label>
          <input
            type="file"
            name="bannerPicture"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="w-full flex justify-between mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Guardar
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default GroupForm;
