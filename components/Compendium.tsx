
import React, { useState, useMemo } from 'react';
import { 
  WEAPONS_CATALOG, 
  ARMOR_CATALOG, 
  ITEMS_CATALOG, 
  HEAD_CATALOG, 
  FACE_CATALOG, 
  EYES_CATALOG, 
  EARS_CATALOG, 
  RIG_CATALOG, 
  BACKPACK_CATALOG,
  PROTOCOLS_CATALOG,
  TALENTS_CATALOG,
  TRAITS_CATALOG,
  MUTATIONS_CATALOG
} from '../constants';

interface Props {
  onClose: () => void;
}

type Category = 'Armas' | 'Blindaje' | 'Equipo' | 'Artefactos' | 'Protocolos' | 'Talentos' | 'Rasgos' | 'Mutaciones';

export const Compendium: React.FC<Props> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Armas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Combine gear catalogs for "Equipo"
  const allGear = [
    ...HEAD_CATALOG, 
    ...FACE_CATALOG, 
    ...EYES_CATALOG, 
    ...EARS_CATALOG, 
    ...RIG_CATALOG, 
    ...BACKPACK_CATALOG,
    ...ITEMS_CATALOG.filter(i => i.type !== 'Artifact' && i.type !== 'Vehicle' && i.type !== 'Base')
  ];

  const artifacts = ITEMS_CATALOG.filter(i => i.type === 'Artifact');
  
  // Data Source Logic
  const getDataSource = () => {
    switch(activeCategory) {
        case 'Armas': return WEAPONS_CATALOG;
        case 'Blindaje': return ARMOR_CATALOG;
        case 'Equipo': return allGear;
        case 'Artefactos': return artifacts;
        case 'Protocolos': return PROTOCOLS_CATALOG;
        case 'Talentos': return TALENTS_CATALOG;
        case 'Rasgos': return TRAITS_CATALOG;
        case 'Mutaciones': return MUTATIONS_CATALOG;
        default: return [];
    }
  };

  const filteredData = useMemo(() => {
      const data = getDataSource();
      if (!searchQuery) return data;
      return data.filter((item: any) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.effect && item.effect.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.benefit && item.benefit.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [activeCategory, searchQuery]);

  // Render Details Logic
  const renderDetails = (item: any) => {
      if (!item) return <div className="text-gray-500 italic text-center mt-20 flex flex-col items-center"><span className="text-4xl mb-4">💽</span><span>Selecciona un archivo de la lista para ver sus datos descifrados.</span></div>;

      return (
          <div className="animate-fade-in space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar">
              {/* Header */}
              <div className="border-b border-cyan-800 pb-4">
                  <div className="flex justify-between items-start">
                      <h2 className="text-3xl font-black text-cyan-400 uppercase tracking-wide leading-none">{item.name}</h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                      {/* Price Tag */}
                      {item.price !== undefined && (
                          <span className="text-xs font-mono font-bold bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded border border-yellow-700">
                              {item.price === 0 ? 'VALOR INCALCULABLE' : `${item.price} PO`}
                          </span>
                      )}
                      {item.cost !== undefined && !['Talentos','Protocolos','Rasgos','Mutaciones'].includes(activeCategory) && (
                          <span className="text-xs font-mono font-bold bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded border border-yellow-700">
                              {item.cost === 0 ? 'N/A' : `${item.cost} PO`}
                          </span>
                      )}
                      {/* EA Cost for Talents */}
                      {item.cost !== undefined && activeCategory === 'Talentos' && (
                          <span className="text-xs font-mono font-bold bg-purple-900/30 text-purple-400 px-2 py-1 rounded border border-purple-700">
                              COSTO: {item.cost} EA
                          </span>
                      )}

                      {/* Rarity & Type Tags */}
                      {item.rarity && (
                          <span className={`text-xs px-2 py-1 rounded border uppercase font-bold ${
                              item.rarity === 'Legendaria' ? 'border-yellow-500 text-yellow-300 bg-yellow-900/20 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 
                              item.rarity === 'Anomala' ? 'border-pink-500 text-pink-300 bg-pink-900/20 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 
                              item.rarity === 'Táctica' ? 'border-purple-500 text-purple-300 bg-purple-900/20' :
                              'border-cyan-700 text-cyan-300 bg-cyan-900/20'
                          }`}>
                              {item.rarity}
                          </span>
                      )}
                      {item.type && <span className="text-xs px-2 py-1 rounded border border-gray-600 text-gray-400 bg-gray-800 uppercase">{item.type}</span>}
                      {item.tier && <span className="text-xs px-2 py-1 rounded border border-purple-600 text-purple-300 bg-purple-900/20 font-bold">TIER {item.tier}</span>}
                  </div>
              </div>

              {/* Stats Grid - Context Aware */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-900/50 p-4 rounded border border-cyan-900/30">
                  {/* Weapons */}
                  {item.damage && (
                      <>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Daño</span>
                            <span className="text-lg font-mono text-white font-bold">{item.damage}</span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Tipo</span>
                            <span className="text-sm text-gray-300">{item.damageType}</span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Rango</span>
                            <span className="text-sm text-gray-300">{item.range || 'Melee'}</span>
                        </div>
                      </>
                  )}
                  {/* Armor */}
                  {item.acBase && (
                      <>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Clase de Armadura (CA)</span>
                            <span className="text-lg font-mono text-white font-bold">{item.acBase} <span className="text-xs font-normal text-gray-500">{item.dexBonus < 10 ? `+ Max ${item.dexBonus} DES` : '+ DES'}</span></span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Sigilo</span>
                            <span className={`text-sm font-bold ${item.stealthDisadvantage ? 'text-red-400' : 'text-green-400'}`}>
                                {item.stealthDisadvantage ? 'Desventaja' : 'Normal'}
                            </span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Ranuras (RA)</span>
                            <span className="text-lg font-mono text-blue-400 font-bold">{item.ra}</span>
                        </div>
                      </>
                  )}
                  {/* General Items */}
                  {item.weight !== undefined && (
                      <div className="bg-gray-900 p-2 rounded">
                          <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Peso</span>
                          <span className="text-lg font-mono text-gray-300">{item.weight} lbs</span>
                      </div>
                  )}
                  {/* Spells */}
                  {item.castingTime && (
                      <>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Tiempo</span>
                            <span className="text-white font-mono">{item.castingTime}</span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Rango</span>
                            <span className="text-white font-mono">{item.range}</span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Escuela</span>
                            <span className="text-purple-300">{item.school}</span>
                        </div>
                      </>
                  )}
              </div>

              {/* Description & Lore */}
              <div className="space-y-6">
                  {(item.description || item.properties) && (
                      <div>
                          <h3 className="text-cyan-600 font-bold uppercase text-xs mb-2 tracking-widest flex items-center gap-2">
                              <span className="w-1 h-3 bg-cyan-600 inline-block"></span> 
                              Descripción / Propiedades
                          </h3>
                          <div className="text-sm text-gray-300 leading-relaxed bg-gray-800/30 p-4 rounded border-l-2 border-gray-700">
                              {item.description}
                              {item.properties && (
                                  <div className="flex flex-wrap gap-2 mt-3">
                                      {item.properties.map((p: string, idx: number) => (
                                          <span key={idx} className="text-xs bg-gray-800 px-2 py-1 rounded text-cyan-200 border border-gray-600 shadow-sm">
                                              {p}
                                          </span>
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>
                  )}

                  {/* Mechanical Effects */}
                  {(item.effect || item.benefit || item.downside) && (
                      <div>
                          <h3 className="text-green-600 font-bold uppercase text-xs mb-2 tracking-widest flex items-center gap-2">
                              <span className="w-1 h-3 bg-green-600 inline-block"></span>
                              Efectos del Sistema
                          </h3>
                          <div className="text-sm space-y-2 bg-gray-900/50 p-4 rounded border border-gray-800">
                              {(item.effect || item.benefit) && (
                                  <div className="flex gap-2">
                                      <span className="text-green-500 font-bold">>>></span>
                                      <span className="text-green-100">{item.effect || item.benefit}</span>
                                  </div>
                              )}
                              {item.downside && (
                                  <div className="flex gap-2 mt-2 pt-2 border-t border-gray-700/50">
                                      <span className="text-red-500 font-bold">!!!</span>
                                      <span className="text-red-300 italic">{item.downside}</span>
                                  </div>
                              )}
                          </div>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-gray-950 border border-cyan-700/50 rounded-lg w-full max-w-7xl h-[90vh] flex flex-col shadow-[0_0_50px_rgba(8,145,178,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-cyan-900/50 flex justify-between items-center bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-900/20 p-2 rounded border border-cyan-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
                <h2 className="text-2xl font-black text-cyan-500 uppercase tracking-widest leading-none">Códice de la Zona</h2>
                <p className="text-[10px] text-cyan-700 mt-0.5 uppercase tracking-[0.2em]">Base de Datos Unificada V.28</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 px-4 py-2 rounded uppercase text-xs font-bold transition-colors">
              Cerrar Terminal
          </button>
        </div>

        {/* Main Body */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* Sidebar (List) */}
            <div className="w-1/3 min-w-[300px] border-r border-cyan-900/30 flex flex-col bg-gray-900/50">
                {/* Search */}
                <div className="p-3 border-b border-gray-800">
                    <input 
                        type="text" 
                        placeholder="Buscar en la base de datos..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-cyan-100 placeholder-gray-600 focus:border-cyan-500 outline-none"
                    />
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto p-2 gap-2 border-b border-gray-800 scrollbar-hide bg-black/20">
                    {(['Armas', 'Blindaje', 'Equipo', 'Artefactos', 'Protocolos', 'Talentos', 'Rasgos', 'Mutaciones'] as Category[]).map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setSelectedItem(null); }}
                            className={`px-3 py-1 text-[10px] font-bold uppercase rounded border transition-all whitespace-nowrap ${
                                activeCategory === cat 
                                ? 'bg-cyan-900/40 text-cyan-300 border-cyan-600' 
                                : 'bg-gray-800 text-gray-500 border-transparent hover:bg-gray-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Item List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredData.map((item: any, idx) => (
                        <div 
                            key={item.id || idx}
                            onClick={() => setSelectedItem(item)}
                            className={`p-3 border-b border-gray-800 cursor-pointer transition-colors flex justify-between items-center ${
                                selectedItem?.id === item.id 
                                ? 'bg-cyan-900/20 border-l-4 border-l-cyan-500' 
                                : 'hover:bg-gray-800 border-l-4 border-l-transparent'
                            }`}
                        >
                            <div>
                                <div className={`font-bold text-sm ${selectedItem?.id === item.id ? 'text-cyan-200' : 'text-gray-400'}`}>{item.name}</div>
                                <div className="text-[10px] text-gray-600 uppercase">{item.type || item.rarity || 'Varios'}</div>
                            </div>
                            {(item.tier || item.level) && (
                                <span className="text-[9px] bg-gray-900 text-gray-500 px-1.5 py-0.5 rounded border border-gray-700">
                                    {item.tier ? `T${item.tier}` : `Nv${item.level}`}
                                </span>
                            )}
                        </div>
                    ))}
                    {filteredData.length === 0 && (
                        <div className="p-8 text-center text-gray-600 text-xs uppercase tracking-widest">
                            No se encontraron registros
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area (Details) */}
            <div className="flex-1 bg-black/40 p-6 overflow-hidden relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <svg className="w-64 h-64 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                </div>
                {renderDetails(selectedItem)}
            </div>

        </div>
      </div>
    </div>
  );
};
