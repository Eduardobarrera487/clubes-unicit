import React, { useState, useEffect } from "react";
import PasswordRecovery from "./PasswordRecovery"; // Asegúrate de que la ruta sea correcta

export default function LoginCard() {
  const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para obtener los usuarios desde la API en PHP
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/ClubsUNICITbackend/public/index.php"); // Reemplaza por la URL de tu API PHP
        const data = await response.json();
        console.log(JSON.stringify(data))
        setUsers(data); // Almacenar los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const togglePasswordRecovery = () => {
    setIsPasswordRecoveryOpen(!isPasswordRecoveryOpen);
  };

  // Función para manejar el login
  const handleLogin = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Verificar si el usuario existe en la lista de usuarios obtenidos
    const userExists = users.some(user => user.username === username && user.password === password);

    if (userExists) {
      // Si el usuario existe, mostrar el mensaje en la consola
      console.log("Acceso concedido");
      setErrorMessage(''); // Limpiar el mensaje de error si el acceso es correcto
    } else {
      // Si el usuario no existe, mostrar un mensaje de error
      setErrorMessage("Nombre de usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="w-[65%] h-[28rem] shadow-2xl relative rounded-3xl bg-white mt-1">
      <div className="opacity-95 px-6 py-6 absolute inset-0 mt-10">
        <div className="mb-6 bg-[#FFDF37] text-[#274790] font-bold text-center py-3 rounded-t-lg">
          Accede a la plataforma
        </div>
        <form className="mb-0 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="sr-only">
              Nombre de usuario
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 0114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 pl-10"
                placeholder="Nombre de usuario"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 012 2v1h-4v-1a2 2 0 012-2zm-6 6a6 6 0 1112 0H4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 pl-10"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#274790] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Acceder
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={togglePasswordRecovery}
            className="text-sm text-[#274790] font-medium hover:underline">
            ¿Olvidó su nombre de usuario o contraseña?
          </button>
        </div>
      </div>

      {/* Mostrar el componente PasswordRecovery si isPasswordRecoveryOpen es true */}
      {isPasswordRecoveryOpen && (
        <div className="absolute inset-0 bg-white z-50 flex justify-center items-center">
          <PasswordRecovery onClose={togglePasswordRecovery} />
        </div>
      )}
    </div>
  );
}
