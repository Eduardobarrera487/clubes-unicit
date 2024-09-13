import React from "react";
import Link from "next/link";

function PopularClubs() {
  return (
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800  rounded-md shadow-lg">
        <div className="mb-6 bg-[#FFDF37] text-[#274790] font-bold text-center py-3 rounded-t-lg">
            <h2>Clubes populares</h2>
        </div>
        <div className="divide-y dark:divide-gray-300">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="dark:bg-gray-100 dark:text-gray-900">
                    <Link rel="noopener noreferrer" href="/pages/inicio" className="flex items-center p-2 space-x-3 rounded-md">
                    <img src="/Team-Liquid.png" alt="" className="h-10 w-10"/>

                        <span>Acá iria un club</span>
                    </Link>
                </li>
                <li>
                    <Link rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <img src="/club-ajedrez.jpg" alt="" className="h-10 w-10" />
                        <span>Otro club</span>
                    </Link>
                </li>
                <li>
                    <Link rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <img src="/logo-arsenal.png" alt="" className="h-10 w-10" />

                        <span>Otro</span>
                    </Link>
                </li>
                <li>
                    <Link rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <img src="/volley.png" alt="" className="h-10 w-10" />
                        <span>Y otro</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  );
}
export default PopularClubs;