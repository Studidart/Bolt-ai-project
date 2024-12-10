import React from 'react';
import { useGameState } from '../../hooks/useGameState';

interface HotspotProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image?: string;
  cursor?: string;
  oneTimeUse?: boolean;
}

export const Hotspot: React.FC<HotspotProps> = ({ 
  id, 
  x, 
  y, 
  width, 
  height,
  image,
  cursor = 'pointer',
  oneTimeUse 
}) => {
  const { interact, isHotspotUsed, selectedItem } = useGameState();
  const isUsed = oneTimeUse && isHotspotUsed(id);
  const [isHovered, setIsHovered] = React.useState(false);

  if (isUsed) {
    return null;
  }

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        cursor
      }}
      onClick={() => interact(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute inset-0 border-2 transition-all duration-300 rounded-lg ${
          isHovered 
            ? selectedItem 
              ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' 
              : 'border-white shadow-lg shadow-white/50'
            : 'border-transparent'
        }`}
      />
      {image && isHovered && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-20 h-20 bg-black/90 p-1 rounded-lg shadow-lg">
          <img 
            src={image} 
            alt="Hotspot preview" 
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
    </div>
  );
};