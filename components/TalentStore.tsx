
import React, { useState } from 'react';
import { Talent, CharacterState, Attribute } from '../types';
import { TALENTS_CATALOG, SKILLS_LIST } from '../constants';

interface Props {
  char: CharacterState;
  onBuyTalent: (talent: Talent, free: boolean) => void;
  onBuyAttribute: (attr: Attribute, free: boolean) => void;
  onBuySkill: (skillId: string, free: boolean) => void;
  onClose: () => void;
}

export const TalentStore: React.FC<Props> = ({ char, onBuyTalent, onBuyAttribute, onBuySkill, onClose }) => {
  const [activeTab, setActiveTab] = useState<'Talents' | 'Stats'>('Talents');
  const [activeTier, setActiveTier] = useState<1 | 2 | 3>(1);
  // Default to 'Tank' if no class selected so tabs show something
  const [activeClass, setActiveClass] = useState<string>(char.class || 'Tank');
  const [isGmMode, setIsGmMode] = useState(false);

  // Filter logic: Show General talents AND the selected activeClass talents
  const visibleTalents = TALENTS_CATALOG.filter(t => 
    t.tier === activeTier && (t.type === activeClass || t.type === 'General')
  );

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-yellow-600 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-yellow-900/20">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800 rounded-t-lg">
          <div>
            <h2 className="text-xl font-bold text-yellow-500 uppercase tracking-widest">Evolución Anómala</h2>
            <p className="text-xs text-gray-400">Gasta Esencia Anómala (EA) para mutar tu ADN.</p>
          </div>
          <div className="flex items-center gap-4">
            {/* GM Mode Toggle */}
             <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded border border-gray-700">
                <span className={`text-[10px] font-bold uppercase ${isGmMode ? 'text-cyan-400' : 'text-gray-500'}`}>Modo Narrativo (Forzar)</span>
                <div 
                    onClick={() => setIsGmMode(!isGmMode)}
                    className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${isGmMode ? 'bg-cyan-600' : 'bg-gray-700'}`}
                >
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isGmMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
            </div>

            <div className="text-right">
                <span className="block text-xs text-gray-500 uppercase">Saldo Actual</span>
                <span className="text-2xl font-mono text-purple-400 font-bold">{char.anomalousEssence} EA</span>
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-900">
            <button 
                onClick={() => setActiveTab('Talents')}
                className={`flex-1 py-3 font-bold uppercase text-sm ${activeTab === 'Talents' ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Talentos
            </button>
            <button 
                onClick={() => setActiveTab('Stats')}
                className={`flex-1 py-3 font-bold uppercase text-sm ${activeTab === 'Stats' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Atributos y Habilidades
            </button>
            <button onClick={onClose} className="px-6 py-3 text-red-500 hover:text-red-400 font-bold bg-gray-900">X</button>
        </div>

        {activeTab === 'Talents' ? (
            <>
                {/* Class Tabs */}
                <div className="flex border-b border-gray-700">
                {['Tank', 'DPS', 'Support'].map(c => (
                    <button 
                        key={c}
                        onClick={() => setActiveClass(c)}
                        className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${activeClass === c ? 'bg-gray-700 text-white border-b-2 border-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {c}
                    </button>
                ))}
                </div>

                {/* Tier Selector */}
                <div className="flex justify-center gap-4 p-4 bg-gray-950/50 border-b border-gray-800">
                    {[1, 2, 3].map(tier => (
                        <button
                            key={tier}
                            onClick={() => setActiveTier(tier as 1|2|3)}
                            className={`px-8 py-2 rounded-full border text-sm font-bold transition-all ${activeTier === tier ? 'bg-purple-900 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
                        >
                            TIER {tier}
                        </button>
                    ))}
                </div>

                {/* Talents Content */}
                <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleTalents.map(talent => {
                        const owned = char.talents.includes(talent.id);
                        const canAfford = char.anomalousEssence >= talent.cost;

                        return (
                            <div key={talent.id} className={`p-4 rounded border flex flex-col justify-between ${owned ? 'bg-green-900/20 border-green-700' : 'bg-gray-800 border-gray-700'}`}>
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`font-bold ${owned ? 'text-green-400' : 'text-white'}`}>{talent.name}</h3>
                                        <span className="text-xs px-2 py-1 bg-gray-900 rounded text-purple-400 font-mono">{talent.cost} EA</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${talent.type === 'General' ? 'bg-gray-600 text-gray-200' : 'bg-blue-900 text-blue-200'}`}>
                                            {talent.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 italic mb-2">{talent.description}</p>
                                    <p className="text-sm text-yellow-100">{talent.benefit}</p>
                                </div>
                                <div className="mt-4">
                                    {owned ? (
                                        <button disabled className="w-full py-2 bg-green-900/50 text-green-500 font-bold rounded cursor-default border border-green-900">ADQUIRIDO</button>
                                    ) : (
                                        <button 
                                            onClick={() => onBuyTalent(talent, isGmMode)}
                                            disabled={!isGmMode && !canAfford}
                                            className={`w-full py-2 font-bold rounded transition-colors ${
                                                isGmMode
                                                ? 'bg-cyan-700 hover:bg-cyan-600 text-white'
                                                : canAfford ? 'bg-yellow-600 hover:bg-yellow-500 text-black' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {isGmMode ? 'FORZAR MUTACIÓN' : canAfford ? 'MUTAR' : 'EA INSUFICIENTE'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {visibleTalents.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500 italic">
                            No hay talentos disponibles en este filtro.
                        </div>
                    )}
                </div>
            </>
        ) : (
            /* Stats Upgrade Content */
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Attributes */}
                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-2 border-b border-gray-600 pb-2">Mejora de Atributos (4,000 EA)</h3>
                    <p className="text-xs text-gray-400 mb-4">Mutación genética directa. Aumenta permanentemente una característica.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as Attribute[]).map(attr => {
                            const cost = 4000;
                            const canAfford = char.anomalousEssence >= cost;
                            return (
                                <button 
                                    key={attr}
                                    onClick={() => onBuyAttribute(attr, isGmMode)}
                                    disabled={!isGmMode && !canAfford}
                                    className={`p-3 rounded border text-center transition-all ${
                                        isGmMode
                                        ? 'border-cyan-500 bg-cyan-900/20 hover:bg-cyan-900/40 text-white'
                                        : canAfford 
                                            ? 'border-purple-500 bg-purple-900/20 hover:bg-purple-900/40 text-white' 
                                            : 'border-gray-700 text-gray-600 cursor-not-allowed'
                                    }`}
                                >
                                    <span className="block font-bold text-xl">{attr}</span>
                                    <span className="text-xs">{isGmMode ? 'Forzar +1' : '+1 Punto'}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-2 border-b border-gray-600 pb-2">Mejora de Habilidad (1,500 EA)</h3>
                    <p className="text-xs text-gray-400 mb-4">Memoria muscular y plasticidad cerebral. Adquiere competencia.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {SKILLS_LIST.map(skill => {
                            const cost = 1500;
                            const canAfford = char.anomalousEssence >= cost;
                            const owned = char.skillProficiencies.includes(skill.id); 
                            return (
                                <button 
                                    key={skill.id}
                                    onClick={() => onBuySkill(skill.id, isGmMode)}
                                    disabled={owned || (!isGmMode && !canAfford)}
                                    className={`p-2 rounded border text-left text-xs flex justify-between items-center ${
                                        owned 
                                        ? 'bg-green-900/20 border-green-800 text-green-500' 
                                        : isGmMode
                                            ? 'border-cyan-600 bg-cyan-900/10 hover:bg-cyan-900/30 text-cyan-200'
                                            : canAfford 
                                                ? 'border-yellow-600 bg-yellow-900/10 hover:bg-yellow-900/30 text-gray-200' 
                                                : 'border-gray-700 text-gray-600'
                                    }`}
                                >
                                    <span>{skill.name}</span>
                                    {owned && <span>✓</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Mutation Table Hint */}
                <div className="bg-red-900/20 p-4 rounded border border-red-900 text-center">
                    <h4 className="text-red-400 font-bold uppercase text-sm mb-2">⚠ Sobrecarga Genética ⚠</h4>
                    <p className="text-xs text-red-300">
                        Al gastar EA, debes realizar una Salvación de Constitución (CD 10 + Coste/1000). 
                        Si fallas, tu cuerpo rechaza la evolución y sufres una Mutación aleatoria.
                        <br/>
                        <span className="italic mt-2 block opacity-70">(Consulta la Tabla de Mutaciones al DJ)</span>
                    </p>
                </div>

            </div>
        )}

      </div>
    </div>
  );
};
