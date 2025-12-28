
import { useState, useEffect, useMemo } from 'react';
import { CharacterState, Attribute, Talent } from '../types';
import { TRAITS_CATALOG, MUTATIONS_CATALOG } from '../constants';
import { getModifier, calculateAC, calculateMaxWeight, calculateCurrentWeight, calculateMaxHP, getItem } from '../utils';

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

export const useCharacter = () => {
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

  // --- PERSISTENCE ---
  useEffect(() => {
      const timeoutId = setTimeout(() => {
          localStorage.setItem('cdlz_character_v2', JSON.stringify(char));
      }, 500);
      return () => clearTimeout(timeoutId);
  }, [char]);

  // --- ARTIFACT SLOTS CLEANUP ---
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

  // --- HP CALCULATION LOGIC ---
  useEffect(() => {
    setChar(prev => {
        const newMax = calculateMaxHP(prev);
        if (newMax !== prev.hpMax) {
            const diff = newMax - prev.hpMax;
            let newCurrent = prev.hpCurrent;
            
            if (diff > 0) {
                newCurrent += diff;
            } else {
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

  // --- DERIVED STATS ---
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

  // --- ACTIONS ---

  const updateAttr = (attr: Attribute, val: number) => {
    setChar(prev => ({ ...prev, attributes: { ...prev.attributes, [attr]: val } }));
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
    setChar(prev => ({ ...prev, equipment: { ...prev.equipment, [slot]: value } }));
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
        
        newInventory[existingIdx] = { ...newInventory[existingIdx], quantity: nextQty };
        
        if (qty < 0) {
             const equippedCount = Object.values(newEquipment).filter(id => id === itemId).length;
             const artifactCount = newArtifacts.filter(id => id === itemId).length;
             const totalEquipped = equippedCount + artifactCount;

             if (totalEquipped > nextQty) {
                 const artIndex = newArtifacts.findIndex(id => id === itemId);
                 if (artIndex >= 0) {
                     newArtifacts[artIndex] = null;
                 } else {
                     const slotToClear = Object.keys(newEquipment).reverse().find(key => newEquipment[key as keyof CharacterState['equipment']] === itemId);
                     if (slotToClear) {
                         newEquipment[slotToClear as keyof CharacterState['equipment']] = null;
                     }
                 }
             }
        }
        if (nextQty === 0) newInventory = newInventory.filter((_, i) => i !== existingIdx);

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
              newInventory[existingIdx] = { ...newInventory[existingIdx], quantity: newInventory[existingIdx].quantity + 1 };
          } else {
              newInventory.push({ itemId: item.id, quantity: 1 });
          }
          return { ...prev, gold: newGold, inventory: newInventory };
      });
  };

  const performEvolutionRoll = (cost: number, itemName: string, onSuccess: () => void) => {
      const dc = 10 + Math.floor(cost / 1000);
      const d20 = Math.ceil(Math.random() * 20);
      const conMod = getModifier(char.attributes.CON);
      const profBonus = char.proficiencies.includes('CON') ? pb : 0;
      // Check for Glass Skin mutation (proficiency in CON saves) if applied manually or automatically
      const total = d20 + conMod + profBonus;

      if (total >= dc) {
          setChar(prev => ({...prev, anomalousEssence: prev.anomalousEssence - cost}));
          onSuccess();
          alert(`✅ EVOLUCIÓN ESTABLE\n\nSalvación de Constitución: ${total} (CD ${dc})\n[Dado: ${d20} + Mod: ${conMod} + Prof: ${profBonus}]\n\nTu ADN ha asimilado: ${itemName}.`);
      } else {
          const availableMutations = MUTATIONS_CATALOG.filter(m => !char.mutations.includes(m.id));
          let mutationMsg = "Tu ADN es inestable, pero no hay más mutaciones conocidas disponibles.";
          
          let randomMutId: string | null = null;
          if (availableMutations.length > 0) {
              const randomMut = availableMutations[Math.floor(Math.random() * availableMutations.length)];
              randomMutId = randomMut.id;
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
          setChar(prev => ({ ...prev, anomalousEssence: prev.anomalousEssence, talents: [...prev.talents, talent.id] }));
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
        setChar(prev => ({ ...prev, attributes: { ...prev.attributes, [attr]: prev.attributes[attr] + 1 } }));
        return;
      }
      performEvolutionRoll(cost, `+1 ${attr}`, () => {
          setChar(prev => ({ ...prev, attributes: { ...prev.attributes, [attr]: prev.attributes[attr] + 1 } }));
      });
  };

  const handleBuySkill = (skillId: string, free: boolean = false) => {
      const cost = 1500;
      if (!free && char.anomalousEssence < cost) return;
      if (char.skillProficiencies.includes(skillId)) return;
      if (free) {
        setChar(prev => ({ ...prev, skillProficiencies: [...prev.skillProficiencies, skillId] }));
        return;
      }
      performEvolutionRoll(cost, "Competencia en Habilidad", () => {
          setChar(prev => ({ ...prev, skillProficiencies: [...prev.skillProficiencies, skillId] }));
      });
  };

  const handleToggleTrait = (id: string) => {
    setChar(prev => {
        const isCurrentlyActive = prev.traits.includes(id);
        const trait = TRAITS_CATALOG.find(t => t.id === id);
        let essenceChange = 0;
        if (trait && trait.type === 'Negative') {
            if (isCurrentlyActive && prev.anomalousEssence < 1000) {
                alert("⚠ ERROR GENÉTICO: No puedes eliminar este rasgo.\n\nLa Esencia Anómala (1000 EA) otorgada ya ha sido consumida.");
                return prev;
            }
            essenceChange = isCurrentlyActive ? -1000 : 1000;
        }
        return {
            ...prev,
            anomalousEssence: Math.max(0, prev.anomalousEssence + essenceChange),
            traits: isCurrentlyActive ? prev.traits.filter(t => t !== id) : [...prev.traits, id]
        };
    });
 };

 const handleToggleMutation = (id: string) => {
     setChar(prev => ({
         ...prev,
         mutations: prev.mutations.includes(id) ? prev.mutations.filter(m => m !== id) : [...prev.mutations, id]
     }));
 };

 const handleChangeBackground = (bgId: string) => {
    setChar(prev => {
        const oldBgTrait = TRAITS_CATALOG.find(t => t.id === prev.background);
        let newTraits = [...prev.traits];
        if (oldBgTrait) newTraits = newTraits.filter(t => t !== oldBgTrait.id);
        if (bgId && !newTraits.includes(bgId)) newTraits.push(bgId);
        return { ...prev, background: bgId, traits: newTraits };
    });
 };

  const handleToggleCondition = (condId: string) => {
    setChar(prev => ({
        ...prev,
        conditions: prev.conditions.includes(condId) ? prev.conditions.filter(c => c !== condId) : [...prev.conditions, condId]
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
              preparedSpells: isPrepared ? prev.preparedSpells.filter(s => s !== id) : [...prev.preparedSpells, id]
          };
      });
  };

  const handleHitDieRecovery = () => {
      const getHitDie = (c: string) => {
        if (c === 'Tank') return 10;
        if (c === 'Support') return 8;
        return 6; 
      };
      const die = getHitDie(char.class);
      const conMod = getModifier(char.attributes.CON);
      const roll = Math.ceil(Math.random() * die);
      const total = Math.max(1, roll + conMod);
      setChar(prev => ({ ...prev, hpCurrent: Math.min(prev.hpMax, prev.hpCurrent + total) }));
  };

  const handleReset = () => {
      if (window.confirm("¿Estás seguro de que deseas crear un nuevo personaje? Se borrarán los datos guardados.")) {
          setChar(INITIAL_CHAR);
          localStorage.removeItem('cdlz_character_v2'); 
      }
  };

  const handleLoadChar = (loadedChar: CharacterState) => {
      setChar(loadedChar);
  };

  const handleToggleTalent = (id: string) => {
     setChar(prev => ({
         ...prev,
         talents: prev.talents.includes(id) ? prev.talents.filter(t => t !== id) : [...prev.talents, id]
     }));
  };

  return {
      char,
      setChar,
      derived: { pb, ac, maxWeight, currentWeight, initiative, speed },
      actions: {
          updateAttr, toggleProf, toggleSkill, updateEquipment, handleUpdateItem,
          handleBuyItem, handleBuyTalent, handleBuyAttribute, handleBuySkill,
          handleToggleTrait, handleToggleMutation, handleChangeBackground,
          handleToggleCondition, handleEquipArtifact, handleUnequipArtifact,
          handleTogglePrepareSpell, handleHitDieRecovery, handleReset, handleLoadChar, handleToggleTalent
      }
  };
};
