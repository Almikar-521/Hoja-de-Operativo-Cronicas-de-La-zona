
import React from 'react';
import { CharacterState, Weapon, Armor } from '../types';
import { WEAPONS_CATALOG, ARMOR_CATALOG, HEAD_CATALOG, FACE_CATALOG, EYES_CATALOG, EARS_CATALOG, RIG_CATALOG, BACKPACK_CATALOG } from '../constants';

interface Props {
  char: CharacterState;
  updateEquipment: (slot: keyof CharacterState['equipment'], value: string) => void;
}

export const PaperDoll: React.FC<Props> = ({ char, updateEquipment }) => {
  
  const getArmorRa = (id: string | null) => {
      const armor = ARMOR_CATALOG.find(a => a.id === id);
      return armor ? armor.ra : 0;
  }

  const currentRA = getArmorRa(char.equipment.body);

  // Helper to filter catalogs based on what is in the inventory OR already equipped
  const getOwnedItems = (fullCatalog: any[], slotId: string | null) => {
      return fullCatalog.filter(item => {
          const inInventory = char.inventory.some(inv => inv.itemId === item.id);
          const isEquipped = item.id === slotId;
          return inInventory || isEquipped;
      });
  };

  const renderSelect = (slot: keyof CharacterState['equipment'], fullCatalog: any[], label: string) => {
    // We filter the full catalog to show ONLY owned items
    const ownedOptions = getOwnedItems(fullCatalog, char.equipment[slot]);

    return (
        <div className="mb-2">
        <label className="block text-xs text-gray-400 uppercase mb-1">{label}</label>
        <select 
            value={char.equipment[slot] || ''} 
            onChange={(e) => updateEquipment(slot, e.target.value)}
            className="w-full bg-gray-800 text-sm text-white border border-gray-700 rounded p-1 focus:border-yellow-500 outline-none"
        >
            <option value="">-- Vacío --</option>
            {ownedOptions.length === 0 && char.equipment[slot] === null ? (
                <option disabled>Sin equipo disponible</option>
            ) : (
                ownedOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))
            )}
        </select>
        </div>
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <h3 className="text-yellow-500 font-bold border-b border-gray-700 pb-2 mb-4">INVENTARIO TÁCTICO</h3>
      <p className="text-[10px] text-gray-500 mb-4 italic">Solo puedes equipar objetos que tengas en tu inventario (Mochila).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Head & Senses */}
        <div>
          <h4 className="text-white text-sm font-bold mb-2 bg-gray-800 px-2 py-1 rounded">CABEZA Y SENTIDOS</h4>
          {renderSelect('head', HEAD_CATALOG, 'CABEZA (Casco)')}
          {renderSelect('face', FACE_CATALOG, 'CARA (Máscara)')}
          {renderSelect('eyes', EYES_CATALOG, 'OJOS (Gafas/Visor)')}
          {renderSelect('ears', EARS_CATALOG, 'OÍDOS (Auricular)')}
        </div>

        {/* Torso & Protection - STRICT MODE */}
        <div>
          <h4 className="text-white text-sm font-bold mb-2 bg-gray-800 px-2 py-1 rounded">TORSO Y PROTECCIÓN</h4>
          {renderSelect('body', ARMOR_CATALOG, 'BLINDAJE (Armadura)')}
          {currentRA > 0 && (
              <div className="text-xs text-blue-400 font-mono mb-2 text-right">
                  Ranuras Artefacto (RA): {currentRA}
              </div>
          )}
          {renderSelect('rig', RIG_CATALOG, 'RIG (Chaleco Táctico)')}
          {renderSelect('backpack', BACKPACK_CATALOG, 'ESPALDA (Mochila)')}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-white text-sm font-bold mb-2 bg-gray-800 px-2 py-1 rounded">ARMAMENTO ACTIVO</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderSelect('weaponPrimary', WEAPONS_CATALOG.filter(w => w.type !== 'Pistola' && w.type !== 'Melee'), 'PRIMARIA')}
          {renderSelect('weaponSecondary', WEAPONS_CATALOG.filter(w => w.type === 'Pistola' || w.type === 'Subfusil'), 'SECUNDARIA')}
          {renderSelect('weaponMelee', WEAPONS_CATALOG.filter(w => w.type === 'Melee'), 'MELEE')}
        </div>
      </div>
    </div>
  );
};
