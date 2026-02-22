
import React, { useState } from 'react';
import { Talent, Trait, Mutation } from '../types';
import { TALENTS_CATALOG, TRAITS_CATALOG, MUTATIONS_CATALOG } from '../constants';

interface Props {
  activeTalents: string[];
  activeTraits: string[];
  activeMutations: string[];
  onToggleTalent: (id: string) => void;
  onToggleTrait: (id: string) => void;
  onToggleMutation: (id: string) => void;
  onOpenStore: () => void;
  onOpenMutationStore: () => void;
  onOpenTraitStore: () => void;
}

export const TalentsPanel: React.FC<Props> = ({ activeTalents, activeTraits, activeMutations, onToggleTalent, onToggleTrait, onToggleMutation, onOpenStore, onOpenMutationStore, onOpenTraitStore }) => {
  
  // Separate actual traits from background traits
  const activeBackgroundTrait = TRAITS_CATALOG.find(t => t.type === 'Background' && activeTraits.includes(t.id));
  const activeAdditionalTraits = TRAITS_CATALOG.filter(t => t.type !== 'Background' && activeTraits.includes(t.id));

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
          <h3 className="text-yellow-500 font-bold">GENÉTICA Y RASGOS</h3>
          <button 
            onClick={onOpenStore}
            className="text-xs bg-purple-900 hover:bg-purple-800 text-purple-200 px-3 py-1 rounded border border-purple-700 transition-colors flex items-center gap-1"
          >
            <span>🧬</span> Tienda de Evolución
          </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Talents Section */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase mb-2 text-blue-400">Talentos Activos</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {activeTalents.length === 0 && <span className="text-xs text-gray-600 italic">Sin talentos adquiridos.</span>}
            {TALENTS_CATALOG.filter(t => activeTalents.includes(t.id)).map(talent => (
                <div 
                  key={talent.id} 
                  className="bg-blue-900/20 border border-blue-500/50 p-2 rounded"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-blue-300">{talent.name}</span>
                    <span className="text-[10px] text-gray-500">T{talent.tier}</span>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">{talent.benefit}</div>
                </div>
            ))}
          </div>

          {/* Mutations Section (Simplified Logic - Button Only) */}
          <div className="mt-6 border-t border-gray-800 pt-4">
               <div className="flex justify-between items-center mb-2">
                   <h4 className="text-white text-xs font-bold uppercase text-pink-400">Mutaciones</h4>
                   <button 
                    onClick={onOpenMutationStore}
                    className="text-[10px] px-2 py-1 rounded border bg-pink-900 hover:bg-pink-800 text-white border-pink-700 transition-colors"
                   >
                       + Catálogo de Mutaciones
                   </button>
               </div>
               
               <div className="space-y-2">
                   {activeMutations.length === 0 && <span className="text-xs text-gray-600 italic">ADN Estable (Sin mutaciones).</span>}
                   {MUTATIONS_CATALOG.filter(m => activeMutations.includes(m.id)).map(mut => (
                       <div key={mut.id} className="bg-pink-950/10 border border-pink-800/30 p-2 rounded relative group hover:bg-pink-950/20 transition-colors">
                           <button 
                            onClick={() => onToggleMutation(mut.id)}
                            className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 font-bold text-xs px-1 hover:bg-red-900/20 rounded"
                            title="Eliminar Mutación"
                           >✕</button>
                           <div className="text-sm font-bold text-pink-500/90 flex items-center gap-2">
                               {mut.name}
                           </div>
                           <div className="grid grid-cols-1 gap-0.5 mt-1">
                                <div className="text-[10px] text-gray-400 flex gap-1">
                                    <span className="text-green-600 font-bold">+</span> {mut.effect}
                                </div>
                                {mut.downside && (
                                    <div className="text-[10px] text-gray-500 flex gap-1">
                                        <span className="text-red-600 font-bold">-</span> {mut.downside}
                                    </div>
                                )}
                           </div>
                       </div>
                   ))}
               </div>
          </div>
        </div>

        {/* Traits Section */}
        <div className="flex flex-col gap-4">
          
          {/* Active Background Display */}
          <div>
              <h4 className="text-white text-xs font-bold uppercase mb-2 text-yellow-600">Trasfondo Activo</h4>
              {activeBackgroundTrait ? (
                <div className="bg-yellow-900/10 border border-yellow-700/50 p-2 rounded">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-yellow-200">{activeBackgroundTrait.name}</span>
                        <span className="text-[10px] px-1 rounded bg-yellow-900 text-yellow-500">Background</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 italic">{activeBackgroundTrait.description}</div>
                    <div className="text-xs text-gray-300 mt-1">{activeBackgroundTrait.effect}</div>
                </div>
              ) : (
                  <div className="text-xs text-gray-500 italic">Selecciona un trasfondo en los datos del personaje.</div>
              )}
          </div>

          {/* Additional Traits Manager */}
          <div className="border-t border-gray-800 pt-4">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h4 className="text-white text-xs font-bold uppercase text-purple-400">Rasgos Adicionales</h4>
                    <span className="text-[9px] text-gray-500 italic block">Negativo = +1000 EA</span>
                </div>
                <button 
                onClick={onOpenTraitStore}
                className="text-[10px] bg-purple-900 hover:bg-purple-800 text-white px-2 py-1 rounded border border-purple-700 transition-colors"
                >
                    + Catálogo de Rasgos
                </button>
            </div>
            
            {/* Active Traits List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {activeAdditionalTraits.length === 0 && <span className="text-xs text-gray-600 italic">Sin rasgos adicionales.</span>}
                {activeAdditionalTraits.map(trait => (
                    <div 
                    key={trait.id} 
                    className={`border p-2 rounded relative group ${
                        trait.type === 'Negative' 
                        ? 'bg-red-900/10 border-red-900/50' 
                        : 'bg-green-900/10 border-green-900/50'
                    }`}
                    >
                        <button 
                            onClick={() => onToggleTrait(trait.id)}
                            className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 font-bold text-xs hover:bg-red-900/20 px-1 rounded"
                        >✕</button>
                        <div className="flex justify-between items-start pr-4">
                            <span className={`text-sm font-bold ${trait.type === 'Negative' ? 'text-red-300' : 'text-green-300'}`}>{trait.name}</span>
                            <div className="flex items-center gap-1">
                                {trait.type === 'Negative' && <span className="text-[9px] text-gray-400 font-mono">+1000 EA</span>}
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 italic">{trait.description}</div>
                        <div className="text-xs text-gray-300 mt-1">{trait.effect}</div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
