import React, { useState } from "react";

const PasswordRecovery = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        carnet: "",
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
        // Lógica para manejar la recuperación de la contraseña
        console.log("Datos enviados: ", formData);
    };

    return (
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full py-7">
            {/* Botón de Cierre */}
            <button
                onClick={onClose}
                className="absolute mb-1 top-4 right-4 text-red-700 hover:text-red-600 focus:outline-none text-2xl"
            >
                &times;
            </button>

            <h2 className="text-lg font-medium mb-6 text-center text-[#274790] bg-yellow-400 rounded-md py-2">
                Recuperar Contraseña
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Carnet
                    </label>
                    <input
                        type="text"
                        name="carnet"
                        value={formData.carnet}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#274790] text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default PasswordRecovery;
