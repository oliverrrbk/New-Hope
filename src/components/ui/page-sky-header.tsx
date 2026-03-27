import React from 'react';

export const PageSkyHeader = () => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-[280px] md:h-[350px] -z-10 pointer-events-none bg-[url('/assets/hero-bg.png')] bg-[length:auto_1400px] md:bg-cover bg-top"
      style={{
        maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
      }}
    />
  );
};
