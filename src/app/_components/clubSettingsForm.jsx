import React, { useState } from 'react';

function ClubSettingsForm({ isOpen, onClose, clubData, onSave }) {
  const [formValues, setFormValues] = useState({
    clubName: clubData?.ClubName || '',
    description: clubData?.Description || '',
    banner: clubData?.Banner || ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama la función de guardar o actualizar el club con los nuevos valores
    onSave(formValues);
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="text-red-500 font-bold mb-4">Cerrar</button>
        <h2 className="text-xl mb-4">Ajustes del Club</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-gray-700">Nombre del Club</label>
            <input
              type="text"
              id="clubName"
              name="clubName"
              value={formValues.clubName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="banner" className="block text-gray-700">URL del Banner</label>
            <input
              type="text"
              id="banner"
              name="banner"
              value={formValues.banner}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClubSettingsForm;
