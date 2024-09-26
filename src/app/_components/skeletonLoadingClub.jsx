// components/SkeletonLoading.jsx
import React from 'react';

const SkeletonLoadingClub = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
      <div className="bg-gray-300 h-6 w-full rounded"></div>
      <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-32 w-full rounded"></div>
    </div>
  );
};

export default SkeletonLoadingClub;
