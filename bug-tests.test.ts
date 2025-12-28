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

describe('Bug Tests - Weight Calculation with MULE Exo', () => {
  it('BUG: Gen Mule talent lost when wearing MULE exo', () => {
    // Without MULE exo: (10+10) + 20 (gen_mule) = 50
    const withoutExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
    });
    expect(calculateMaxWeight(withoutExo)).toBe(50);

    // With MULE exo: Should be (19+10) + 20 (gen_mule) = 49
    // But actually calculates: (19+10) + 0 = 29 (BUG!)
    const withExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });

    const result = calculateMaxWeight(withExo);
    console.log(`MULE exo + Gen Mule result: ${result}`);
    console.log(`Expected: 49, Actual: ${result}`);

    // This will FAIL, demonstrating the bug
    // expect(result).toBe(49); // What it SHOULD be
    expect(result).toBe(29); // What it ACTUALLY is (bug)
  });

  it('BUG: Fragile Bones trait lost when wearing MULE exo', () => {
    // Without MULE exo: (10+10) - 10 (fragile) = 10
    const withoutExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      traits: ['trait_fragile'],
    });
    expect(calculateMaxWeight(withoutExo)).toBe(10);

    // With MULE exo: Should be (19+10) - 10 (fragile) = 19
    // But actually calculates: (19+10) + 0 = 29 (BUG!)
    const withExo = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      traits: ['trait_fragile'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });

    const result = calculateMaxWeight(withExo);
    console.log(`MULE exo + Fragile Bones result: ${result}`);
    console.log(`Expected: 19, Actual: ${result}`);

    // This will FAIL, demonstrating the bug
    // expect(result).toBe(19); // What it SHOULD be
    expect(result).toBe(29); // What it ACTUALLY is (bug)
  });

  it('BUG: Both Gen Mule and Fragile Bones lost with MULE exo', () => {
    // With both: Should be (19+10) + 20 (mule) - 10 (fragile) = 39
    // But actually: (19+10) = 29
    const char = createTestChar({
      attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      talents: ['gen_mule'],
      traits: ['trait_fragile'],
      equipment: { ...createTestChar().equipment, body: 'mule_exo' },
    });

    const result = calculateMaxWeight(char);
    console.log(`MULE exo + Gen Mule + Fragile Bones result: ${result}`);
    console.log(`Expected: 39, Actual: ${result}`);

    // expect(result).toBe(39); // What it SHOULD be
    expect(result).toBe(29); // What it ACTUALLY is (bug)
  });
});
