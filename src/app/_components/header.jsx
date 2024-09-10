import Link from 'next/link';

export default function HeaderLogin() {
    return (
        <header className="h-20 w-full flex items-center justify-around  bg-[#274790]">
            {/* Logo */}
            <div className="flex items-center">
                <div className="bg-[url(/logo-unicit.png)] bg-contain bg-no-repeat w-44 h-12">
                </div>
            </div>

             {/* Barra de búsqueda */}
             <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="ml-3 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-[#FFDF37] transition">
                    Buscar
                </button>
            </div>

            {/* Barra de navegación */}
            <nav className="flex space-x-5 ">
                    <a className="text-white hover:text-[#FFDF37] hover:cursor-pointer" href='/' >Inicio</a>
                    <a className="text-white hover:text-[#FFDF37] hover:cursor-pointer">Clubes</a>
                    <a className="text-white hover:text-[#FFDF37] hover:cursor-pointer ">Usuario</a>
            </nav>

           
        </header>
    );
}
