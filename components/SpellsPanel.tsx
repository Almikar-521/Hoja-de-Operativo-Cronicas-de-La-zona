
import React, { useState } from 'react';
import { PROTOCOLS_CATALOG } from '../constants';
import { getModifier, calculateSpellSlots, calculateMaxCantrips } from '../utils';

interface Props {
  intScore: number;
  profBonus: number;
  level: number;
  preparedSpells: string[];
  onTogglePrepare: (id: string) => void;
}

export const SpellsPanel: React.FC<Props> = ({ intScore, profBonus, level, preparedSpells, onTogglePrepare }) => {
  const intMod = getModifier(intScore);
  const saveDC = 8 + profBonus + intMod;
  const attackMod = profBonus + intMod;
  
  // Logic: Max Spell Level available
  const maxSpellLevel = Math.min(9, Math.ceil(level / 2));
  const slots = calculateSpellSlots(level);
  
  // Cantrips (Level 0) Limits
  const maxCantrips = calculateMaxCantrips(level);

  const [activeLevel, setActiveLevel] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState(false);

  // Calculate limits based on ACTIVE TAB
  // If Level 0: Use maxCantrips
  // If Level > 0: Use the slot count for that level (slots array index is level - 1)
  const maxPreparedForLevel = activeLevel === 0 ? maxCantrips : (slots[activeLevel - 1] || 0);

  // Count currently prepared spells FOR THIS LEVEL only
  const equippedCountForLevel = preparedSpells.filter(id => {
      const s = PROTOCOLS_CATALOG.find(p => p.id === id);
      return s && s.level === activeLevel;
  }).length;

  // Filter spells: In edit mode show all for level. In view mode show only prepared.
  const spells = PROTOCOLS_CATALOG.filter(s => s.level === activeLevel);
  const visibleSpells = isEditMode 
    ? spells 
    : spells.filter(s => preparedSpells.includes(s.id));

  return (
    <div className="bg-gray-900 border border-blue-900 rounded-lg mt-6 shadow-lg shadow-blue-900/20 overflow-hidden flex flex-col h-[500px]">
      {/* Header Compacto */}
      <div className="bg-blue-950/50 p-3 border-b border-blue-900 flex justify-between items-center flex-none">
        <div>
           <h3 className="text-blue-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
               Grimorio Tecnológico 
               <button 
                onClick={() => setIsEditMode(!isEditMode)}
                className={`text-[10px] px-2 py-0.5 rounded border ${isEditMode ? 'bg-yellow-600 text-black border-yellow-500' : 'bg-blue-900 text-blue-200 border-blue-700'}`}
               >
                   {isEditMode ? 'GUARDAR PROTOCOLOS' : 'INSTALAR PROTOCOLOS'}
               </button>
           </h3>
           <div className="text-[10px] text-blue-300">Sincronización Neural V.9</div>
        </div>
        <div className="flex gap-3">
            <div className="text-center px-2 border-r border-blue-800">
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Salvación</span>
                <span className="text-white font-bold font-mono text-lg">{saveDC}</span>
            </div>
            <div className="text-center px-2">
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Ataque</span>
                <span className="text-white font-bold font-mono text-lg">+{attackMod}</span>
            </div>
        </div>
      </div>

      {/* Slots Tracker & Limits */}
      {!isEditMode && activeLevel > 0 && (
          <div className="bg-black/30 p-2 border-b border-blue-900/30 flex items-center justify-between">
              <span className="text-xs text-blue-400 font-bold uppercase mr-2">MEMORIA RAM (Slots Nv.{activeLevel})</span>
              <div className="flex gap-2">
                  {Array.from({length: slots[activeLevel - 1] || 0}).map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                          <input type="checkbox" className="w-4 h-4 accent-blue-500 bg-gray-800 border-gray-600 rounded" />
                      </div>
                  ))}
                  {(slots[activeLevel - 1] || 0) === 0 && <span className="text-xs text-gray-600">Sin slots disponibles</span>}
              </div>
          </div>
      )}
      
      {/* Preparation Limit Display (Edit Mode) */}
      {isEditMode && (
          <div className="bg-yellow-900/20 p-2 border-b border-yellow-900/30 flex items-center justify-center">
              <span className={`text-xs font-bold uppercase ${equippedCountForLevel >= maxPreparedForLevel ? 'text-red-400' : 'text-yellow-500'}`}>
                  Memoria Nv.{activeLevel}: {equippedCountForLevel} / {maxPreparedForLevel} Instalados
              </span>
          </div>
      )}

      {/* Tabs de Nivel (Scrollable) */}
      <div className="flex overflow-x-auto border-b border-blue-900/50 bg-gray-900 flex-none scrollbar-hide">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
             const locked = lvl > maxSpellLevel && lvl !== 0; 
             return (
                 <button
                    key={lvl}
                    onClick={() => !locked && setActiveLevel(lvl)}
                    disabled={locked}
                    className={`flex-none py-2 px-4 text-xs font-bold uppercase border-b-2 transition-colors whitespace-nowrap ${
                        activeLevel === lvl 
                            ? 'border-blue-500 text-blue-400 bg-blue-900/20' 
                            : locked 
                                ? 'border-transparent text-gray-700 cursor-not-allowed bg-gray-950' 
                                : 'border-transparent text-gray-400 hover:text-blue-200 hover:bg-gray-800'
                    }`}
                 >
                    {lvl === 0 ? 'NV 0' : `NV ${lvl}`}
                    {locked && <span className="ml-1 opacity-50">🔒</span>}
                 </button>
             )
        })}
      </div>

      {/* Lista de Protocolos */}
      <div className="p-2 space-y-2 overflow-y-auto bg-gray-950/50 flex-1">
        {visibleSpells.length === 0 ? (
            <div className="text-center text-gray-500 text-xs py-10 italic flex flex-col items-center justify-center h-full">
                {isEditMode ? 'No existen protocolos en este nivel.' : 'No hay protocolos instalados en esta ranura de memoria.'}
                {!isEditMode && (
                    <button onClick={() => setIsEditMode(true)} className="mt-2 text-blue-400 underline cursor-pointer">
                        {activeLevel === 0 ? `Instalar (Max ${maxCantrips})` : 'Preparar Protocolos'}
                    </button>
                )}
            </div>
        ) : (
            visibleSpells.map(spell => {
                const isPrepared = preparedSpells.includes(spell.id);
                // Disable checkbox if: It's NOT checked AND we are at Limit for THIS level
                const isDisabled = !isPrepared && equippedCountForLevel >= maxPreparedForLevel;

                return (
                <div key={spell.id} className={`group bg-gray-800 border rounded transition-all shadow-sm ${isPrepared && isEditMode ? 'border-green-500 bg-green-900/10' : 'border-gray-700/50 hover:border-blue-500/50'} ${isDisabled && isEditMode ? 'opacity-50' : ''}`}>
                    {/* Cabecera del hechizo */}
                    <div className="p-2 flex justify-between items-center border-b border-gray-700/30">
                        <div className="flex items-center gap-2">
                            {isEditMode && (
                                <input 
                                    type="checkbox" 
                                    checked={isPrepared} 
                                    disabled={isDisabled}
                                    onChange={() => onTogglePrepare(spell.id)}
                                    className={`w-4 h-4 cursor-pointer ${isDisabled ? 'cursor-not-allowed' : 'accent-green-500'}`}
                                />
                            )}
                            <span className={`font-bold text-sm ${isPrepared ? 'text-green-300' : 'text-blue-200'}`}>{spell.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 bg-gray-900 rounded text-gray-500 uppercase tracking-wider border border-gray-800">{spell.school}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono bg-black/20 px-2 py-0.5 rounded">{spell.castingTime} • {spell.range}</span>
                    </div>
                    
                    {/* Detalles */}
                    <div className="p-2 text-xs grid grid-cols-1 gap-1">
                         <div className="text-gray-400 italic opacity-80">{spell.description}</div>
                         <div className="text-blue-300 font-mono bg-blue-900/10 p-1.5 rounded border border-blue-900/20 mt-1 flex items-start">
                            <span className="text-blue-500 font-bold mr-1 mt-0.5">{">>"}</span> 
                            <span>{spell.effect}</span>
                         </div>
                    </div>
                </div>
            )})
        )}
      </div>
    </div>
  );
};
