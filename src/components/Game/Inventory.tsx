import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { gameItems } from '../../data/gameData';

interface InventoryProps {
  items: string[];
}

export const Inventory: React.FC<InventoryProps> = ({ items }) => {
  const { selectItem, selectedItem } = useGameState();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
      <div className="flex gap-4 justify-center">
        {items.map((itemId) => {
          const item = gameItems[itemId];
          return (
            <div
              key={itemId}
              className={`relative group w-16 h-16 bg-gray-800 rounded-lg cursor-pointer transition-all
                ${selectedItem === itemId ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={() => selectItem(itemId)}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 text-white p-2 rounded whitespace-nowrap">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};