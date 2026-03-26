import React from 'react';

export const PageSkyHeader = () => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-[350px] -z-10 pointer-events-none"
      style={{
        backgroundImage: 'url(/assets/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
      }}
    />
  );
};
