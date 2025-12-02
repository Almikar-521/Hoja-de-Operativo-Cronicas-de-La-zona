import React from 'react';
import { CONDITIONS_CATALOG } from '../constants';

interface Props {
  activeConditions: string[];
  onToggle: (id: string) => void;
}

export const ConditionsPanel: React.FC<Props> = ({ activeConditions, onToggle }) => {
  return (
    <div className="bg-gray-900 border border-rose-900 p-4 rounded-lg shadow-lg shadow-rose-900/10">
      <div className="flex justify-between items-center mb-3 border-b border-rose-800 pb-2">
        <h3 className="text-rose-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="text-xl">🩸</span> Trauma y Condiciones
        </h3>
        <span className="text-rose-400 font-mono text-sm font-bold">
            {activeConditions.length > 0 ? `${activeConditions.length} Activas` : 'Estado Óptimo'}
        </span>
      </div>

      {/* Buttons Grid */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CONDITIONS_CATALOG.map(c => {
            const active = activeConditions.includes(c.id);
            return (
                <button
                key={c.id}
                onClick={() => onToggle(c.id)}
                className={`text-[10px] px-2 py-1.5 rounded border transition-all font-bold uppercase ${
                    active 
                    ? 'bg-rose-900 text-white border-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.4)]' 
                    : 'bg-gray-800 text-gray-500 border-gray-700 hover:border-gray-500 hover:text-gray-300'
                }`}
                >
                    {c.name}
                </button>
            )
        })}
      </div>

      {/* Description Box */}
      <div className="bg-black/40 p-3 rounded border border-rose-900/50 space-y-3 min-h-[60px] flex flex-col justify-center">
        {activeConditions.length === 0 ? (
            <p className="text-gray-500 text-xs italic text-center">El sujeto no presenta traumas físicos ni condiciones adversas.</p>
        ) : (
            activeConditions.map(cId => {
                const cond = CONDITIONS_CATALOG.find(c => c.id === cId);
                if (!cond) return null;
                return (
                    <div key={cId} className="border-l-2 border-rose-600 pl-2">
                        <div className="flex justify-between items-baseline">
                             <p className="text-rose-200 font-bold text-xs uppercase">{cond.name}</p>
                             <button onClick={() => onToggle(cId)} className="text-[9px] text-rose-500 hover:text-rose-300 underline">CURAR</button>
                        </div>
                        <p className="text-rose-400 text-[10px] italic">{cond.effect}</p>
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};