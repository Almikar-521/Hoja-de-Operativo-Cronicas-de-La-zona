
import { CharacterState, Armor } from './types';
import { ARMOR_CATALOG, WEAPONS_CATALOG, ITEMS_CATALOG, HEAD_CATALOG, FACE_CATALOG, EYES_CATALOG, EARS_CATALOG, RIG_CATALOG, BACKPACK_CATALOG } from './constants';

// --- OPTIMIZATION: UNIFIED ITEM INDEX (O(1) Lookup) ---
// Instead of searching 9 arrays every time we need an item, we create a single Map once.
const ALL_ITEMS = [
    ...ITEMS_CATALOG,
    ...WEAPONS_CATALOG,
    ...ARMOR_CATALOG,
    ...HEAD_CATALOG,
    ...FACE_CATALOG,
    ...EYES_CATALOG,
    ...EARS_CATALOG,
    ...RIG_CATALOG,
    ...BACKPACK_CATALOG
];

// Create a Map for instant access by ID
const ITEM_MAP = new Map(ALL_ITEMS.map(item => [item.id, item]));

export const getItem = (id: string | null) => {
    if (!id) return null;
    return ITEM_MAP.get(id) || null;
};

export const getArmorStats = (id: string | null): Armor => {
    const item = getItem(id);
    // Type guard / Fallback
    if (item && (item as any).acBase !== undefined) {
        return item as Armor;
    }
    // Return a dummy default armor if not found or not armor
    return ARMOR_CATALOG[0]; 
};

// --- END OPTIMIZATION ---

export const getModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const formatModifier = (score: number): string => {
  const mod = getModifier(score);
  return mod >= 0 ? `+${mod}` : `${mod}`;
};

export const calculateAC = (char: CharacterState): number => {
  const dexMod = getModifier(char.attributes.DEX);
  const armor = getArmorStats(char.equipment.body);

  let ac = armor.acBase;

  // Add Dex mod respecting Max Dex of armor
  if (armor.dexBonus === 99) {
    ac += dexMod;
  } else {
    ac += Math.min(dexMod, armor.dexBonus);
  }
  
  // Talent Bonuses logic
  if (char.class === 'Tank' && char.talents.includes('tank_tier1_1')) { // Piel de Mutante
      ac += 1;
  }
  
  return ac;
};

export const calculateMaxHP = (char: CharacterState): number => {
    const conMod = getModifier(char.attributes.CON);
    
    // Progression Table from PDF Section 3
    const progression = {
        Tank:    [0, 10, 15, 20, 26, 32, 39, 46, 54, 62, 71],
        DPS:     [0, 6, 10, 14, 19, 24, 30, 36, 43, 50, 58],
        Support: [0, 8, 12, 16, 21, 26, 32, 38, 45, 52, 60]
    };

    const classProgression = progression[char.class] || progression.Tank;
    const levelIndex = Math.min(char.level, 10);
    const baseHP = classProgression[levelIndex];

    // HP = Base (from table) + (CON Mod * Level)
    let total = baseHP + (conMod * char.level);
    
    // Minimum 1 HP per level safety
    let maxHP = Math.max(char.level, total);

    // --- AUTOMATION: Radiation Level 4 ---
    if (char.radiationLevel >= 4) {
        maxHP = Math.floor(maxHP / 2);
    }

    // --- AUTOMATION: Exhaustion Level 4 ---
    if (char.exhaustion >= 4) {
        maxHP = Math.floor(maxHP / 2);
    }

    return maxHP;
};

export const calculateMaxWeight = (char: CharacterState): number => {
  const str = char.attributes.STR;
  const con = char.attributes.CON;
  
  // Capacidad de Carga Base (Hardcore): Fuerza + Constitución.
  let base = str + con;

  // Talent: Gen Mule (+20 lbs)
  if (char.talents.includes('gen_mule')) {
      base += 20;
  }

  // Trait: Huesos de Cristal
  if (char.traits.includes('trait_fragile')) {
      base -= 10;
  }

  let backpackBonus = 0;
  // Get Backpack item effect or hardcoded check
  if (char.equipment.backpack === 'sling') backpackBonus = 25;
  if (char.equipment.backpack === 'berkut') backpackBonus = 35;
  if (char.equipment.backpack === 'assault') backpackBonus = 45;
  if (char.equipment.backpack === 'pilgrim') backpackBonus = 55;
  if (char.equipment.backpack === 'expedition') backpackBonus = 70;
  if (char.equipment.backpack === 'mule') backpackBonus = 90;
  if (char.equipment.backpack === 'anomala') backpackBonus = 999; 

  // Mule Exo override
  if (char.equipment.body === 'mule_exo') {
      const effectiveStr = Math.max(str, 19);
      base = effectiveStr + con;
  }
  
  // Grav Stone Artifact (+50 lbs)
  if (char.equippedArtifacts.includes('grav_stone')) {
      base += 50;
  }

  return base + backpackBonus;
};

export const calculateCurrentWeight = (char: CharacterState): number => {
    let weight = 0;

    // OPTIMIZED: Use Map lookup instead of array.find
    char.inventory.forEach(slot => {
        const item = getItem(slot.itemId);
        if (item) {
            weight += (item.weight || 0) * slot.quantity;
        }
    });

    return Math.round(weight * 10) / 10;
};

export const calculateSpellSlots = (level: number): number[] => {
    const slots = [
        [0,0,0,0,0,0,0,0,0], // Lvl 0
        [2,0,0,0,0,0,0,0,0], // Lvl 1
        [3,0,0,0,0,0,0,0,0], // Lvl 2
        [4,2,0,0,0,0,0,0,0], // Lvl 3
        [4,3,0,0,0,0,0,0,0], // Lvl 4
        [4,3,2,0,0,0,0,0,0], // Lvl 5
        [4,3,3,0,0,0,0,0,0], // Lvl 6
        [4,3,3,1,0,0,0,0,0], // Lvl 7
        [4,3,3,2,0,0,0,0,0], // Lvl 8
        [4,3,3,3,1,0,0,0,0], // Lvl 9
        [4,3,3,3,2,0,0,0,0], // Lvl 10
        [4,3,3,3,2,1,0,0,0], // Lvl 11+
    ];
    
    const index = Math.min(level, 11);
    return slots[index] || slots[slots.length-1];
};

export const calculateMaxCantrips = (level: number): number => {
    if (level < 4) return 2;
    if (level < 7) return 3;
    if (level < 10) return 4;
    return 5;
};
