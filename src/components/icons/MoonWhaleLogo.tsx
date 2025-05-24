import React from 'react';

interface MoonWhaleLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const MoonWhaleLogo: React.FC<MoonWhaleLogoProps> = ({ 
  className = '', 
  width = 40, 
  height = 40 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
    >
      {/* Whale body */}
      <ellipse cx="50" cy="60" rx="35" ry="20" fill="#4A90E2" />
      
      {/* Whale head */}
      <ellipse cx="50" cy="45" rx="25" ry="18" fill="#4A90E2" />
      
      {/* Eye */}
      <circle cx="42" cy="40" r="3" fill="white" />
      <circle cx="42" cy="40" r="1.5" fill="black" />
      
      {/* Tail */}
      <path d="M 15 60 Q 5 50 10 70 Q 5 80 15 70" fill="#4A90E2" />
      
      {/* Moon crescent */}
      <path d="M 65 25 Q 75 15 85 25 Q 75 35 65 25" fill="#FFD700" />
      
      {/* Stars */}
      <circle cx="30" cy="20" r="1" fill="white" />
      <circle cx="70" cy="15" r="1" fill="white" />
      <circle cx="80" cy="35" r="1" fill="white" />
    </svg>
  );
};

export default MoonWhaleLogo; 