import React from "react";

const EventoCard = ({ title, date, description }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto mb-4">
      {/* Título del evento y fecha */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{date}</p>
      </div>

      {/* Descripción del evento */}
      <p className="mb-4 text-gray-700">{description}</p>
    </div>
  );
};

export default EventoCard;
