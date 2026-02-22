import React from 'react';
import { CharacterState } from '../types';
import { ARMOR_CATALOG, ITEMS_CATALOG } from '../constants';

interface Props {
  char: CharacterState;
  onEquipArtifact: (slotIndex: number, itemId: string) => void;
  onUnequipArtifact: (slotIndex: number) => void;
}

export const ArtifactSlots: React.FC<Props> = ({ char, onEquipArtifact, onUnequipArtifact }) => {
  const armor = ARMOR_CATALOG.find(a => a.id === char.equipment.body);
  const maxSlots = armor ? armor.ra : 0;

  // Helper: Count how many times an item is equipped across all artifact slots
  const countEquippedInstances = (itemId: string) => {
    return char.equippedArtifacts.filter(id => id === itemId).length;
  };

  const handleSlotClick = (index: number) => {
    // If occupied, unequip
    if (char.equippedArtifacts[index]) {
      onUnequipArtifact(index);
      return;
    }
    // Logic to open selection modal would be here, for now using a simple prompt for demo or needs complex UI
    // To keep it simple in this iteration without extra state, we will render a select box inside the slot if empty
  };

  return (
    <div className="bg-gray-900 border border-blue-900 p-4 rounded-lg mt-6">
      <div className="flex justify-between items-center border-b border-blue-800 pb-2 mb-4">
        <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest">Sincronización de Artefactos</h3>
        <span className="text-xs text-blue-300">RA Disponible: {maxSlots}</span>
      </div>

      {maxSlots === 0 ? (
        <div className="text-gray-500 text-xs italic text-center p-4">
          Tu blindaje actual no tiene ranuras de contención para artefactos.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: maxSlots }).map((_, index) => {
            const equippedId = char.equippedArtifacts[index];
            const item = equippedId ? ITEMS_CATALOG.find(i => i.id === equippedId) : null;

            // Filter options: Show item if it's in this slot OR if we have spare copies in inventory
            const availableOptions = char.inventory.reduce((acc, slot) => {
              const catalogItem = ITEMS_CATALOG.find(i => i.id === slot.itemId);
              if (!catalogItem || catalogItem.type !== 'Artifact') return acc;

              const isEquippedInThisSlot = slot.itemId === equippedId;
              const equippedCount = countEquippedInstances(slot.itemId);

              if (isEquippedInThisSlot || slot.quantity > equippedCount) {
                acc.push(catalogItem);
              }
              return acc;
            }, [] as any[]);

            return (
              <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded border border-blue-900/30">
                <div className="flex-none w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 font-mono">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <select
                    className="w-full bg-transparent text-sm text-blue-200 outline-none"
                    value={equippedId || ''}
                    onChange={(e) => {
                      if (e.target.value === '') onUnequipArtifact(index);
                      else onEquipArtifact(index, e.target.value);
                    }}
                  >
                    <option value="">-- Vacío --</option>
                    {availableOptions.map(art => (
                      <option key={art!.id} value={art!.id}>
                        {art!.name} (Tier {art!.tier})
                      </option>
                    ))}
                  </select>
                </div>
                {item && (
                  <div className="text-[10px] text-gray-400 italic max-w-[150px] truncate">
                    {item.effect}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};