import React from 'react';
import { CharacterState } from '../types';
import { ITEMS_CATALOG } from '../constants';

interface Props {
  inventory: CharacterState['inventory'];
}

export const PropertiesPanel: React.FC<Props> = ({ inventory }) => {
  // Filter Vehicles separate from Bases
  const vehicles = inventory.filter(slot => {
      const item = ITEMS_CATALOG.find(i => i.id === slot.itemId);
      return item && item.type === 'Vehicle';
  });

  const bases = inventory.filter(slot => {
      const item = ITEMS_CATALOG.find(i => i.id === slot.itemId);
      return item && item.type === 'Base';
  });

  if (vehicles.length === 0 && bases.length === 0) return null;

  return (
    <div className="space-y-6 mt-6">
      
      {/* SECCIÓN VEHÍCULOS */}
      {vehicles.length > 0 && (
        <div className="bg-gray-900 border border-indigo-900 p-4 rounded-lg shadow-lg shadow-indigo-900/10">
          <h3 className="text-indigo-400 font-bold border-b border-indigo-800 pb-2 mb-4 uppercase text-sm tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a2 2 0 00-2-2h-2z" />
            </svg>
            Vehículos y Transporte
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {vehicles.map((slot, idx) => {
              const item = ITEMS_CATALOG.find(i => i.id === slot.itemId);
              if (!item) return null;
              return (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-indigo-900/50 flex flex-col group hover:border-indigo-500 transition-colors">
                  <div className="flex justify-between items-start">
                     <span className="font-bold text-indigo-200">{item.name}</span>
                     <span className="text-[10px] bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded uppercase">Vehículo</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 italic">{item.effect}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECCIÓN BASES */}
      {bases.length > 0 && (
        <div className="bg-gray-900 border border-teal-900 p-4 rounded-lg shadow-lg shadow-teal-900/10">
          <h3 className="text-teal-400 font-bold border-b border-teal-800 pb-2 mb-4 uppercase text-sm tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Bases y Refugios
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {bases.map((slot, idx) => {
              const item = ITEMS_CATALOG.find(i => i.id === slot.itemId);
              if (!item) return null;
              return (
                <div key={idx} className="bg-gray-800 p-3 rounded border border-teal-900/50 flex flex-col group hover:border-teal-500 transition-colors">
                  <div className="flex justify-between items-start">
                     <span className="font-bold text-teal-200">{item.name}</span>
                     <span className="text-[10px] bg-teal-900 text-teal-300 px-2 py-0.5 rounded uppercase">Base</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 italic">{item.effect}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};