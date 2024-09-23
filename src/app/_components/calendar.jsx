import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 

export default function Calendar() {
  const [events, setEvents] = useState([]);

  // Función para obtener clubes y actividades del usuario desde el backend
  const fetchUserClubsAndActivities = async () => {
    try {
      const response = await fetch('http://localhost:8000/user-clubs-activities', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const textResponse = await response.text();
      console.log("Raw response text:", textResponse);  // Agregar log de la respuesta cruda
  
      if (!response.ok) {
        console.error("Error:", textResponse);
        return;
      }
  
      if (!textResponse) {
        console.error("Empty response from server");
        return;
      }
  
      const data = JSON.parse(textResponse);
      console.log("Parsed JSON data:", data);  // Verificar el JSON parseado
  
      if (data.success) {
        const formattedEvents = data.activities.map(event => ({
          title: event.ActivityName,
          start: new Date(event.ActivityDate).toISOString().split('T')[0], // Asegurar formato de fecha
          description: event.Description,
        }));
  
        console.log("Formatted events:", formattedEvents);  // Verificar los eventos formateados
        setEvents(formattedEvents);  // Actualizar eventos en el estado
      } else {
        console.error("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);  // Manejar errores en el fetch
    }
  };
  

  useEffect(() => {
    fetchUserClubsAndActivities(); // Llamamos la función al montar el componente
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-center text-4xl font-bold text-[#274790]">Calendario de Actividades</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale='es'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
      />
    </div>
  );
}
