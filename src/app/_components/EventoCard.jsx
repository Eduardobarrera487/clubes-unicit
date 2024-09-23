import React from "react";

const EventoCard = ({ title, date, description }) => {
  return (
    <div className="p-4 border rounded-md w-full mb-4">
      {/* Título del evento y fecha */}
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
      </div>

      {/* Descripción del evento */}
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default EventoCard;
