import React, { useState } from 'react';

function ClubSettingsForm({ isOpen, onClose, clubData, onSave }) {
  const [formValues, setFormValues] = useState({
    clubName: clubData?.ClubName || '',
    description: clubData?.Description || '',
    coach: clubData?.Coach || '',
    banner: clubData?.Banner || '',
    picture: clubData?.Picture || ''
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Información básica</h2>
          <button onClick={onClose} className="bg-gray-200 text-gray-600 py-1 px-2 rounded">Cancelar</button>
        </div>

        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-gray-700 font-semibold">Nombre del grupo</label>
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
            <label htmlFor="description" className="block text-gray-700 font-semibold">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="coach" className="block text-gray-700 font-semibold">Encargado</label>
            <input
              type="text"
              id="coach"
              name="coach"
              value={formValues.Coach}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-1/2">
              <label htmlFor="Picture" className="block text-gray-700 font-semibold">Cambiar Foto</label>
              <input
                type="file"
                id="Picture"
                name="Picture"
                className="block w-full border border-gray-300 p-2 rounded cursor-pointer bg-white"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label htmlFor="Banner" className="block text-gray-700 font-semibold">Cambiar Banner</label>
              <input
                type="file"
                id="Banner"
                name="Banner"
                className="block w-full border border-gray-300 p-2 rounded cursor-pointer bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClubSettingsForm;
