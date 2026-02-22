
import React, { useState, useMemo } from 'react';
import { CharacterState } from '../types';
import { WEAPONS_CATALOG, ARMOR_CATALOG, ITEMS_CATALOG, HEAD_CATALOG, FACE_CATALOG, EYES_CATALOG, EARS_CATALOG, RIG_CATALOG, BACKPACK_CATALOG } from '../constants';

interface Props {
  char: CharacterState;
  onBuyItem: (item: any, type: 'Item' | 'Weapon' | 'Armor', free: boolean) => void;
  onClose: () => void;
}

type MainTab = 'Armamento' | 'Blindaje' | 'Equipo Táctico' | 'Artefactos' | 'Suministros' | 'Vehículos' | 'Propiedades';
type SubCategory = 'Todas' | 'Pistolas' | 'Subfusiles' | 'Escopetas' | 'Asalto' | 'LMG' | 'DMR/Sniper' | 'Anti-Mat' | 'Melee' | 'Anómala' | 'Ligera' | 'Media' | 'Pesada' | 'Exo' | 'Cabeza' | 'Máscaras' | 'Ojos' | 'Oídos' | 'Chalecos' | 'Mochilas' | 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Legendario' | 'Médico' | 'Munición' | 'Tech' | 'Explosivos';

export const GeneralStore: React.FC<Props> = ({ char, onBuyItem, onClose }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('Armamento');
  const [activeSub, setActiveSub] = useState<SubCategory>('Todas');
  const [isGmMode, setIsGmMode] = useState(false);

  const changeTab = (tab: MainTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'Armamento': setActiveSub('Todas'); break;
      case 'Blindaje': setActiveSub('Todas'); break;
      case 'Equipo Táctico': setActiveSub('Cabeza'); break;
      case 'Artefactos': setActiveSub('Tier 1'); break;
      case 'Suministros': setActiveSub('Médico'); break;
      case 'Vehículos': setActiveSub('Todas'); break;
      case 'Propiedades': setActiveSub('Todas'); break;
    }
  };

  const renderItemCard = (item: any, type: 'Item' | 'Weapon' | 'Armor') => {
    const price = item.price || item.cost || 0;
    const weight = item.weight || 0;
    const canAfford = char.gold >= price;
    const isLegendary = item.rarity === 'Legendaria' || item.tier === 4 || price === 0;

    let subLabel = "";
    if (type === 'Weapon') {
      const props = item.properties?.length ? ` [${item.properties.join(', ')}]` : '';
      subLabel = `${item.damage} ${item.damageType} • ${item.range}ft${props}`;
    }
    else if (type === 'Armor') {
      subLabel = `CA ${item.acBase} ${item.type}`;
      if (item.effect) subLabel += ` • ${item.effect}`;
    }
    else if (type === 'Item') {
      subLabel = item.effect || item.type;
    }

    const tierLabel = item.tier ? `TIER ${item.tier}` : '';

    return (
      <div key={item.id} className={`border p-3 rounded flex flex-col justify-between transition-all shadow-sm ${isLegendary
          ? 'bg-yellow-900/10 border-yellow-500 shadow-yellow-500/20'
          : 'bg-gray-800 border-gray-700 hover:border-gray-500'
        }`}>
        <div>
          <div className="flex justify-between items-start mb-1">
            <span className={`font-bold text-sm leading-tight ${isLegendary ? 'text-yellow-300' : 'text-gray-200'}`}>{item.name}</span>
            <span className="text-yellow-500 font-mono text-xs whitespace-nowrap ml-2">{price === 0 ? 'Invaluable' : `${price} PO`}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
            <span className="whitespace-nowrap">{weight > 0 ? `${weight} lbs` : '-'}</span>
          </div>

          <div className="text-[10px] text-gray-300 italic mt-2 min-h-[2.5em] leading-tight opacity-90 bg-black/20 p-2 rounded whitespace-pre-wrap">
            {subLabel}
          </div>

          <div className="flex gap-1 mt-2 flex-wrap">
            {item.rarity && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase border ${item.rarity === 'Civil' ? 'border-green-800 text-green-500 bg-green-900/10' :
                  item.rarity === 'Táctica' ? 'border-purple-800 text-purple-500 bg-purple-900/10' :
                    item.rarity === 'Caceria' ? 'border-orange-800 text-orange-500 bg-orange-900/10' :
                      item.rarity === 'Legendaria' ? 'border-yellow-600 text-yellow-400 bg-yellow-900/10' :
                        item.rarity === 'Anomala' ? 'border-pink-600 text-pink-400 bg-pink-900/10' :
                          'border-gray-700 text-gray-500'
                }`}>
                {item.rarity}
              </span>
            )}
            {tierLabel && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase border ${item.tier === 4
                  ? 'border-yellow-600 text-yellow-400 bg-yellow-900/10'
                  : 'border-blue-800 text-blue-400 bg-blue-900/10'
                }`}>
                {tierLabel}
              </span>
            )}
            {(type === 'Weapon' || type === 'Armor') && (
              <span className="text-[9px] px-1.5 py-0.5 rounded uppercase border border-gray-600 text-gray-400 bg-gray-800">
                {item.type}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onBuyItem(item, type, isGmMode)}
          disabled={!isGmMode && (price === 0 || !canAfford)}
          className={`mt-3 w-full py-1 text-xs font-bold uppercase rounded transition-colors ${isGmMode
              ? 'bg-cyan-700 hover:bg-cyan-600 text-white shadow shadow-cyan-900/50'
              : (canAfford && price > 0)
                ? isLegendary
                  ? 'bg-yellow-600 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-600/50'
                  : 'bg-yellow-700 hover:bg-yellow-600 text-white shadow shadow-yellow-900/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isGmMode
            ? 'AÑADIR (LOOT)'
            : (price === 0 ? 'Encontrar' : canAfford ? 'Comprar' : 'Sin Fondos')
          }
        </button>
      </div>
    );
  };

  // OPTIMIZATION: Memoize filtered items to prevent recalc on every render if tabs don't change
  const filteredItems = useMemo(() => {
    switch (activeTab) {
      case 'Armamento': {
        let items = WEAPONS_CATALOG;
        if (activeSub !== 'Todas') {
          if (activeSub === 'Pistolas') items = items.filter(i => i.type === 'Pistola');
          else if (activeSub === 'Subfusiles') items = items.filter(i => i.type === 'Subfusil');
          else if (activeSub === 'Escopetas') items = items.filter(i => i.type === 'Escopeta');
          else if (activeSub === 'Asalto') items = items.filter(i => i.type === 'Rifle Asalto');
          else if (activeSub === 'DMR/Sniper') items = items.filter(i => i.type === 'DMR' || i.type === 'Sniper');
          else if (activeSub === 'LMG') items = items.filter(i => i.type === 'LMG');
          else if (activeSub === 'Anti-Mat') items = items.filter(i => i.damageType === 'Perforante' && i.weight > 20);
          else if (activeSub === 'Melee') items = items.filter(i => i.type === 'Melee');
          else if (activeSub === 'Anómala') items = items.filter(i => i.type === 'Anomala');
        }
        return items.map(i => renderItemCard(i, 'Weapon'));
      }
      case 'Blindaje': {
        let items = ARMOR_CATALOG;
        if (activeSub !== 'Todas') {
          if (activeSub === 'Ligera') items = items.filter(i => i.type === 'Light');
          else if (activeSub === 'Media') items = items.filter(i => i.type === 'Medium');
          else if (activeSub === 'Pesada') items = items.filter(i => i.type === 'Heavy');
          else if (activeSub === 'Exo') items = items.filter(i => i.type === 'Exo');
        }
        return items.map(i => renderItemCard(i, 'Armor'));
      }
      case 'Equipo Táctico': {
        if (activeSub === 'Cabeza') return HEAD_CATALOG.map(i => renderItemCard(i, 'Item'));
        if (activeSub === 'Máscaras') return FACE_CATALOG.map(i => renderItemCard(i, 'Item'));
        if (activeSub === 'Ojos') return EYES_CATALOG.map(i => renderItemCard(i, 'Item'));
        if (activeSub === 'Oídos') return EARS_CATALOG.map(i => renderItemCard(i, 'Item'));
        if (activeSub === 'Chalecos') return RIG_CATALOG.map(i => renderItemCard(i, 'Item'));
        if (activeSub === 'Mochilas') return BACKPACK_CATALOG.map(i => renderItemCard(i, 'Item'));
        return [];
      }
      case 'Artefactos': {
        let items = ITEMS_CATALOG.filter(i => i.type === 'Artifact');
        if (activeSub === 'Tier 1') items = items.filter(i => i.tier === 1);
        if (activeSub === 'Tier 2') items = items.filter(i => i.tier === 2);
        if (activeSub === 'Tier 3') items = items.filter(i => i.tier === 3);
        if (activeSub === 'Legendario') items = items.filter(i => i.tier === 4);
        return items.map(i => renderItemCard(i, 'Item'));
      }
      case 'Suministros': {
        let items = ITEMS_CATALOG.filter(i => i.type !== 'Artifact' && i.type !== 'Vehicle' && i.type !== 'Base');
        if (activeSub === 'Médico') items = items.filter(i => i.type === 'Medical');
        else if (activeSub === 'Munición') items = items.filter(i => i.type === 'Ammo');
        else if (activeSub === 'Tech') items = items.filter(i => i.type === 'Tech' || i.type === 'Tool');
        else if (activeSub === 'Explosivos') items = items.filter(i => i.type === 'Explosive');
        return items.map(i => renderItemCard(i, 'Item'));
      }
      case 'Vehículos': {
        return ITEMS_CATALOG.filter(i => i.type === 'Vehicle').map(i => renderItemCard(i, 'Item'));
      }
      case 'Propiedades': {
        return ITEMS_CATALOG.filter(i => i.type === 'Base').map(i => renderItemCard(i, 'Item'));
      }
      default: return [];
    }
  }, [activeTab, activeSub, char.gold, isGmMode]); // Recalculate on tab change or gold change

  const renderSubTabs = () => {
    const getButtons = (subs: SubCategory[]) => (
      <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
        {subs.map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={`px-3 py-1 text-xs font-bold uppercase rounded border transition-all whitespace-nowrap ${activeSub === sub
                ? 'bg-yellow-600 text-black border-yellow-500 shadow-md shadow-yellow-900/20'
                : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
              }`}
          >
            {sub}
          </button>
        ))}
      </div>
    );

    if (activeTab === 'Armamento') return getButtons(['Todas', 'Pistolas', 'Subfusiles', 'Escopetas', 'Asalto', 'LMG', 'DMR/Sniper', 'Melee', 'Anómala']);
    if (activeTab === 'Blindaje') return getButtons(['Todas', 'Ligera', 'Media', 'Pesada', 'Exo']);
    if (activeTab === 'Equipo Táctico') return getButtons(['Cabeza', 'Máscaras', 'Ojos', 'Oídos', 'Chalecos', 'Mochilas']);
    if (activeTab === 'Artefactos') return getButtons(['Tier 1', 'Tier 2', 'Tier 3', 'Legendario']);
    if (activeTab === 'Suministros') return getButtons(['Médico', 'Munición', 'Tech', 'Explosivos']);
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-gray-900 border border-yellow-600 rounded-lg w-full max-w-6xl max-h-[95vh] flex flex-col shadow-2xl shadow-yellow-900/20 overflow-hidden">

        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-950 flex-none">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600/20 p-2 rounded-full border border-yellow-600/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-yellow-500 uppercase tracking-widest leading-none">Mercado Negro</h2>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">Red de Suministros Criptográfica</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* GM Mode Toggle */}
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded border border-gray-700">
              <span className={`text-[10px] font-bold uppercase ${isGmMode ? 'text-cyan-400' : 'text-gray-500'}`}>Modo Narrativo (Loot)</span>
              <div
                onClick={() => setIsGmMode(!isGmMode)}
                className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${isGmMode ? 'bg-cyan-600' : 'bg-gray-700'}`}
              >
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isGmMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <div className="text-right bg-black/50 px-4 py-2 rounded border border-yellow-900/50 shadow-inner">
              <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Saldo Disponible</span>
              <span className="text-2xl font-mono text-yellow-400 font-bold">{char.gold} PO</span>
            </div>
            <button onClick={onClose} className="bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 p-2 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-900 flex-none overflow-x-auto scrollbar-hide">
          {(['Armamento', 'Blindaje', 'Equipo Táctico', 'Artefactos', 'Suministros', 'Vehículos', 'Propiedades'] as MainTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => changeTab(tab)}
              className={`py-4 px-6 text-sm font-bold uppercase transition-all border-b-2 whitespace-nowrap ${activeTab === tab
                  ? 'border-yellow-500 text-yellow-500 bg-gray-800'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sub Category Filters */}
        {activeTab !== 'Vehículos' && activeTab !== 'Propiedades' && (
          <div className="bg-gray-900 p-2 border-b border-gray-800 flex-none">
            {renderSubTabs()}
          </div>
        )}

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-950/80 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredItems}
          </div>
          {filteredItems.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
              <span className="text-4xl mb-2">∅</span>
              <span className="text-sm uppercase tracking-widest">Sin stock disponible</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
