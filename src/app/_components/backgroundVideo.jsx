"use client"; // Añade esta línea al principio del archivo
import React, { useEffect, useRef } from 'react';

const BackgroundVideo = ({ video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 h-full w-full -z-10">
      <video
        ref={videoRef}
        className="object-cover h-full w-full"
        src={video}
        type="video/mp4"
        autoPlay
        muted
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-10"></div>
    </div>
  );
};

export default BackgroundVideo;


