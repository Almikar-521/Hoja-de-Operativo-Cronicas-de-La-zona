
import React from 'react';
import { EXHAUSTION_EFFECTS } from '../constants';

interface Props {
  level: number;
  onChange: (val: number) => void;
}

export const ExhaustionPanel: React.FC<Props> = ({ level, onChange }) => {
  return (
    <div className="bg-gray-900 border border-orange-900 p-4 rounded-lg mt-4 shadow-lg shadow-orange-900/10">
      <div className="flex justify-between items-center mb-3 border-b border-orange-800 pb-2">
        <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="text-xl">😫</span> Fatiga (Agotamiento)
        </h3>
        <span className="text-orange-400 font-mono text-xl font-bold">{level} / 6</span>
      </div>

      <div className="flex gap-1 mb-4 h-4">
        {[1, 2, 3, 4, 5, 6].map((lvl) => (
          <div
            key={lvl}
            onClick={() => onChange(lvl === level ? lvl - 1 : lvl)}
            className={`flex-1 rounded cursor-pointer transition-all border border-gray-800 ${
              lvl <= level 
                ? 'bg-gradient-to-t from-orange-800 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          ></div>
        ))}
      </div>

      <div className="bg-black/40 p-3 rounded border border-orange-900/50 space-y-2">
        {level === 0 ? (
            <p className="text-gray-500 text-xs italic">{EXHAUSTION_EFFECTS[0].desc}</p>
        ) : (
            EXHAUSTION_EFFECTS.slice(1, level + 1).map((effect, idx) => (
                <div key={idx} className="border-l-2 border-orange-800 pl-2">
                    <p className="text-orange-200 font-bold text-xs">{effect.desc}</p>
                    <p className="text-orange-400 text-[10px] italic">{effect.effect}</p>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
