'use client'
import React, { useState } from "react";

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    email: "",
    photo: null,
    id: "" // Se agrega el campo id
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Crear un nuevo objeto FormData
    const data = new FormData();
  
    // Agregar los datos del formulario al objeto FormData
    data.append('user', formData.user);
    data.append('password', formData.password);
    data.append('email', formData.email);
    data.append('id', formData.id); // Se agrega el campo id
  
    if (formData.photo) {
      data.append('photo', formData.photo);
    }
  
    try {
      // Enviar la solicitud POST usando fetch
      const response = await fetch('http://localhost:8000/user', {
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
        throw new Error('Error al crear el Usuario: ' + result);
      }
      console.log('Usuario creado exitosamente:', result);
    } catch (error) {
      console.error('Error al crear el Usuario:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-1/2">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="py-3 rounded-xl text-2xl font-bold mb-6 text-center bg-[#FFDF37] text-[#274790]">Registro de usuario</h2>

        {/* ID del Usuario */}
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
            ID del Rol
          </label>
          <input
            type="text"
            name="id"
            id="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el ID del usuario"
          />
        </div>

        {/* Nombre de Usuario */}
        <div className="mb-4">
          <label htmlFor="user" className="block text-gray-700 font-medium mb-2">
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="user"
            id="user"
            value={formData.user}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce el nombre de usuario"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Introduce tu email"
          />
        </div>  

        {/* Subir Foto */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
            Subir Foto de perfil
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

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-[#274790] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default RegistroForm;
