
import React from 'react';
import { Attribute } from '../types';
import { getModifier, formatModifier } from '../utils';

interface Props {
  label: string;
  attr: Attribute;
  value: number;
  proficient: boolean;
  pb: number; // Proficiency Bonus
  extraSaveMod?: number; // New prop for things like mutations
  onChange: (val: number) => void;
  onToggleProf: () => void;
}

export const StatBox: React.FC<Props> = ({ label, attr, value, proficient, pb, extraSaveMod = 0, onChange, onToggleProf }) => {
  const mod = getModifier(value);
  const save = mod + (proficient ? pb : 0) + extraSaveMod;

  return (
    <div className="flex flex-col border border-gray-600 rounded bg-gray-900 p-2 h-24 justify-between relative overflow-hidden group hover:border-gray-500 transition-colors shadow-sm">
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{label.substring(0, 3)}</div>
        <div
          onClick={onToggleProf}
          className={`w-3 h-3 rounded-full border cursor-pointer ${proficient ? 'bg-yellow-500 border-yellow-500 shadow-sm shadow-yellow-500/50' : 'border-gray-600 bg-gray-800'}`}
          title="Competencia en Salvación"
        ></div>
      </div>

      <div className="flex items-end justify-between mt-1">
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white leading-none tracking-tighter">{formatModifier(value)}</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] text-gray-500 font-mono">BASE</span>
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(parseInt(e.target.value) || 0)}
              className="w-8 bg-transparent text-sm text-gray-300 font-bold font-mono focus:text-yellow-500 outline-none border-b border-transparent focus:border-yellow-500"
            />
          </div>
        </div>

        <div className="text-right">
          <span className="block text-[8px] text-gray-500 uppercase">Salvación</span>
          <span className={`font-mono text-lg font-bold flex flex-col items-end leading-none ${save >= 0 ? 'text-blue-300' : 'text-red-400'}`}>
            <span>{save >= 0 ? `+${save}` : save}</span>
            {proficient && (
              <span className="text-[9px] text-yellow-500 font-bold" title="Bono de Competencia incluido">
                (+{pb} PB)
              </span>
            )}
            {extraSaveMod !== 0 && (
              <span className={`text-[9px] ${extraSaveMod > 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({extraSaveMod > 0 ? '+' : ''}{extraSaveMod})
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
