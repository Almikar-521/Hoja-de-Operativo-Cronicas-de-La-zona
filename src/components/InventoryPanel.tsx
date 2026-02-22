
import React from 'react';
import { CharacterState } from '../types';
import { getItem } from '../utils';

interface Props {
  inventory: CharacterState['inventory'];
  onUpdateItem: (itemId: string, qty: number) => void;
  gold: number;
  onUpdateGold: (val: number) => void;
  onOpenShop: () => void;
}

export const InventoryPanel: React.FC<Props> = ({ inventory, onUpdateItem, gold, onUpdateGold, onOpenShop }) => {
  
  const getWeight = (item: any, qty: number) => {
    if (!item) return '0';
    const total = (item.weight || 0) * qty;
    return Math.round(total * 100) / 100;
  };

  // Optimized filter using the Map lookup
  const backpackItems = inventory.filter(slot => {
      const item: any = getItem(slot.itemId);
      if (!item) return true; // Keep unknown items to delete them
      return item.type !== 'Vehicle' && item.type !== 'Base';
  });

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <h3 className="text-yellow-500 font-bold">SUMINISTROS Y SAQUEO</h3>
        <button 
            onClick={onOpenShop}
            className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-3 py-1 rounded text-xs flex items-center gap-1"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
            ABRIR TIENDA
        </button>
      </div>
      
      {/* List */}
      <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
        {backpackItems.length === 0 && <div className="text-gray-500 text-sm italic text-center py-4">Mochila vacía. Compra suministros en la tienda.</div>}
        
        {backpackItems.map((slot, idx) => {
          let item: any = getItem(slot.itemId);
          let isUnknown = false;
          
          // Fallback if not found
          if (!item) {
              item = { 
                  name: `Objeto Desconocido (${slot.itemId})`, 
                  type: 'Unknown', 
                  weight: 0 
              }; 
              isUnknown = true;
          }

          const typeLabel = item.type === 'Pistola' || item.type === 'Subfusil' || item.type === 'Rifle Asalto' || item.type === 'Escopeta' ? 'Arma' : item.type;

          return (
            <div key={idx} className={`flex justify-between items-center bg-gray-800/50 p-2 rounded border group hover:border-gray-500 transition-colors ${isUnknown ? 'border-red-900/50 bg-red-900/10' : 'border-gray-700/50'}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
                 <span className={`flex-none text-[10px] px-1 rounded uppercase tracking-wider ${
                     ['Medical', 'Food'].includes(item.type) ? 'bg-green-900 text-green-200' :
                     ['Ammo', 'Explosive'].includes(item.type) ? 'bg-yellow-900 text-yellow-200' :
                     ['Pistola','Subfusil','Escopeta','Rifle Asalto','Sniper','Melee'].includes(item.type) ? 'bg-red-900 text-red-200' :
                     isUnknown ? 'bg-gray-700 text-gray-500' : 
                     'bg-gray-700 text-gray-300'
                 }`}>
                    {typeLabel.substring(0,3)}
                 </span>
                 <span className={`text-sm font-medium leading-tight ${isUnknown ? 'text-red-400 italic' : 'text-gray-200'}`}>{item.name}</span>
              </div>
              <div className="flex-none flex items-center gap-3">
                 <div className="text-xs text-gray-400 font-mono text-right w-16 flex items-center justify-end gap-1">
                   {getWeight(item, slot.quantity)} <span className="text-[10px]">lbs</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <button 
                      onClick={() => onUpdateItem(slot.itemId, -1)}
                      className="text-gray-500 hover:text-white bg-gray-700 w-6 h-6 rounded flex items-center justify-center border border-gray-600 hover:bg-gray-600 transition-colors"
                    >-</button>
                    <span className="text-sm font-bold w-6 text-center">{slot.quantity}</span>
                    <button 
                      onClick={() => onUpdateItem(slot.itemId, 1)}
                      className="text-gray-500 hover:text-white bg-gray-700 w-6 h-6 rounded flex items-center justify-center border border-gray-600 hover:bg-gray-600 transition-colors"
                    >+</button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
