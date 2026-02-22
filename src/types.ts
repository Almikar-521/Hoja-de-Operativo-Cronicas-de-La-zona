
export type Attribute = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type ClassType = 'Tank' | 'DPS' | 'Support';

export interface Skill {
  id: string;
  name: string;
  attr: Attribute;
}

export interface Weapon {
  id: string;
  name: string;
  type: 'Pistola' | 'Subfusil' | 'Escopeta' | 'Rifle Asalto' | 'DMR' | 'Sniper' | 'Melee' | 'LMG' | 'Lanzador' | 'Especial' | 'Anomala';
  damage: string;
  damageType: string;
  range: string;
  weight: number; 
  properties: string[];
  rarity: 'Civil' | 'Caceria' | 'Táctica' | 'Legendaria' | 'Anomala' | 'Chatarra';
  price: number;
}

export interface Armor {
  id: string;
  name: string;
  type: 'Light' | 'Medium' | 'Heavy' | 'Exo';
  acBase: number; 
  dexBonus: number; 
  weight: number;
  ra: number; // Ranuras de Artefactos
  rarity: string;
  stealthDisadvantage: boolean;
  price: number;
  effect?: string;
}

export interface Item {
  id: string;
  name: string;
  type: 'Medical' | 'Food' | 'Ammo' | 'Explosive' | 'Tech' | 'Valuable' | 'Artifact' | 'Trophy' | 'Tool' | 'Vehicle' | 'Base' | 'Anomala';
  weight: number;
  effect?: string;
  cost: number; // In PO
  maxStack: number;
  tier?: number;
}

export interface Talent {
  id: string;
  name: string;
  type: 'Tank' | 'DPS' | 'Support' | 'General';
  tier: 1 | 2 | 3;
  description: string;
  benefit: string;
  cost: number; // EA Cost
}

export interface Trait {
  id: string;
  name: string;
  type: 'Positive' | 'Negative' | 'Background';
  description: string;
  effect: string;
  grantsProficiency?: string[]; // IDs of skills
}

export interface Mutation {
    id: string;
    name: string;
    type: 'Corporeal' | 'Psionic' | 'Cosmic';
    effect: string;
    downside?: string;
}

export interface Protocol {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  description: string;
  effect: string;
}

export interface CharacterState {
  name: string;
  player: string;
  class: ClassType;
  level: number;
  background: string; // Background ID
  xp: number;
  notes: string; // Biography or Mission Notes
  
  attributes: Record<Attribute, number>;
  proficiencies: Attribute[]; 
  skillProficiencies: string[]; 
  
  hpCurrent: number;
  hpMax: number;
  hpTemp: number;
  
  // Status mechanics
  radiationLevel: number; // 0-5
  magicStress: number; // 0-6 (For Support casting)
  exhaustion: number; // 0-6
  conditions: string[]; 
  anomalousEssence: number;
  
  // Inventory Slots (Equipped)
  equipment: {
    head: string | null;
    face: string | null; // New Slot for Masks
    eyes: string | null;
    ears: string | null;
    body: string | null; // Armor
    rig: string | null;
    backpack: string | null;
    weaponPrimary: string | null;
    weaponSecondary: string | null;
    weaponMelee: string | null;
  };
  
  // Artifact Slots (Managed separately but linked to Armor RA)
  equippedArtifacts: (string | null)[]; 

  // Loose Inventory
  inventory: { itemId: string; quantity: number }[];
  gold: number; // PO

  // Progression
  talents: string[]; // List of Talent IDs
  traits: string[]; // List of Trait IDs
  mutations: string[]; // List of Mutation IDs
  preparedSpells: string[]; // List of Protocol IDs selected by the user
}