
import React from 'react';
import { RADIATION_EFFECTS } from '../constants';

interface Props {
  level: number;
  onChange: (val: number) => void;
}

export const RadiationPanel: React.FC<Props> = ({ level, onChange }) => {
  return (
    <div className="bg-gray-900 border border-red-900 p-4 rounded-lg mt-4 shadow-lg shadow-red-900/10">
      <div className="flex justify-between items-center mb-3 border-b border-red-800 pb-2">
        <h3 className="text-red-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="text-xl">☢</span> Nivel de Radiación
        </h3>
        <span className="text-red-400 font-mono text-xl font-bold">{level} / 5</span>
      </div>

      <div className="flex gap-1 mb-4 h-4">
        {[1, 2, 3, 4, 5].map((lvl) => (
          <div
            key={lvl}
            onClick={() => onChange(lvl === level ? lvl - 1 : lvl)} // Toggle off if clicked
            className={`flex-1 rounded cursor-pointer transition-all border border-gray-800 ${
              lvl <= level 
                ? 'bg-gradient-to-t from-red-800 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          ></div>
        ))}
      </div>

      <div className="bg-black/40 p-3 rounded border border-red-900/50 space-y-2">
        {level === 0 ? (
            <p className="text-gray-500 text-xs italic">{RADIATION_EFFECTS[0].desc}</p>
        ) : (
            RADIATION_EFFECTS.slice(1, level + 1).map((effect, idx) => (
                <div key={idx} className="border-l-2 border-red-800 pl-2">
                    <p className="text-red-200 font-bold text-xs">{effect.desc}</p>
                    <p className="text-red-400 text-[10px] italic">{effect.effect}</p>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
