
import React, { useState } from 'react';
import { Talent, Trait } from '../types';
import { TALENTS_CATALOG, TRAITS_CATALOG, MUTATIONS_CATALOG } from '../constants';

interface Props {
  activeTalents: string[];
  activeTraits: string[];
  activeMutations: string[];
  onToggleTalent: (id: string) => void;
  onToggleTrait: (id: string) => void;
  onToggleMutation: (id: string) => void;
  onOpenStore: () => void;
}

export const TalentsPanel: React.FC<Props> = ({ activeTalents, activeTraits, activeMutations, onToggleTalent, onToggleTrait, onToggleMutation, onOpenStore }) => {
  const [showAddMutation, setShowAddMutation] = useState(false);
  const [showAddTrait, setShowAddTrait] = useState(false);
  
  // Separate actual traits from background traits (which are handled in App header now, but we display the active one here)
  const activeBackgroundTrait = TRAITS_CATALOG.find(t => t.type === 'Background' && activeTraits.includes(t.id));
  
  // Active additional traits (excluding background)
  const activeAdditionalTraits = TRAITS_CATALOG.filter(t => t.type !== 'Background' && activeTraits.includes(t.id));
  
  // Available traits to add (excluding background and already active ones)
  const availableTraits = TRAITS_CATALOG.filter(t => t.type !== 'Background' && !activeTraits.includes(t.id));

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
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
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

          {/* Mutations Section (New) */}
          <div className="mt-6 border-t border-gray-800 pt-4">
               <div className="flex justify-between items-center mb-2">
                   <h4 className="text-white text-xs font-bold uppercase text-pink-400">Mutaciones</h4>
                   <button 
                    onClick={() => setShowAddMutation(!showAddMutation)}
                    className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700 hover:bg-gray-700 hover:text-white"
                   >
                       {showAddMutation ? 'Cancelar' : '+ Agregar'}
                   </button>
               </div>
               
               {/* Mutation Selector */}
               {showAddMutation && (
                   <div className="bg-gray-800 p-2 rounded mb-2 border border-pink-900/50">
                       <p className="text-[10px] text-gray-500 mb-2">Selecciona una mutación adquirida:</p>
                       <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
                           {MUTATIONS_CATALOG.filter(m => !activeMutations.includes(m.id)).map(mut => (
                               <button 
                                key={mut.id}
                                onClick={() => { onToggleMutation(mut.id); setShowAddMutation(false); }}
                                className="text-left text-xs text-pink-300 hover:bg-pink-900/20 px-2 py-1 rounded transition-colors truncate"
                               >
                                   {mut.name}
                               </button>
                           ))}
                       </div>
                   </div>
               )}

               <div className="space-y-2">
                   {activeMutations.length === 0 && <span className="text-xs text-gray-600 italic">ADN Estable (Sin mutaciones).</span>}
                   {MUTATIONS_CATALOG.filter(m => activeMutations.includes(m.id)).map(mut => (
                       <div key={mut.id} className="bg-pink-950/20 border border-pink-700/50 p-2 rounded relative group">
                           <button 
                            onClick={() => onToggleMutation(mut.id)}
                            className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 font-bold"
                           >x</button>
                           <div className="text-sm font-bold text-pink-400 flex items-center gap-2">
                               {mut.name}
                               <span className="text-[9px] bg-black/30 px-1 rounded text-gray-500 uppercase">{mut.type}</span>
                           </div>
                           <div className="text-xs text-gray-300 mt-1"><span className="text-green-400 font-bold">+</span> {mut.effect}</div>
                           <div className="text-xs text-red-300 mt-0.5"><span className="text-red-500 font-bold">-</span> {mut.downside}</div>
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
                onClick={() => setShowAddTrait(!showAddTrait)}
                className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700 hover:bg-gray-700 hover:text-white"
                >
                    {showAddTrait ? 'Cancelar' : '+ Agregar'}
                </button>
            </div>
            
            {/* Trait Selector */}
            {showAddTrait && (
                <div className="bg-gray-800 p-2 rounded mb-2 border border-purple-900/50">
                    <p className="text-[10px] text-gray-500 mb-2">Selecciona un rasgo:</p>
                    <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
                        {availableTraits.map(trait => (
                            <button 
                            key={trait.id}
                            onClick={() => { onToggleTrait(trait.id); setShowAddTrait(false); }}
                            className="text-left text-xs text-purple-300 hover:bg-purple-900/20 px-2 py-1 rounded transition-colors flex justify-between items-center"
                            >
                                <span>{trait.name}</span>
                                <span className={`text-[9px] px-1 rounded ${trait.type === 'Negative' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>{trait.type}</span>
                            </button>
                        ))}
                        {availableTraits.length === 0 && <span className="text-xs text-gray-500 italic px-2">No hay rasgos disponibles.</span>}
                    </div>
                </div>
            )}

            {/* Active Traits List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {activeAdditionalTraits.length === 0 && <span className="text-xs text-gray-600 italic">Sin rasgos adicionales.</span>}
                {activeAdditionalTraits.map(trait => (
                    <div 
                    key={trait.id} 
                    className="bg-purple-900/20 border border-purple-500/50 p-2 rounded relative group"
                    >
                        <button 
                            onClick={() => onToggleTrait(trait.id)}
                            className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 font-bold"
                        >x</button>
                        <div className="flex justify-between items-start pr-4">
                            <span className="text-sm font-bold text-purple-300">{trait.name}</span>
                            <div className="flex items-center gap-1">
                                {trait.type === 'Negative' && <span className="text-[9px] text-green-400 font-mono">+1000 EA</span>}
                                <span className={`text-[9px] px-1 rounded ${trait.type === 'Negative' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>{trait.type}</span>
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
