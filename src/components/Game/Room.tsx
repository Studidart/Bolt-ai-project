import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Hotspot } from './Hotspot';
import { Inventory } from './Inventory';
import { Dialog } from './Dialog';

export const Room: React.FC = () => {
  const { currentRoom, inventory, dialog } = useGameState();

  return (
    <div className="relative w-full h-screen">
      <img 
        src={currentRoom.background} 
        alt={currentRoom.name}
        className="w-full h-full object-cover"
      />
      
      {currentRoom.hotspots.map((hotspot) => (
        <Hotspot key={hotspot.id} {...hotspot} />
      ))}

      <Inventory items={inventory} />
      {dialog && <Dialog {...dialog} />}
    </div>
  );
};