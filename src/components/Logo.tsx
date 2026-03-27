import React from 'react';

const Logo = ({ className = "h-12" }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Sendit Logo" 
        className={`w-auto object-contain mix-blend-multiply ${className}`}
      />
    </div>
  );
};

export default Logo;
