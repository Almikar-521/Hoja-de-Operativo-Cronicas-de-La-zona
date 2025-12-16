
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CharacterState, Attribute, Talent } from './types';
import { CLASSES, WEAPONS_CATALOG, ARMOR_CATALOG, ITEMS_CATALOG, TRAITS_CATALOG, CONDITIONS_CATALOG, MUTATIONS_CATALOG } from './constants';
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
import { getModifier, calculateAC, calculateMaxWeight, calculateCurrentWeight, calculateMaxHP, getItem } from './utils';

const INITIAL_CHAR: CharacterState = {
  name: '',
  player: '',
  class: '' as any,
  level: 1,
  background: '',
  xp: 0,
  notes: '',
  attributes: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
  proficiencies: [],
  skillProficiencies: [],
  hpCurrent: 1,
  hpMax: 1,
  hpTemp: 0,
  radiationLevel: 0,
  magicStress: 0,
  exhaustion: 0,
  conditions: [],
  anomalousEssence: 0, 
  equipment: {
    head: null, face: null, eyes: null, ears: null, body: null, rig: null, backpack: null,
    weaponPrimary: null, weaponSecondary: null, weaponMelee: null
  },
  equippedArtifacts: [null, null, null, null, null, null], 
  inventory: [],
  gold: 0, 
  talents: [],
  traits: [],
  mutations: [],
  preparedSpells: [] 
};

export default function App() {
  const [char, setChar] = useState<CharacterState>(() => {
      const saved = localStorage.getItem('cdlz_character_v2');
      if (saved) {
          try {
              const parsed = JSON.parse(saved);
              return { ...INITIAL_CHAR, ...parsed };
          } catch (e) {
              console.error("Error loading save", e);
              return INITIAL_CHAR;
          }
      }
      return INITIAL_CHAR;
  });

  const [showTalentStore, setShowTalentStore] = useState(false);
  const [showGeneralStore, setShowGeneralStore] = useState(false);
  const [showMutationStore, setShowMutationStore] = useState(false);
  const [showTraitStore, setShowTraitStore] = useState(false);
  const [showCompendium, setShowCompendium] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      const timeoutId = setTimeout(() => {
          localStorage.setItem('cdlz_character_v2', JSON.stringify(char));
      }, 500);
      return () => clearTimeout(timeoutId);
  }, [char]);

  useEffect(() => {
      const armor = getItem(char.equipment.body);
      const ra = armor && (armor as any).ra !== undefined ? (armor as any).ra : 0;
      
      let needsCleanup = false;
      const newArtifacts = [...char.equippedArtifacts];

      for (let i = ra; i < 6; i++) {
          if (newArtifacts[i] !== null) {
              newArtifacts[i] = null;
              needsCleanup = true;
          }
      }

      if (needsCleanup) {
          setChar(prev => ({ ...prev, equippedArtifacts: newArtifacts }));
      }
  }, [char.equipment.body]);

  // FIX: Smarter HP Update Logic
  useEffect(() => {
    setChar(prev => {
        const newMax = calculateMaxHP(prev);
        if (newMax !== prev.hpMax) {
            const diff = newMax - prev.hpMax;
            let newCurrent = prev.hpCurrent;
            
            if (diff > 0) {
                // Growth (Level up / Heal Max)
                newCurrent += diff;
            } else {
                // Decay (Radiation / Penalty) -> Clamp only if current exceeds new max
                newCurrent = Math.min(newCurrent, newMax);
            }

            return { 
                ...prev, 
                hpMax: newMax,
                hpCurrent: Math.max(0, newCurrent)
            };
        }
        return prev;
    });
  }, [char.class, char.level, char.attributes.CON, char.radiationLevel, char.exhaustion, char.equippedArtifacts]);

  const pb = useMemo(() => Math.ceil(char.level / 4) + 1, [char.level]);
  const ac = useMemo(() => calculateAC(char), [char.attributes.DEX, char.equipment, char.equippedArtifacts, char.talents, char.mutations, char.class]);
  const maxWeight = useMemo(() => calculateMaxWeight(char), [char.attributes.STR, char.attributes.CON, char.talents, char.traits, char.mutations, char.equipment.backpack, char.equipment.body, char.equippedArtifacts]);
  const currentWeight = useMemo(() => calculateCurrentWeight(char), [char.inventory]);
  
  const initiative = useMemo(() => {
      let init = getModifier(char.attributes.DEX);
      if (char.class === 'DPS' && char.talents.includes('dps_reflex')) init += pb; 
      if (char.traits.includes('trait_alert')) init += 5;
      if (char.mutations.includes('mut_living_shadow')) init -= 5;
      return init;
  }, [char.attributes.DEX, char.talents, char.traits, char.mutations, pb, char.class]);

  const speed = useMemo(() => {
      let spd = 30;
      const currentArmor = getItem(char.equipment.body);
      const isHeavy = (currentArmor as any)?.type === 'Heavy' || (currentArmor as any)?.type === 'Exo';

      if (char.talents.includes('gen_runner')) spd += 5;
      if (char.traits.includes('background_messenger') && !isHeavy) spd += 5; 
      if (char.mutations.includes('mut_hollow_bones')) spd += 10;
      
      if (isHeavy && !char.talents.includes('tank_tier3_3')) {
          if (currentArmor?.id === 'juggernaut') spd -= 10;
      }

      if (char.radiationLevel >= 2) spd = Math.floor(spd / 2);
      if (char.exhaustion >= 2) spd = Math.floor(spd / 2);
      if (char.exhaustion >= 5) spd = 0;
      if (char.conditions.includes('Fractura')) spd -= 10;
      return Math.max(0, spd);
  }, [char.talents, char.traits, char.mutations, char.equipment.body, char.radiationLevel, char.exhaustion, char.conditions]);

  const loadColor = currentWeight > maxWeight ? 'text-red-500' : 'text-gray-400';

  const updateAttr = (attr: Attribute, val: number) => {
    setChar(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [attr]: val }
    }));
  };

  const toggleProf = (attr: Attribute) => {
    setChar(prev => ({
      ...prev,
      proficiencies: prev.proficiencies.includes(attr) 
        ? prev.proficiencies.filter(p => p !== attr)
        : [...prev.proficiencies, attr]
    }));
  };
  
  const toggleSkill = (skillId: string) => {
    setChar(prev => ({
      ...prev,
      skillProficiencies: prev.skillProficiencies.includes(skillId) 
        ? prev.skillProficiencies.filter(s => s !== skillId)
        : [...prev.skillProficiencies, skillId]
    }));
  };

  const updateEquipment = (slot: keyof CharacterState['equipment'], value: string) => {
    setChar(prev => ({
      ...prev,
      equipment: { ...prev.equipment, [slot]: value }
    }));
  };

  const handleUpdateItem = (itemId: string, qty: number) => {
    setChar(prev => {
      const existingIdx = prev.inventory.findIndex(i => i.itemId === itemId);
      let newInventory = [...prev.inventory];
      let newEquipment = { ...prev.equipment };
      let newArtifacts = [...prev.equippedArtifacts];
      
      if (existingIdx >= 0) {
        const currentQty = newInventory[existingIdx].quantity;
        const nextQty = Math.max(0, currentQty + qty);
        
        newInventory[existingIdx] = { 
          ...newInventory[existingIdx], 
          quantity: nextQty
        };
        
        if (qty < 0) {
             const equippedCount = Object.values(newEquipment).filter(id => id === itemId).length;
             // BUG FIX: Also count artifacts
             const artifactCount = newArtifacts.filter(id => id === itemId).length;
             const totalEquipped = equippedCount + artifactCount;

             if (totalEquipped > nextQty) {
                 // Try to unequip from artifacts first
                 const artIndex = newArtifacts.findIndex(id => id === itemId);
                 if (artIndex >= 0) {
                     newArtifacts[artIndex] = null;
                 } else {
                     // Else unequip from body slots
                     const slotToClear = Object.keys(newEquipment).reverse().find(key => newEquipment[key as keyof CharacterState['equipment']] === itemId);
                     if (slotToClear) {
                         newEquipment[slotToClear as keyof CharacterState['equipment']] = null;
                     }
                 }
             }
        }

        if (nextQty === 0) {
            newInventory = newInventory.filter((_, i) => i !== existingIdx);
        }

      } else if (qty > 0) {
        newInventory.push({ itemId, quantity: qty });
      }
      return { ...prev, inventory: newInventory, equipment: newEquipment, equippedArtifacts: newArtifacts };
    });
  };

  const handleBuyItem = (item: any, type: string, free: boolean = false) => {
      const cost = item.price || item.cost || 0;
      if (!free && char.gold < cost) return;

      setChar(prev => {
          const newGold = free ? prev.gold : prev.gold - cost;
          const existingIdx = prev.inventory.findIndex(i => i.itemId === item.id);
          let newInventory = [...prev.inventory];

          if (existingIdx >= 0) {
              newInventory[existingIdx] = { 
                  ...newInventory[existingIdx], 
                  quantity: newInventory[existingIdx].quantity + 1 
              };
          } else {
              newInventory.push({ itemId: item.id, quantity: 1 });
          }

          return { ...prev, gold: newGold, inventory: newInventory };
      });
  };

  const handleToggleTalent = (id: string) => {
     setChar(prev => ({
         ...prev,
         talents: prev.talents.includes(id) 
            ? prev.talents.filter(t => t !== id) 
            : [...prev.talents, id]
     }));
  };

  // --- GENETIC OVERLOAD LOGIC ---
  const performEvolutionRoll = (cost: number, itemName: string, onSuccess: () => void) => {
      // 1. Calculate DC
      const dc = 10 + Math.floor(cost / 1000);

      // 2. Roll CON Save
      const d20 = Math.ceil(Math.random() * 20);
      const conMod = getModifier(char.attributes.CON);
      const profBonus = char.proficiencies.includes('CON') ? pb : 0;
      const total = d20 + conMod + profBonus;

      // 3. Evaluate
      if (total >= dc) {
          // SUCCESS
          setChar(prev => ({...prev, anomalousEssence: prev.anomalousEssence - cost}));
          onSuccess();
          alert(`✅ EVOLUCIÓN ESTABLE\n\nSalvación de Constitución: ${total} (CD ${dc})\n[Dado: ${d20} + Mod: ${conMod} + Prof: ${profBonus}]\n\nTu ADN ha asimilado: ${itemName}.`);
      } else {
          // FAILURE: Pay cost, Get Mutation, Get NO Item
          const availableMutations = MUTATIONS_CATALOG.filter(m => !char.mutations.includes(m.id));
          let mutationMsg = "Tu ADN es inestable, pero no hay más mutaciones conocidas disponibles.";
          
          let randomMutId: string | null = null;
          let randomMutName = "";

          if (availableMutations.length > 0) {
              const randomMut = availableMutations[Math.floor(Math.random() * availableMutations.length)];
              randomMutId = randomMut.id;
              randomMutName = randomMut.name;
              mutationMsg = `Has sufrido una mutación espontánea:\n>>> ${randomMut.name}`;
          }

          setChar(prev => ({
              ...prev,
              anomalousEssence: Math.max(0, prev.anomalousEssence - cost),
              mutations: randomMutId ? [...prev.mutations, randomMutId] : prev.mutations
          }));

          alert(`⚠ SOBRECARGA GENÉTICA (FALLO)\n\nSalvación de Constitución: ${total} (CD ${dc})\n[Dado: ${d20} + Mod: ${conMod} + Prof: ${profBonus}]\n\nTu cuerpo rechaza la mejora "${itemName}".\n${mutationMsg}`);
      }
  };

  const handleBuyTalent = (talent: Talent, free: boolean = false) => {
      const cost = talent.cost;
      if (!free && char.anomalousEssence < cost) return;

      if (free) {
          // GM Mode / Free: Bypass Roll
          setChar(prev => ({
            ...prev,
            anomalousEssence: prev.anomalousEssence,
            talents: [...prev.talents, talent.id]
          }));
          return;
      }

      performEvolutionRoll(cost, talent.name, () => {
          setChar(prev => ({ ...prev, talents: [...prev.talents, talent.id] }));
      });
  };

  const handleBuyAttribute = (attr: Attribute, free: boolean = false) => {
      const cost = 4000;
      if (!free && char.anomalousEssence < cost) return;

      if (free) {
        setChar(prev => ({
            ...prev,
            attributes: { ...prev.attributes, [attr]: prev.attributes[attr] + 1 }
        }));
        return;
      }

      performEvolutionRoll(cost, `+1 ${attr}`, () => {
          setChar(prev => ({
            ...prev,
            attributes: { ...prev.attributes, [attr]: prev.attributes[attr] + 1 }
          }));
      });
  };

  const handleBuySkill = (skillId: string, free: boolean = false) => {
      const cost = 1500;
      if (!free && char.anomalousEssence < cost) return;
      if (char.skillProficiencies.includes(skillId)) return;

      if (free) {
        setChar(prev => ({
            ...prev,
            skillProficiencies: [...prev.skillProficiencies, skillId]
        }));
        return;
      }

      // Find skill name for the alert
      const skillName = (document.querySelector(`[data-skill-id="${skillId}"]`)?.textContent) || "Habilidad"; // Fallback simple

      performEvolutionRoll(cost, "Competencia en Habilidad", () => {
          setChar(prev => ({
            ...prev,
            skillProficiencies: [...prev.skillProficiencies, skillId]
        }));
      });
  };

  const handleToggleTrait = (id: string) => {
    setChar(prev => {
        const isCurrentlyActive = prev.traits.includes(id);
        const trait = TRAITS_CATALOG.find(t => t.id === id);
        
        let essenceChange = 0;
        if (trait && trait.type === 'Negative') {
            // BUG FIX: Prevent removing Negative Trait if player spent the essence
            if (isCurrentlyActive && prev.anomalousEssence < 1000) {
                alert("⚠ ERROR GENÉTICO: No puedes eliminar este rasgo.\n\nLa Esencia Anómala (1000 EA) otorgada ya ha sido consumida en mutaciones. Debes tener al menos 1000 EA disponibles para purgar este trauma.");
                return prev; // Do nothing
            }
            essenceChange = isCurrentlyActive ? -1000 : 1000;
        }

        return {
            ...prev,
            anomalousEssence: Math.max(0, prev.anomalousEssence + essenceChange),
            traits: isCurrentlyActive 
            ? prev.traits.filter(t => t !== id) 
            : [...prev.traits, id]
        };
    });
 };

 const handleToggleMutation = (id: string) => {
     setChar(prev => ({
         ...prev,
         mutations: prev.mutations.includes(id)
            ? prev.mutations.filter(m => m !== id)
            : [...prev.mutations, id]
     }));
 };

 const handleChangeBackground = (bgId: string) => {
    setChar(prev => {
        const oldBgTrait = TRAITS_CATALOG.find(t => t.id === prev.background);
        let newTraits = [...prev.traits];
        if (oldBgTrait) {
            newTraits = newTraits.filter(t => t !== oldBgTrait.id);
        }
        if (bgId && !newTraits.includes(bgId)) {
            newTraits.push(bgId);
        }
        return {
            ...prev,
            background: bgId,
            traits: newTraits
        };
    });
 };

  const handleToggleCondition = (condId: string) => {
    setChar(prev => ({
        ...prev,
        conditions: prev.conditions.includes(condId)
           ? prev.conditions.filter(c => c !== condId)
           : [...prev.conditions, condId]
    }));
  };

  const handleEquipArtifact = (index: number, itemId: string) => {
      setChar(prev => {
          const newSlots = [...prev.equippedArtifacts];
          newSlots[index] = itemId;
          return { ...prev, equippedArtifacts: newSlots };
      });
  };

  const handleUnequipArtifact = (index: number) => {
    setChar(prev => {
        const newSlots = [...prev.equippedArtifacts];
        newSlots[index] = null;
        return { ...prev, equippedArtifacts: newSlots };
    });
  };

  const handleTogglePrepareSpell = (id: string) => {
      setChar(prev => {
          const isPrepared = prev.preparedSpells.includes(id);
          return {
              ...prev,
              preparedSpells: isPrepared 
                ? prev.preparedSpells.filter(s => s !== id)
                : [...prev.preparedSpells, id]
          };
      });
  };
  
  const getHitDie = (c: string) => {
      if (c === 'Tank') return 10;
      if (c === 'Support') return 8;
      if (c === 'DPS') return 6;
      return 6; 
  };

  const handleHitDieRecovery = () => {
      const die = getHitDie(char.class);
      const conMod = getModifier(char.attributes.CON);
      const roll = Math.ceil(Math.random() * die);
      const total = Math.max(1, roll + conMod);
      setChar(prev => ({
          ...prev, 
          hpCurrent: Math.min(prev.hpMax, prev.hpCurrent + total)
      }));
  };

  const handleReset = () => {
      if (window.confirm("¿Estás seguro de que deseas crear un nuevo personaje? Se borrarán los datos guardados.")) {
          setChar(INITIAL_CHAR);
          localStorage.removeItem('cdlz_character_v2'); 
      }
  };

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
      
      const reader = new FileReader();
      reader.onload = (evt) => {
          try {
              const parsed = JSON.parse(evt.target?.result as string);
              if (parsed.attributes && parsed.inventory) {
                  setChar({ ...INITIAL_CHAR, ...parsed });
              } else {
                  alert("El archivo no tiene el formato correcto.");
              }
          } catch (err) {
              alert("Error al leer el archivo. Asegúrate de que es un JSON válido.");
          }
      };
      reader.readAsText(file);
      e.target.value = ''; 
  };

  const handlePrint = () => {
      window.print();
  };

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

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-sans selection:bg-yellow-500 selection:text-black pb-20 print:bg-white print:text-black print:pb-0">
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".json" 
        style={{ display: 'none' }} 
      />

      {/* HEADER: Simplified */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 shadow-lg bg-opacity-95 backdrop-blur-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 flex-1">
                <div className="flex-none">
                    <h1 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-widest leading-none">CDLZ</h1>
                </div>

                {/* Name Input - Primary Header Focus */}
                <div className="flex-1 max-w-2xl bg-black/40 px-3 py-1.5 rounded border border-gray-700 focus-within:border-yellow-600 transition-colors">
                    <input 
                        className="bg-transparent border-none w-full text-lg md:text-xl font-bold text-white placeholder-gray-600 outline-none truncate" 
                        placeholder="NOMBRE DEL OPERATIVO"
                        value={char.name}
                        onChange={e => setChar(p => ({...p, name: e.target.value}))}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleReset}
                    className="p-2 text-gray-400 hover:text-white hover:bg-red-900/30 rounded border border-transparent hover:border-red-900/50 transition-colors"
                    title="Reset"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
                <button 
                    onClick={handleLoadClick}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors hidden sm:block"
                    title="Cargar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button 
                    onClick={handleSave}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    title="Guardar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                </button>
                <button 
                    onClick={handlePrint}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors hidden sm:block"
                    title="Imprimir"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                </button>
                <button 
                    onClick={() => setShowCompendium(true)}
                    className="ml-2 w-10 h-10 flex items-center justify-center bg-gray-800 text-cyan-500 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 transition-all"
                    title="Códice"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </button>
            </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 print:block print:p-0">
          
          {/* NEW: Identity Panel (Takes full width on top) */}
          <div className="lg:col-span-12 print:break-inside-avoid">
             <IdentityPanel 
                char={char} 
                onChange={(updates) => setChar(p => ({...p, ...updates}))} 
                onChangeBackground={handleChangeBackground}
             />
          </div>

          <div className="lg:col-span-3 space-y-6 print:mb-6">
              <div className="print:break-inside-avoid">
                  <h3 className="text-yellow-500 font-bold border-b border-gray-700 pb-2 mb-4 text-sm uppercase tracking-wider print:text-black print:border-black">Atributos</h3>
                  <div className="grid grid-cols-2 gap-2 print:grid-cols-3">
                      {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as Attribute[]).map(attr => (
                          <StatBox 
                            key={attr}
                            label={attr} 
                            attr={attr} 
                            value={char.attributes[attr]} 
                            proficient={char.proficiencies.includes(attr)}
                            pb={pb}
                            extraSaveMod={getSaveModifier(attr)}
                            onChange={(val) => updateAttr(attr, val)}
                            onToggleProf={() => toggleProf(attr)}
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
                      
                      {/* HP Bar Background */}
                      <div 
                        className="absolute bottom-0 left-0 h-1 bg-green-600 transition-all duration-500"
                        style={{ width: `${Math.min(100, (char.hpCurrent / char.hpMax) * 100)}%` }}
                      ></div>
                  </div>

                  <div className="mt-3 flex justify-between items-center print:hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">HP Temp</span>
                        <input 
                            type="number" 
                            className="w-10 bg-gray-800 text-center text-xs text-blue-300 border border-gray-700 rounded outline-none focus:border-blue-500"
                            value={char.hpTemp}
                            onChange={(e) => setChar(p => ({...p, hpTemp: Math.max(0, parseInt(e.target.value)||0)}))}
                        />
                      </div>
                      <button 
                        onClick={handleHitDieRecovery}
                        className="text-[10px] bg-gray-800 px-3 py-1.5 rounded text-green-400 border border-green-900 hover:bg-gray-700 flex items-center gap-1"
                        title={`Recupera 1d${getHitDie(char.class)} + CON`}
                      >
                          <span>🩹</span> Gastar DG (d{getHitDie(char.class)})
                      </button>
                  </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded p-3 grid grid-cols-2 gap-4 print:bg-transparent print:border-black print:text-black">
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Clase de Armadura</span>
                      <span className="text-2xl font-bold text-white font-mono flex items-baseline gap-1 print:text-black">
                          {ac} <span className="text-[10px] text-gray-600 font-sans font-normal print:text-gray-700">CA</span>
                      </span>
                  </div>
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Iniciativa</span>
                      <span className="text-2xl font-bold text-white font-mono flex items-baseline gap-1 print:text-black">
                          {initiative >= 0 ? `+${initiative}` : initiative}
                      </span>
                  </div>
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Velocidad</span>
                      <span className="text-2xl font-bold text-white font-mono flex items-baseline gap-1 print:text-black">
                          {speed} <span className="text-[10px] text-gray-600 font-sans font-normal print:text-gray-700">pies</span>
                      </span>
                  </div>
                  <div>
                      <span className="block text-[10px] text-gray-500 uppercase print:text-gray-700">Bono Competencia</span>
                      <span className="text-2xl font-bold text-yellow-500 font-mono flex items-baseline gap-1 print:text-black">
                          +{pb}
                      </span>
                  </div>
                  <div className="col-span-2 border-t border-gray-800 pt-2">
                      <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-gray-500 uppercase print:text-gray-700">Carga Actual</span>
                           <span className={`text-xl font-bold font-mono flex items-baseline gap-1 ${loadColor} print:text-black`}>
                              {currentWeight} <span className="text-gray-500 text-sm">/ {maxWeight} lbs</span>
                          </span>
                      </div>
                      <div className="w-full bg-gray-800 h-1.5 mt-1 rounded-full overflow-hidden">
                          <div 
                              className={`h-full ${currentWeight > maxWeight ? 'bg-red-600' : 'bg-gray-500'}`} 
                              style={{ width: `${Math.min(100, (currentWeight / maxWeight) * 100)}%` }}
                          ></div>
                      </div>
                  </div>
              </div>

              <div className="print:break-inside-avoid">
                  <SkillsPanel char={char} onToggleSkill={toggleSkill} pb={pb} />
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
                    inventory={char.inventory} 
                    gold={char.gold} 
                    onUpdateItem={handleUpdateItem} 
                    onUpdateGold={(v) => setChar(p => ({...p, gold: v}))}
                    onOpenShop={() => setShowGeneralStore(true)}
                />
              </div>

              <div className="print:break-inside-avoid">
                <PaperDoll char={char} updateEquipment={updateEquipment} />
              </div>
              
              <div className="print:break-inside-avoid">
                <ArtifactSlots 
                    char={char} 
                    onEquipArtifact={handleEquipArtifact}
                    onUnequipArtifact={handleUnequipArtifact}
                />
              </div>

              {char.class === 'Support' && (
                  <div className="print:break-inside-avoid">
                    <SpellsPanel 
                        intScore={char.attributes.INT} 
                        profBonus={pb} 
                        level={char.level}
                        preparedSpells={char.preparedSpells}
                        onTogglePrepare={handleTogglePrepareSpell}
                    />
                  </div>
              )}
          </div>

          <div className="lg:col-span-4 space-y-6 print:mb-6">
              
              <div className="print:break-inside-avoid">
                <TalentsPanel 
                    activeTalents={char.talents} 
                    activeTraits={char.traits} 
                    activeMutations={char.mutations}
                    onToggleTalent={handleToggleTalent}
                    onToggleTrait={handleToggleTrait}
                    onToggleMutation={handleToggleMutation}
                    onOpenStore={() => setShowTalentStore(true)}
                    onOpenMutationStore={() => setShowMutationStore(true)}
                    onOpenTraitStore={() => setShowTraitStore(true)}
                />
              </div>

              <div className="space-y-4 print:break-inside-avoid">
                  {/* Conditions Panel (Replacing old list) */}
                  <ConditionsPanel activeConditions={char.conditions} onToggle={handleToggleCondition} />

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
            char={char} 
            onBuyTalent={handleBuyTalent} 
            onBuyAttribute={handleBuyAttribute}
            onBuySkill={handleBuySkill}
            onClose={() => setShowTalentStore(false)} 
          />
      )}

      {showGeneralStore && (
          <GeneralStore 
            char={char} 
            onBuyItem={handleBuyItem} 
            onClose={() => setShowGeneralStore(false)} 
          />
      )}

      {showMutationStore && (
          <MutationStore 
            char={char} 
            onToggleMutation={handleToggleMutation}
            onClose={() => setShowMutationStore(false)} 
          />
      )}

      {showTraitStore && (
          <TraitStore 
            char={char} 
            onToggleTrait={handleToggleTrait}
            onClose={() => setShowTraitStore(false)} 
          />
      )}

      {showCompendium && (
          <Compendium onClose={() => setShowCompendium(false)} />
      )}
    </div>
  );
}
