import React from 'react';
import { CharacterState } from '../types';
import { CLASSES, TRAITS_CATALOG } from '../constants';

interface Props {
  char: CharacterState;
  onChange: (updates: Partial<CharacterState>) => void;
  onChangeBackground: (bgId: string) => void;
}

export const IdentityPanel: React.FC<Props> = ({ char, onChange, onChangeBackground }) => {
  return (
    <div className="bg-gray-900 border border-cyan-900/50 p-4 rounded-lg shadow-lg relative overflow-hidden group">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
            <svg className="w-16 h-16 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884-.5 2-2 2h4c-1.5 0-2-1.116-2-2z" /></svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
            
            {/* Class Selector */}
            <div className="md:col-span-3">
                <label className="block text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-1">Clase Operativa</label>
                <select 
                    value={char.class} 
                    onChange={e => onChange({ class: e.target.value as any })}
                    className="w-full bg-gray-950 text-white font-bold rounded border border-gray-700 p-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all uppercase"
                >
                    <option value="" disabled>SELECCIONAR CLASE</option>
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Background Selector */}
            <div className="md:col-span-4">
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Trasfondo</label>
                <select 
                    value={char.background} 
                    onChange={e => onChangeBackground(e.target.value)}
                    className="w-full bg-gray-950 text-gray-300 rounded border border-gray-700 p-2 focus:border-yellow-600 outline-none transition-all truncate"
                >
                    <option value="" disabled>SELECCIONAR TRASFONDO</option>
                    {TRAITS_CATALOG.filter(t => t.type === 'Background').map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            {/* Stats Grid (Level, XP, Gold, Essence) */}
            <div className="md:col-span-5 grid grid-cols-4 gap-2">
                
                {/* Level */}
                <div className="bg-gray-950 border border-gray-800 rounded p-1 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-gray-500 font-bold uppercase">NIVEL</span>
                    <input 
                        type="number" 
                        value={char.level} 
                        onChange={(e) => onChange({ level: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-full bg-transparent text-center text-white font-bold text-lg outline-none"
                    />
                </div>

                {/* XP */}
                <div className="bg-gray-950 border border-gray-800 rounded p-1 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-gray-500 font-bold uppercase">EXP</span>
                    <input 
                        type="number" 
                        value={char.xp} 
                        onChange={(e) => onChange({ xp: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-full bg-transparent text-center text-gray-300 font-mono text-sm outline-none"
                    />
                </div>

                {/* Gold */}
                <div className="bg-yellow-900/10 border border-yellow-900/30 rounded p-1 flex flex-col items-center justify-center hover:bg-yellow-900/20 transition-colors">
                    <span className="text-[9px] text-yellow-600 font-bold uppercase">ORO</span>
                    <input 
                        type="number" 
                        value={char.gold}
                        onChange={(e) => onChange({ gold: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-full bg-transparent text-center text-yellow-500 font-mono font-bold text-sm outline-none"
                    />
                </div>

                {/* Essence */}
                <div className="bg-purple-900/10 border border-purple-900/30 rounded p-1 flex flex-col items-center justify-center hover:bg-purple-900/20 transition-colors">
                    <span className="text-[9px] text-purple-500 font-bold uppercase">EA</span>
                    <input 
                        type="number" 
                        value={char.anomalousEssence}
                        onChange={(e) => onChange({ anomalousEssence: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-full bg-transparent text-center text-purple-400 font-mono font-bold text-sm outline-none"
                    />
                </div>

            </div>

            {/* Second Row: Player Name & Notes */}
            <div className="md:col-span-12 mt-2 grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-gray-800/50">
                <div className="md:col-span-3">
                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Jugador / Alias</label>
                     <input 
                        value={char.player}
                        onChange={e => onChange({ player: e.target.value })}
                        className="w-full bg-gray-950 text-gray-300 rounded border border-gray-700 p-2 text-sm focus:border-cyan-500 outline-none placeholder-gray-700"
                        placeholder="Tu Nombre"
                     />
                </div>
                <div className="md:col-span-9">
                     <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Notas de Servicio / Biografía</label>
                     <textarea 
                        value={char.notes}
                        onChange={e => onChange({ notes: e.target.value })}
                        className="w-full bg-gray-950 text-gray-300 rounded border border-gray-700 p-2 text-sm focus:border-cyan-500 outline-none placeholder-gray-700 h-10 min-h-[40px] focus:h-24 transition-all resize-none"
                        placeholder="Historial operativo, misiones completadas, cicatrices..."
                     />
                </div>
            </div>
        </div>
    </div>
  );
};