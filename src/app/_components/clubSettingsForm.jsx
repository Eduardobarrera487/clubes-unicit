import React, { useState } from 'react';

function ClubSettingsForm({ isOpen, onClose, clubData, idClub }) {
  const [formValues, setFormValues] = useState({
    IdClub: idClub, // Usar IdClub para coincidir con el backend
    ClubName: clubData?.ClubName || '',
    Description: clubData?.Description || '',
    Coach: clubData?.Coach || '',
    Banner: null, // Cambiamos a null para almacenar el archivo
    Picture: null // Cambiamos a null para almacenar el archivo
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {  // Asegúrate de que hay un archivo
      setFormValues({
        ...formValues,
        [name]: files[0] // Guardamos el archivo en el estado
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Guardando ajustes del club:', formValues);

    // Crear un objeto FormData para enviar archivos
    const data = new FormData();
    data.append('IdClub', formValues.IdClub); // Cambiado a IdClub
    data.append('ClubName', formValues.ClubName); // Cambiado a ClubName
    data.append('Description', formValues.Description); // Cambiado a Description
    data.append('Coach', formValues.Coach); // Cambiado a Coach
    if (formValues.Banner) data.append('Banner', formValues.Banner); // Cambiado a Banner
    if (formValues.Picture) data.append('Picture', formValues.Picture); // Cambiado a Picture

    try {
      const response = await fetch('http://localhost:8000/edit-club', {
        method: 'POST',
        body: data, // Cambia a FormData para permitir el envío de archivos
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Club settings updated successfully:', result);
        onClose(); // Cerrar el formulario después de guardar
      } else {
        const errorText = await response.text(); // Obtener el texto de error
        console.error('Error updating club settings:', errorText);
        alert('Error: ' + errorText); // Mostrar el error al usuario
      }
    } catch (err) {
      console.log('Error al guardar ajustes del club:', err);
      alert(`Error: ${err.message}`); // Mostrar el error al usuario
    }
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
              name="ClubName" // Cambiado a ClubName
              value={formValues.ClubName} // Cambiado a ClubName
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold">Descripción</label>
            <textarea
              id="description"
              name="Description" // Cambiado a Description
              value={formValues.Description} // Cambiado a Description
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="coach" className="block text-gray-700 font-semibold">Encargado</label>
            <input
              type="text"
              id="coach"
              name="Coach" // Cambiado a Coach
              value={formValues.Coach} // Cambiado a Coach
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-1/2">
              <label htmlFor="picture" className="block text-gray-700 font-semibold">Cambiar Foto</label>
              <input
                type="file"
                id="picture"
                name="Picture" // Cambiado a Picture
                onChange={handleFileChange}
                className="block w-full border border-gray-300 p-2 rounded cursor-pointer bg-white"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label htmlFor="banner" className="block text-gray-700 font-semibold">Cambiar Banner</label>
              <input
                type="file"
                id="banner"
                name="Banner" // Cambiado a Banner
                onChange={handleFileChange}
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
