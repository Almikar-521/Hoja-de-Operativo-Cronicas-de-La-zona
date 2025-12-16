
import React, { useState } from 'react';
import { CharacterState } from '../types';
import { TRAITS_CATALOG } from '../constants';

interface Props {
  char: CharacterState;
  onToggleTrait: (id: string) => void;
  onClose: () => void;
}

export const TraitStore: React.FC<Props> = ({ char, onToggleTrait, onClose }) => {
  const [activeTab, setActiveTab] = useState<'Positive' | 'Negative'>('Positive');

  // Filter out Background traits, we only want selectable traits here
  const traits = TRAITS_CATALOG.filter(t => t.type === activeTab);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-gray-900 border border-purple-600 rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl shadow-purple-900/30 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-950 flex-none">
          <div className="flex items-center gap-3">
            <div className="bg-purple-900/20 p-2 rounded-full border border-purple-500/50">
                <span className="text-2xl">🎭</span>
            </div>
            <div>
                <h2 className="text-xl font-bold text-purple-500 uppercase tracking-widest leading-none">Rasgos de Personalidad</h2>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">Peculiaridades, traumas y ventajas naturales</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
              <div className="text-right hidden sm:block">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Saldo EA</span>
                  <span className="text-purple-400 font-bold text-xs font-mono">
                      {char.anomalousEssence} EA
                  </span>
              </div>
              <button onClick={onClose} className="bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 px-4 py-2 rounded uppercase text-xs font-bold transition-colors">
                  CERRAR
              </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-900 flex-none">
            <button 
                onClick={() => setActiveTab('Positive')}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-all ${
                    activeTab === 'Positive' 
                    ? 'bg-gray-800 text-green-400 border-b-2 border-green-500' 
                    : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                }`}
            >
                Rasgos Positivos (Ventajas)
            </button>
            <button 
                onClick={() => setActiveTab('Negative')}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-all ${
                    activeTab === 'Negative' 
                    ? 'bg-gray-800 text-red-400 border-b-2 border-red-500' 
                    : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                }`}
            >
                Rasgos Negativos (Traumas)
            </button>
        </div>

        {/* Info Banner for Negative Traits */}
        {activeTab === 'Negative' && (
            <div className="bg-red-900/20 p-2 text-center border-b border-red-900/30">
                <span className="text-xs text-red-300 font-bold">
                    ⚠️ Seleccionar un Rasgo Negativo otorga inmediatamente <span className="text-white bg-red-900 px-1 rounded">+1000 EA</span> para gastar en Talentos.
                </span>
            </div>
        )}

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-950/80 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {traits.map(trait => {
                    const isActive = char.traits.includes(trait.id);
                    const isNegative = trait.type === 'Negative';
                    
                    return (
                        <div 
                            key={trait.id} 
                            className={`relative border rounded-lg p-4 flex flex-col justify-between transition-all group ${
                                isActive 
                                ? (isNegative ? 'bg-red-900/10 border-red-500' : 'bg-green-900/10 border-green-500') + ' shadow-[0_0_15px_rgba(0,0,0,0.3)]'
                                : 'bg-gray-900 border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-bold text-sm ${isActive ? (isNegative ? 'text-red-300' : 'text-green-300') : 'text-gray-200'}`}>{trait.name}</h3>
                                    {isNegative && (
                                        <span className="text-[9px] bg-red-900 text-white px-1.5 py-0.5 rounded font-mono font-bold border border-red-700">
                                            +1000 EA
                                        </span>
                                    )}
                                </div>
                                
                                <div className="space-y-2 mt-3">
                                    <p className="text-xs text-gray-400 italic min-h-[32px]">{trait.description}</p>
                                    
                                    <div className={`p-2 rounded border ${isNegative ? 'bg-black/30 border-red-900/30' : 'bg-black/30 border-green-900/30'}`}>
                                        <div className={`text-[10px] font-bold uppercase mb-0.5 ${isNegative ? 'text-red-500' : 'text-green-500'}`}>Efecto</div>
                                        <div className="text-xs text-gray-300 leading-tight">{trait.effect}</div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => onToggleTrait(trait.id)}
                                className={`mt-4 w-full py-2 text-xs font-bold uppercase rounded transition-colors shadow-lg ${
                                    isActive
                                    ? 'bg-gray-800 text-gray-400 border border-gray-600 hover:bg-red-900/20 hover:text-red-400 hover:border-red-900'
                                    : isNegative 
                                        ? 'bg-red-900/80 text-white hover:bg-red-800 border border-red-700 shadow-red-900/20'
                                        : 'bg-green-700 text-white hover:bg-green-600 border border-green-500 shadow-green-900/20'
                                }`}
                            >
                                {isActive ? 'Eliminar Rasgo' : (isNegative ? 'Aceptar Trauma (+1000 EA)' : 'Adquirir Rasgo')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
};
