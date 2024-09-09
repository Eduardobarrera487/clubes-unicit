import React from 'react';

const CustomCard = ({ imageSrc, url }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 max-w-sm mx-auto bg-blue-900 text-white">
      <div className="flex justify-center items-center h-[18rem] w-full mb-4">
        <img src={imageSrc} alt="Class Web" className="h-full w-full object-cover rounded-lg" />
      </div>
      <button className="bg-white text-blue-900 font-bold py-2 px-4 rounded mx-auto block">
        <a href={url}>Leer más</a>
        
      </button>
    </div>
  );
};

export default CustomCard;
