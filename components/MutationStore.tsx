
import React from 'react';
import { CharacterState, Mutation } from '../types';
import { MUTATIONS_CATALOG } from '../constants';

interface Props {
  char: CharacterState;
  onToggleMutation: (id: string) => void;
  onClose: () => void;
}

export const MutationStore: React.FC<Props> = ({ char, onToggleMutation, onClose }) => {
  
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-gray-900 border border-pink-600 rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl shadow-pink-900/30 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-950 flex-none">
          <div className="flex items-center gap-3">
            <div className="bg-pink-900/20 p-2 rounded-full border border-pink-500/50">
                <span className="text-2xl">🧬</span>
            </div>
            <div>
                <h2 className="text-xl font-bold text-pink-500 uppercase tracking-widest leading-none">Catálogo Genético</h2>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">Modificaciones de ADN y Anomalías Corpóreas</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
              <div className="text-right hidden sm:block">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Estado del Sujeto</span>
                  <span className="text-pink-400 font-bold text-xs">
                      {char.mutations.length > 0 ? `${char.mutations.length} MUTACIONES ACTIVAS` : 'ADN ESTABLE'}
                  </span>
              </div>
              <button onClick={onClose} className="bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 px-4 py-2 rounded uppercase text-xs font-bold transition-colors">
                  CERRAR
              </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-950/80 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MUTATIONS_CATALOG.map(mut => {
                    const isActive = char.mutations.includes(mut.id);
                    
                    return (
                        <div 
                            key={mut.id} 
                            className={`relative border rounded-lg p-4 flex flex-col justify-between transition-all group ${
                                isActive 
                                ? 'bg-pink-900/10 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)]' 
                                : 'bg-gray-900 border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-bold text-sm ${isActive ? 'text-pink-300' : 'text-gray-200'}`}>{mut.name}</h3>
                                    <span className="text-[9px] uppercase border border-gray-700 bg-gray-950 text-gray-500 px-1.5 py-0.5 rounded">
                                        {mut.type}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 mt-3">
                                    <div className="bg-black/30 p-2 rounded border border-gray-800/50">
                                        <div className="text-[10px] text-green-500 font-bold uppercase mb-0.5">Beneficio</div>
                                        <div className="text-xs text-gray-300 leading-tight">{mut.effect}</div>
                                    </div>
                                    
                                    {mut.downside && (
                                        <div className="bg-black/30 p-2 rounded border border-red-900/30">
                                            <div className="text-[10px] text-red-500 font-bold uppercase mb-0.5">Efecto Adverso</div>
                                            <div className="text-xs text-gray-400 italic leading-tight">{mut.downside}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button 
                                onClick={() => onToggleMutation(mut.id)}
                                className={`mt-4 w-full py-2 text-xs font-bold uppercase rounded transition-colors shadow-lg ${
                                    isActive
                                    ? 'bg-red-900/20 text-red-400 border border-red-900 hover:bg-red-900/40'
                                    : 'bg-pink-700 text-white hover:bg-pink-600 shadow-pink-900/20'
                                }`}
                            >
                                {isActive ? 'Purgar Mutación' : 'Inyectar Mutágeno'}
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
