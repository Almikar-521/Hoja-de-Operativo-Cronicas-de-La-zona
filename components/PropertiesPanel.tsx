import React from 'react';
import { CharacterState } from '../types';
import { ITEMS_CATALOG } from '../constants';

interface Props {
  inventory: CharacterState['inventory'];
}

export const PropertiesPanel: React.FC<Props> = ({ inventory }) => {
  // Filter only Vehicles and Bases
  const properties = inventory.filter(slot => {
      const item = ITEMS_CATALOG.find(i => i.id === slot.itemId);
      return item && (item.type === 'Vehicle' || item.type === 'Base');
  });

  if (properties.length === 0) return null;

  return (
    <div className="bg-gray-900 border border-indigo-900 p-4 rounded-lg mt-6 shadow-lg shadow-indigo-900/10">
      <h3 className="text-indigo-400 font-bold border-b border-indigo-800 pb-2 mb-4 uppercase text-sm tracking-widest flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
        Propiedades y Vehículos
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {properties.map((slot, idx) => {
          const item = ITEMS_CATALOG.find(i => i.id === slot.itemId);
          if (!item) return null;
          return (
            <div key={idx} className="bg-gray-800 p-3 rounded border border-indigo-900/50 flex flex-col">
              <div className="flex justify-between items-start">
                 <span className="font-bold text-indigo-200">{item.name}</span>
                 <span className="text-[10px] bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded uppercase">{item.type === 'Base' ? 'Base' : 'Vehículo'}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 italic">{item.effect}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};