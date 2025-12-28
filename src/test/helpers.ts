import { CharacterState } from '../types';

/**
 * Creates a minimal test character with sane defaults.
 * Override any properties as needed for your tests.
 */
export const createTestCharacter = (overrides: Partial<CharacterState> = {}): CharacterState => ({
  name: 'Test Character',
  player: 'Test Player',
  class: 'Tank',
  level: 1,
  background: '',
  xp: 0,
  notes: '',
  attributes: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
  proficiencies: [],
  skillProficiencies: [],
  hpCurrent: 10,
  hpMax: 10,
  hpTemp: 0,
  radiationLevel: 0,
  magicStress: 0,
  exhaustion: 0,
  conditions: [],
  anomalousEssence: 0,
  equipment: {
    head: null,
    face: null,
    eyes: null,
    ears: null,
    body: null,
    rig: null,
    backpack: null,
    weaponPrimary: null,
    weaponSecondary: null,
    weaponMelee: null,
  },
  equippedArtifacts: [null, null, null, null, null, null],
  inventory: [],
  gold: 0,
  talents: [],
  traits: [],
  mutations: [],
  preparedSpells: [],
  ...overrides,
});

/**
 * Creates a Tank character at a specific level with appropriate stats
 */
export const createTankCharacter = (level: number = 1): CharacterState => {
  return createTestCharacter({
    class: 'Tank',
    level,
    attributes: { STR: 16, DEX: 10, CON: 14, INT: 8, WIS: 10, CHA: 8 },
  });
};

/**
 * Creates a DPS character at a specific level with appropriate stats
 */
export const createDPSCharacter = (level: number = 1): CharacterState => {
  return createTestCharacter({
    class: 'DPS',
    level,
    attributes: { STR: 10, DEX: 18, CON: 12, INT: 10, WIS: 12, CHA: 8 },
  });
};

/**
 * Creates a Support character at a specific level with appropriate stats
 */
export const createSupportCharacter = (level: number = 1): CharacterState => {
  return createTestCharacter({
    class: 'Support',
    level,
    attributes: { STR: 8, DEX: 12, CON: 12, INT: 14, WIS: 16, CHA: 10 },
  });
};

/**
 * Mock localStorage for testing
 */
export class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

/**
 * Sets up mock localStorage for tests
 */
export const setupMockLocalStorage = (): MockLocalStorage => {
  const mockStorage = new MockLocalStorage();
  global.localStorage = mockStorage as any;
  return mockStorage;
};
