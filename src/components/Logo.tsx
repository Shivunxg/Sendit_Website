import React from 'react';

const Logo = ({ className = "h-10" }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 280 100" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* "Send" Text - Bold, Blue, Tight tracking */}
        <text 
          x="0" 
          y="72" 
          fontFamily="Inter, system-ui, sans-serif" 
          fontWeight="800" 
          fontSize="68" 
          fill="#1E56A0"
          letterSpacing="-3"
        >
          Send
        </text>
        
        {/* Blue Circle - Positioned after "Send" */}
        <circle cx="225" cy="50" r="42" fill="#1E56A0" />
        
        {/* "it" Text - White, inside circle */}
        <text 
          x="192" 
          y="70" 
          fontFamily="Inter, system-ui, sans-serif" 
          fontWeight="800" 
          fontSize="48" 
          fill="white"
          letterSpacing="-1"
        >
          it
        </text>

        {/* Arrow - White, pointing right, inside circle */}
        <path 
          d="M258 50L242 40V60L258 50Z" 
          fill="white" 
        />
        <rect x="230" y="47" width="18" height="6" fill="white" />
      </svg>
    </div>
  );
};

export default Logo;
