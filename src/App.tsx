
import React, { useState, useRef } from 'react';
import { Attribute } from './types';
import { StatBox } from './components/StatBox';
import { PaperDoll } from './components/PaperDoll';
import { SpellsPanel } from './components/SpellsPanel';
import { InventoryPanel } from './components/InventoryPanel';
import { PropertiesPanel } from './components/PropertiesPanel';
import { TalentsPanel } from './components/TalentsPanel';
import { SkillsPanel } from './components/SkillsPanel';
import { RadiationPanel } from './components/RadiationPanel';
import { MagicStressPanel } from './components/MagicStressPanel';
import { ExhaustionPanel } from './components/ExhaustionPanel';
import { ConditionsPanel } from './components/ConditionsPanel';
import { IdentityPanel } from './components/IdentityPanel';
import { ArtifactSlots } from './components/ArtifactSlots';
import { TalentStore } from './components/TalentStore';
import { GeneralStore } from './components/GeneralStore';
import { MutationStore } from './components/MutationStore';
import { TraitStore } from './components/TraitStore';
import { Compendium } from './components/Compendium';
import { getItem } from './utils';
import { useCharacter } from './hooks/useCharacter';

export default function App() {
  const { char, setChar, derived, actions } = useCharacter();
  
  const [showTalentStore, setShowTalentStore] = useState(false);
  const [showGeneralStore, setShowGeneralStore] = useState(false);
  const [showMutationStore, setShowMutationStore] = useState(false);
  const [showTraitStore, setShowTraitStore] = useState(false);
  const [showCompendium, setShowCompendium] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(char, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${char.name || 'personaje_zona'}_data.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

  const handleLoadClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validación de extensión (Android workaround)
      if (!file.name.toLowerCase().endsWith('.json')) {
          alert("Por favor selecciona un archivo JSON válido (.json)");
          e.target.value = '';
          return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
          try {
              const parsed = JSON.parse(evt.target?.result as string);

              // Validación mejorada del formato
              const isValid = parsed &&
                              typeof parsed === 'object' &&
                              parsed.attributes &&
                              typeof parsed.attributes === 'object' &&
                              Array.isArray(parsed.inventory) &&
                              typeof parsed.name === 'string' &&
                              typeof parsed.level === 'number';

              if (isValid) {
                  actions.handleLoadChar(parsed);
              } else {
                  alert("El archivo no tiene el formato correcto de hoja de personaje.");
              }
          } catch (err) {
              alert("Error al leer el archivo. Asegúrate de que es un JSON válido.");
          }
      };
      reader.readAsText(file);
      e.target.value = '';
  };

  const handlePrint = () => window.print();

  const primaryWeapon = getItem(char.equipment.weaponPrimary);
  const secondaryWeapon = getItem(char.equipment.weaponSecondary);
  const meleeWeapon = getItem(char.equipment.weaponMelee);

  const renderWeaponCard = (w: any, slotName: string) => {
      if(!w) return (
          <div className="bg-gray-800/50 p-2 rounded border border-gray-700 border-dashed text-xs text-center text-gray-600 uppercase print:bg-white print:border-black print:text-black">
              {slotName}: Vacío
          </div>
      );
      
      return (
          <div className="bg-gray-800 p-2 rounded border border-gray-700 flex flex-col gap-1 print:bg-white print:border-black print:text-black">
              <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-300 uppercase print:text-black">{slotName}</span>
                  <span className="text-[10px] text-gray-500 print:text-gray-700">{w.type}</span>
              </div>
              <div className="font-bold text-sm text-yellow-500 truncate print:text-black">{w.name}</div>
              <div className="flex justify-between text-xs text-gray-400 font-mono print:text-black">
                  <span>{w.damage} {w.damageType.substring(0,3)}</span>
                  <span>{w.range} ft</span>
              </div>
              <div className="text-[9px] text-gray-500 italic truncate print:text-gray-700">
                  {w.properties.join(', ')}
              </div>
          </div>
      );
  };

  const getSaveModifier = (attr: Attribute) => {
      let mod = 0;
      if (attr === 'STR' && char.mutations.includes('mut_hollow_bones')) mod -= 2;
      return mod;
  };

  const loadColor = derived.currentWeight > derived.maxWeight ? 'text-red-500' : 'text-gray-400';

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-sans selection:bg-yellow-500 selection:text-black pb-20 print:bg-white print:text-black print:pb-0">
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* HEADER */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 shadow-lg bg-opacity-95 backdrop-blur-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
                <div className="flex-none">
                    <h1 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-widest leading-none">CDLZ</h1>
                </div>
                <div className="flex-1 max-w-2xl bg-black/40 px-3 py-1.5 rounded border border-gray-700 focus-within:border-yellow-600 transition-colors">
                    <input 
                        className="bg-transparent border-none w-full text-lg md:text-xl font-bold text-white placeholder-gray-600 outline-none truncate" 
                        placeholder="NOMBRE DEL OPERATIVO"
                        value={char.name}
                        onChange={e => setChar(p => ({...p, name: e.target.value}))}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={actions.handleReset} className="p-2 text-gray-400 hover:text-white hover:bg-red-900/30 rounded border border-transparent hover:border-red-900/50 transition-colors" title="Reset">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
                <button onClick={handleLoadClick} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Cargar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button onClick={handleSave} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors" title="Guardar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                </button>
                <button onClick={handlePrint} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors hidden sm:block" title="Imprimir">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                </button>
                <button onClick={() => setShowCompendium(true)} className="ml-2 w-10 h-10 flex items-center justify-center bg-gray-800 text-cyan-500 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 transition-all" title="Códice">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 print:block print:p-0">
          
          <div className="lg:col-span-12 print:break-inside-avoid">
             <IdentityPanel char={char} onChange={(updates) => setChar(p => ({...p, ...updates}))} onChangeBackground={actions.handleChangeBackground} />
          </div>

          <div className="lg:col-span-3 space-y-6 print:mb-6">
              <div className="print:break-inside-avoid">
                  <h3 className="text-yellow-500 font-bold border-b border-gray-700 pb-2 mb-4 text-sm uppercase tracking-wider print:text-black print:border-black">Atributos</h3>
                  <div className="grid grid-cols-2 gap-2 print:grid-cols-3">
                      {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as Attribute[]).map(attr => (
                          <StatBox 
                            key={attr} label={attr} attr={attr} value={char.attributes[attr]} 
                            proficient={char.proficiencies.includes(attr)} pb={derived.pb}
                            extraSaveMod={getSaveModifier(attr)} onChange={(val) => actions.updateAttr(attr, val)} onToggleProf={() => actions.toggleProf(attr)}
                          />
                      ))}
                  </div>
              </div>

              <div className="bg-gray-900 border border-green-900/50 p-4 rounded print:bg-white print:border-black print:text-black print:break-inside-avoid shadow-lg shadow-green-900/10">
                  <div className="flex justify-between items-center mb-2">
                      <h3 className="text-green-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                          <span className="animate-pulse text-green-400">♥</span> Signos Vitales
                      </h3>
                      <button onClick={() => setChar(p => ({...p, hpCurrent: p.hpMax}))} className="text-[10px] bg-gray-800 px-2 py-1 rounded text-blue-400 border border-blue-900 hover:bg-gray-700 print:hidden">Descanso Largo</button>
                  </div>
                  <div className="flex items-center gap-3 bg-black/40 p-3 rounded border border-green-900/30 relative overflow-hidden">
                      {char.hpTemp > 0 && (
                          <div className="absolute top-0 right-0 bg-blue-900/80 text-blue-200 text-[10px] px-1.5 py-0.5 rounded-bl font-bold border-l border-b border-blue-500 shadow-sm">
                              +{char.hpTemp} TEMP
                          </div>
                      )}
                      <button onClick={() => setChar(p => ({...p, hpCurrent: Math.max(0, p.hpCurrent - 1)}))} className="w-8 h-8 bg-red-900/50 text-red-200 rounded hover:bg-red-800 print:hidden font-bold">-</button>
                      <div className="flex-1 text-center relative z-10">
                          <span className="text-3xl font-mono font-bold text-white print:text-black">{char.hpCurrent}</span>
                          <span className="text-gray-500 mx-1 print:text-black">/</span>
                          <span className="text-sm font-mono text-gray-400 print:text-black">{char.hpMax} HP</span>
                      </div>
                      <button onClick={() => setChar(p => ({...p, hpCurrent: Math.min(p.hpMax, p.hpCurrent + 1)}))} className="w-8 h-8 bg-green-900/50 text-green-200 rounded hover:bg-green-800 print:hidden font-bold">+</button>
                      <div className="absolute bottom-0 left-0 h-1 bg-green-600 transition-all duration-500" style={{ width: `${Math.min(100, (char.hpCurrent / char.hpMax) * 100)}%` }}></div>
                  </div>
                  <div className="mt-3 flex justify-between items-center print:hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">HP Temp</span>
                        <input type="number" className="w-10 bg-gray-800 text-center text-xs text-blue-300 border border-gray-700 rounded outline-none focus:border-blue-500" value={char.hpTemp} onChange={(e) => setChar(p => ({...p, hpTemp: Math.max(0, parseInt(e.target.value)||0)}) )}/>
                      </div>
                      <button onClick={actions.handleHitDieRecovery} className="text-[10px] bg-gray-800 px-3 py-1.5 rounded text-green-400 border border-green-900 hover:bg-gray-700 flex items-center gap-1">
                          <span>🩹</span> Gastar DG
                      </button>
                  </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded p-3 grid grid-cols-2 gap-4 print:bg-transparent print:border-black print:text-black">
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Clase de Armadura</span>
                      <span className="text-2xl font-bold text-white font-mono flex items-baseline gap-1 print:text-black">
                          {derived.ac} <span className="text-[10px] text-gray-600 font-sans font-normal print:text-gray-700">CA</span>
                      </span>
                  </div>
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Iniciativa</span>
                      <span className="text-2xl font-bold text-white font-mono flex items-baseline gap-1 print:text-black">
                          {derived.initiative >= 0 ? `+${derived.initiative}` : derived.initiative}
                      </span>
                  </div>
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Velocidad</span>
                      <span className="text-2xl font-bold text-white font-mono flex items-baseline gap-1 print:text-black">
                          {derived.speed} <span className="text-[10px] text-gray-600 font-sans font-normal print:text-gray-700">pies</span>
                      </span>
                  </div>
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Bono Competencia</span>
                      <span className="text-2xl font-bold text-yellow-500 font-mono flex items-baseline gap-1 print:text-black">
                          +{derived.pb}
                      </span>
                  </div>
                  <div className="col-span-2 border-t border-gray-800 pt-2">
                      <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-gray-500 uppercase print:text-gray-700">Carga Actual</span>
                           <span className={`text-xl font-bold font-mono flex items-baseline gap-1 ${loadColor} print:text-black`}>
                              {derived.currentWeight} <span className="text-gray-500 text-sm">/ {derived.maxWeight} lbs</span>
                          </span>
                      </div>
                      <div className="w-full bg-gray-800 h-1.5 mt-1 rounded-full overflow-hidden">
                          <div className={`h-full ${derived.currentWeight > derived.maxWeight ? 'bg-red-600' : 'bg-gray-500'}`} style={{ width: `${Math.min(100, (derived.currentWeight / derived.maxWeight) * 100)}%` }}></div>
                      </div>
                  </div>
              </div>

              <div className="print:break-inside-avoid">
                  <SkillsPanel char={char} onToggleSkill={actions.toggleSkill} pb={derived.pb} />
              </div>
          </div>

          <div className="lg:col-span-5 space-y-6 print:mb-6">
              <div className="print:break-inside-avoid">
                  <h3 className="text-yellow-500 font-bold border-b border-gray-700 pb-2 mb-4 text-sm uppercase tracking-wider print:text-black print:border-black">Combate Activo</h3>
                  <div className="grid grid-cols-3 gap-2">
                      {renderWeaponCard(primaryWeapon, 'PRIMARIA')}
                      {renderWeaponCard(secondaryWeapon, 'SECUNDARIA')}
                      {renderWeaponCard(meleeWeapon, 'MELEE')}
                  </div>
              </div>

              <div className="print:break-inside-avoid">
                <InventoryPanel 
                    inventory={char.inventory} gold={char.gold} 
                    onUpdateItem={actions.handleUpdateItem} 
                    onUpdateGold={(v) => setChar(p => ({...p, gold: v}))}
                    onOpenShop={() => setShowGeneralStore(true)}
                />
              </div>

              <div className="print:break-inside-avoid">
                <PaperDoll char={char} updateEquipment={actions.updateEquipment} />
              </div>
              
              <div className="print:break-inside-avoid">
                <ArtifactSlots char={char} onEquipArtifact={actions.handleEquipArtifact} onUnequipArtifact={actions.handleUnequipArtifact} />
              </div>

              {char.class === 'Support' && (
                  <div className="print:break-inside-avoid">
                    <SpellsPanel 
                        intScore={char.attributes.INT} profBonus={derived.pb} level={char.level}
                        preparedSpells={char.preparedSpells} onTogglePrepare={actions.handleTogglePrepareSpell}
                    />
                  </div>
              )}
          </div>

          <div className="lg:col-span-4 space-y-6 print:mb-6">
              <div className="print:break-inside-avoid">
                <TalentsPanel 
                    activeTalents={char.talents} activeTraits={char.traits} activeMutations={char.mutations}
                    onToggleTalent={actions.handleToggleTalent} onToggleTrait={actions.handleToggleTrait} onToggleMutation={actions.handleToggleMutation}
                    onOpenStore={() => setShowTalentStore(true)} onOpenMutationStore={() => setShowMutationStore(true)} onOpenTraitStore={() => setShowTraitStore(true)}
                />
              </div>

              <div className="space-y-4 print:break-inside-avoid">
                  <ConditionsPanel activeConditions={char.conditions} onToggle={actions.handleToggleCondition} />
                  <RadiationPanel level={char.radiationLevel} onChange={(v) => setChar(p => ({...p, radiationLevel: v}))} />
                  <ExhaustionPanel level={char.exhaustion} onChange={(v) => setChar(p => ({...p, exhaustion: v}))} />
                  {char.class === 'Support' && (
                      <MagicStressPanel level={char.magicStress} onChange={(v) => setChar(p => ({...p, magicStress: v}))} />
                  )}
              </div>

              <div className="print:break-inside-avoid">
                <PropertiesPanel inventory={char.inventory} />
              </div>
          </div>
      </main>

      {showTalentStore && (
          <TalentStore 
            char={char} onBuyTalent={actions.handleBuyTalent} onBuyAttribute={actions.handleBuyAttribute} onBuySkill={actions.handleBuySkill}
            onClose={() => setShowTalentStore(false)} 
          />
      )}
      {showGeneralStore && (
          <GeneralStore char={char} onBuyItem={actions.handleBuyItem} onClose={() => setShowGeneralStore(false)} />
      )}
      {showMutationStore && (
          <MutationStore char={char} onToggleMutation={actions.handleToggleMutation} onClose={() => setShowMutationStore(false)} />
      )}
      {showTraitStore && (
          <TraitStore char={char} onToggleTrait={actions.handleToggleTrait} onClose={() => setShowTraitStore(false)} />
      )}
      {showCompendium && (
          <Compendium onClose={() => setShowCompendium(false)} />
      )}
    </div>
  );
}
