import { describe, it, expect } from 'vitest';
import { calculateMaxWeight } from './utils';
import { CharacterState } from './types';

const createTestChar = (overrides: Partial<CharacterState> = {}): CharacterState => ({
  name: 'Test',
  player: 'Test',
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

describe('Bug Tests - Weight Calculation with MULE Exo (FIXED)', () => {
  it('FIXED: Gen Mule talent now works correctly with MULE exo', () => {
    // Without MULE exo: (10+10) + 20 (gen_mule) = 40
    const withoutExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
    });
    expect(calculateMaxWeight(withoutExo)).toBe(40);

    // With MULE exo: (19+10) + 20 (gen_mule) = 49 ✅ FIXED
    const withExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });

    const result = calculateMaxWeight(withExo);
    expect(result).toBe(49); // ✅ Now works correctly!
  });

  it('FIXED: Fragile Bones trait now works correctly with MULE exo', () => {
    // Without MULE exo: (10+10) - 10 (fragile) = 10
    const withoutExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      traits: ['trait_fragile'],
    });
    expect(calculateMaxWeight(withoutExo)).toBe(10);

    // With MULE exo: (19+10) - 10 (fragile) = 19 ✅ FIXED
    const withExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      traits: ['trait_fragile'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });

    const result = calculateMaxWeight(withExo);
    expect(result).toBe(19); // ✅ Now works correctly!
  });

  it('FIXED: Both Gen Mule and Fragile Bones now work with MULE exo', () => {
    // With both: (19+10) + 20 (mule) - 10 (fragile) = 39 ✅ FIXED
    const char = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
      traits: ['trait_fragile'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });

    const result = calculateMaxWeight(char);
    expect(result).toBe(39); // ✅ Now works correctly!
  });

  it('REGRESSION: MULE exo still works without talents/traits', () => {
    // Base case: (19+10) = 29
    const char = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });
    expect(calculateMaxWeight(char)).toBe(29);
  });

  it('REGRESSION: MULE exo with high STR uses actual STR', () => {
    // STR 20 > 19, so use actual: (20+10) = 30
    const char = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 20, CON: 10 },
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });
    expect(calculateMaxWeight(char)).toBe(30);
  });

  it('COMPLEX: All modifiers stack correctly', () => {
    // MULE (19+10) + Gen Mule (+20) + Backpack Assault (+45) + Gravity Stone (+50) = 144
    const char = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo', backpack: 'assault' },
      equippedArtifacts: ['guijarro_grav', null, null, null, null, null],
    });
    expect(calculateMaxWeight(char)).toBe(144);
  });
});
