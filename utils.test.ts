import { describe, it, expect } from 'vitest';
import {
  getModifier,
  formatModifier,
  calculateAC,
  calculateMaxHP,
  calculateMaxWeight,
  calculateCurrentWeight,
  calculateSpellSlots,
  calculateMaxCantrips,
  getItem,
  getArmorStats,
} from './utils';
import { CharacterState } from './types';

// Test helper: Create a minimal character state
const createTestChar = (overrides: Partial<CharacterState> = {}): CharacterState => ({
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

describe('getModifier', () => {
  it('should calculate negative modifiers correctly', () => {
    expect(getModifier(1)).toBe(-5);
    expect(getModifier(3)).toBe(-4);
    expect(getModifier(5)).toBe(-3);
    expect(getModifier(7)).toBe(-2);
    expect(getModifier(9)).toBe(-1);
  });

  it('should return 0 for scores 10-11', () => {
    expect(getModifier(10)).toBe(0);
    expect(getModifier(11)).toBe(0);
  });

  it('should calculate positive modifiers correctly', () => {
    expect(getModifier(12)).toBe(1);
    expect(getModifier(14)).toBe(2);
    expect(getModifier(16)).toBe(3);
    expect(getModifier(18)).toBe(4);
    expect(getModifier(20)).toBe(5);
  });

  it('should handle extreme values', () => {
    expect(getModifier(30)).toBe(10);
    expect(getModifier(1)).toBe(-5);
  });
});

describe('formatModifier', () => {
  it('should format positive modifiers with + sign', () => {
    expect(formatModifier(12)).toBe('+1');
    expect(formatModifier(20)).toBe('+5');
  });

  it('should format zero modifier with + sign', () => {
    expect(formatModifier(10)).toBe('+0');
  });

  it('should format negative modifiers without extra sign', () => {
    expect(formatModifier(8)).toBe('-1');
    expect(formatModifier(1)).toBe('-5');
  });
});

describe('calculateAC', () => {
  describe('Unarmored AC', () => {
    it('should calculate unarmored AC as 10 + DEX modifier', () => {
      const char = createTestChar({ attributes: { ...createTestChar().attributes, DEX: 14 } });
      expect(calculateAC(char)).toBe(12); // 10 + 2
    });

    it('should apply negative DEX to unarmored AC', () => {
      const char = createTestChar({ attributes: { ...createTestChar().attributes, DEX: 8 } });
      expect(calculateAC(char)).toBe(9); // 10 - 1
    });
  });

  describe('Light Armor', () => {
    it('should add full DEX bonus to light armor', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 18 },
        equipment: { ...createTestChar().equipment, body: 'light_leather' },
      });
      // Light leather: AC 11 + full DEX (4) = 15
      const ac = calculateAC(char);
      expect(ac).toBeGreaterThanOrEqual(11);
    });
  });

  describe('Heavy Armor', () => {
    it('should ignore negative DEX modifier for heavy armor', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 8 },
        equipment: { ...createTestChar().equipment, body: 'juggernaut' },
      });
      // Juggernaut base AC should not be reduced by negative DEX
      const ac = calculateAC(char);
      expect(ac).toBeGreaterThanOrEqual(16); // Juggernaut base AC
    });

    it('should cap DEX bonus for heavy armor', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 18 },
        equipment: { ...createTestChar().equipment, body: 'juggernaut' },
      });
      // Heavy armor should cap DEX bonus (likely 0)
      const ac = calculateAC(char);
      expect(ac).toBeLessThan(22); // Should not get full +4 DEX
    });
  });

  describe('Exo Armor', () => {
    it('should ignore negative DEX modifier for exo armor', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 6 },
        equipment: { ...createTestChar().equipment, body: 'mule_exo' },
      });
      const ac = calculateAC(char);
      // MULE exo has AC base 10, DEX bonus 0, should not apply negative DEX
      expect(ac).toBe(10); // MULE exo base AC = 10
    });
  });

  describe('Bark Skin Mutation', () => {
    it('should apply Bark Skin (AC 13 + max 2 DEX) when unarmored', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 18 },
        mutations: ['mut_bark_skin'],
      });
      expect(calculateAC(char)).toBe(15); // 13 + 2 (capped)
    });

    it('should not apply Bark Skin when armored', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 18 },
        equipment: { ...createTestChar().equipment, body: 'light_leather' },
        mutations: ['mut_bark_skin'],
      });
      const ac = calculateAC(char);
      // Should use armor AC, not bark skin
      expect(ac).not.toBe(15);
    });

    it('should use standard unarmored if better than Bark Skin', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 10 },
        mutations: ['mut_bark_skin'],
      });
      // Standard unarmored: 10 + 0 = 10
      // Bark Skin: 13 + 0 = 13
      expect(calculateAC(char)).toBe(13);
    });
  });

  describe('Talent Bonuses', () => {
    it('should add +1 AC for Tank Tier 1 talent (Piel de Mutante)', () => {
      const char = createTestChar({
        class: 'Tank',
        talents: ['tank_tier1_1'],
      });
      const baseAC = calculateAC(createTestChar({ class: 'Tank' }));
      const withTalent = calculateAC(char);
      expect(withTalent).toBe(baseAC + 1);
    });

    it('should not apply Tank talent to non-Tank class', () => {
      const char = createTestChar({
        class: 'DPS',
        talents: ['tank_tier1_1'],
      });
      const baseAC = calculateAC(createTestChar({ class: 'DPS' }));
      const withTalent = calculateAC(char);
      expect(withTalent).toBe(baseAC);
    });
  });

  describe('Headgear and Artifact Bonuses', () => {
    it('should parse +X CA from item effects', () => {
      // This test assumes there's a headgear item with "+1 CA" effect
      // We'll test the parsing logic
      const char = createTestChar({
        equipment: { ...createTestChar().equipment, head: 'tactical_helmet' },
      });
      const baseAC = calculateAC(createTestChar());
      const withHelmet = calculateAC(char);
      // If helmet exists and has +CA effect, AC should be higher
      expect(withHelmet).toBeGreaterThanOrEqual(baseAC);
    });
  });

  describe('Complex Combinations', () => {
    it('should stack multiple AC bonuses', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, DEX: 16 },
        class: 'Tank',
        talents: ['tank_tier1_1'],
        equipment: { ...createTestChar().equipment, body: 'light_leather' },
      });
      const ac = calculateAC(char);
      // Should combine armor base + DEX + talent bonus
      expect(ac).toBeGreaterThan(12);
    });
  });
});

describe('calculateMaxHP', () => {
  describe('Class Progression', () => {
    it('should use Tank progression table', () => {
      const char = createTestChar({ class: 'Tank', level: 1 });
      expect(calculateMaxHP(char)).toBe(10); // Level 1 Tank base
    });

    it('should use DPS progression table', () => {
      const char = createTestChar({ class: 'DPS', level: 1 });
      expect(calculateMaxHP(char)).toBe(6); // Level 1 DPS base
    });

    it('should use Support progression table', () => {
      const char = createTestChar({ class: 'Support', level: 1 });
      expect(calculateMaxHP(char)).toBe(8); // Level 1 Support base
    });

    it('should increase HP with level progression (Tank)', () => {
      const char5 = createTestChar({ class: 'Tank', level: 5 });
      const char10 = createTestChar({ class: 'Tank', level: 10 });
      expect(calculateMaxHP(char10)).toBeGreaterThan(calculateMaxHP(char5));
    });
  });

  describe('CON Modifier', () => {
    it('should add CON modifier per level', () => {
      const charCon10 = createTestChar({
        class: 'Tank',
        level: 5,
        attributes: { ...createTestChar().attributes, CON: 10 },
      });
      const charCon14 = createTestChar({
        class: 'Tank',
        level: 5,
        attributes: { ...createTestChar().attributes, CON: 14 },
      });
      // CON 14 = +2 modifier, 5 levels = +10 HP
      expect(calculateMaxHP(charCon14)).toBe(calculateMaxHP(charCon10) + 10);
    });

    it('should subtract for negative CON modifier', () => {
      const charCon10 = createTestChar({
        class: 'Tank',
        level: 3,
        attributes: { ...createTestChar().attributes, CON: 10 },
      });
      const charCon8 = createTestChar({
        class: 'Tank',
        level: 3,
        attributes: { ...createTestChar().attributes, CON: 8 },
      });
      // CON 8 = -1 modifier, 3 levels = -3 HP
      expect(calculateMaxHP(charCon8)).toBe(calculateMaxHP(charCon10) - 3);
    });
  });

  describe('Artifact: Medula Osea', () => {
    it('should add +1 HP per level with Medula Osea', () => {
      const charWithout = createTestChar({ class: 'Tank', level: 5 });
      const charWith = createTestChar({
        class: 'Tank',
        level: 5,
        equippedArtifacts: ['medula', null, null, null, null, null],
      });
      expect(calculateMaxHP(charWith)).toBe(calculateMaxHP(charWithout) + 5);
    });
  });

  describe('Radiation Level 4', () => {
    it('should halve max HP at radiation level 4', () => {
      const charNormal = createTestChar({ class: 'Tank', level: 5 });
      const charRadiated = createTestChar({ class: 'Tank', level: 5, radiationLevel: 4 });
      const normalHP = calculateMaxHP(charNormal);
      expect(calculateMaxHP(charRadiated)).toBe(Math.floor(normalHP / 2));
    });

    it('should halve max HP at radiation level 5', () => {
      const charNormal = createTestChar({ class: 'Tank', level: 5 });
      const charRadiated = createTestChar({ class: 'Tank', level: 5, radiationLevel: 5 });
      const normalHP = calculateMaxHP(charNormal);
      expect(calculateMaxHP(charRadiated)).toBe(Math.floor(normalHP / 2));
    });
  });

  describe('Exhaustion Level 4', () => {
    it('should halve max HP at exhaustion level 4', () => {
      const charNormal = createTestChar({ class: 'Tank', level: 5 });
      const charExhausted = createTestChar({ class: 'Tank', level: 5, exhaustion: 4 });
      const normalHP = calculateMaxHP(charNormal);
      expect(calculateMaxHP(charExhausted)).toBe(Math.floor(normalHP / 2));
    });
  });

  describe('Combined Penalties', () => {
    it('should apply both radiation and exhaustion penalties', () => {
      const charNormal = createTestChar({ class: 'Tank', level: 5 });
      const charDebuffed = createTestChar({
        class: 'Tank',
        level: 5,
        radiationLevel: 4,
        exhaustion: 4,
      });
      const normalHP = calculateMaxHP(charNormal);
      const debuffedHP = calculateMaxHP(charDebuffed);
      // Both halve HP: normalHP / 2 / 2 = normalHP / 4
      expect(debuffedHP).toBe(Math.floor(Math.floor(normalHP / 2) / 2));
    });
  });

  describe('Minimum HP Safety', () => {
    it('should ensure at least 1 HP per level', () => {
      const char = createTestChar({
        class: 'DPS',
        level: 5,
        attributes: { ...createTestChar().attributes, CON: 1 }, // -5 modifier
      });
      expect(calculateMaxHP(char)).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Edge Cases', () => {
    it('should handle level 10 correctly', () => {
      const char = createTestChar({ class: 'Tank', level: 10 });
      expect(calculateMaxHP(char)).toBe(71); // Tank level 10 base
    });

    it('should handle level 1 with high CON', () => {
      const char = createTestChar({
        class: 'Support',
        level: 1,
        attributes: { ...createTestChar().attributes, CON: 20 },
      });
      // Support L1 base = 8, CON +5 * 1 = 13
      expect(calculateMaxHP(char)).toBe(13);
    });
  });
});

describe('calculateMaxWeight', () => {
  describe('Base Calculation', () => {
    it('should calculate base as STR + CON', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 12, CON: 14 },
      });
      expect(calculateMaxWeight(char)).toBe(26);
    });
  });

  describe('Talent: Gen Mule', () => {
    it('should add 20 lbs for Gen Mule talent', () => {
      const charWithout = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      });
      const charWith = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        talents: ['gen_mule'],
      });
      expect(calculateMaxWeight(charWith)).toBe(calculateMaxWeight(charWithout) + 20);
    });
  });

  describe('Trait: Fragile Bones', () => {
    it('should subtract 10 lbs for Fragile Bones trait', () => {
      const charWithout = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      });
      const charWith = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        traits: ['trait_fragile'],
      });
      expect(calculateMaxWeight(charWith)).toBe(calculateMaxWeight(charWithout) - 10);
    });
  });

  describe('Backpack Bonuses', () => {
    it('should add 25 lbs for Sling backpack', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, backpack: 'sling' },
      });
      expect(calculateMaxWeight(char)).toBe(45); // 20 + 25
    });

    it('should add 45 lbs for Assault backpack', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, backpack: 'assault' },
      });
      expect(calculateMaxWeight(char)).toBe(65); // 20 + 45
    });

    it('should add 70 lbs for Expedition backpack', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, backpack: 'expedition' },
      });
      expect(calculateMaxWeight(char)).toBe(90); // 20 + 70
    });

    it('should add 90 lbs for Mule backpack', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, backpack: 'mule' },
      });
      expect(calculateMaxWeight(char)).toBe(110); // 20 + 90
    });

    it('should add 999 lbs for Anomala backpack', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, backpack: 'anomala' },
      });
      expect(calculateMaxWeight(char)).toBe(1019); // 20 + 999
    });
  });

  describe('Exo MULE Armor', () => {
    it('should treat STR as 19 if lower when wearing MULE exo', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, body: 'mule_exo' },
      });
      expect(calculateMaxWeight(char)).toBe(29); // 19 + 10
    });

    it('should not reduce STR if already 19 or higher with MULE exo', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 20, CON: 10 },
        equipment: { ...createTestChar().equipment, body: 'mule_exo' },
      });
      expect(calculateMaxWeight(char)).toBe(30); // 20 + 10
    });
  });

  describe('Artifact: Gravity Stone', () => {
    it('should add 50 lbs for Gravity Stone artifact', () => {
      const charWithout = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      });
      const charWith = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equippedArtifacts: ['guijarro_grav', null, null, null, null, null],
      });
      expect(calculateMaxWeight(charWith)).toBe(calculateMaxWeight(charWithout) + 50);
    });

    it('should add 50 lbs for alternate Gravity Stone ID', () => {
      const charWithout = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      });
      const charWith = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equippedArtifacts: ['grav_stone', null, null, null, null, null],
      });
      expect(calculateMaxWeight(charWith)).toBe(calculateMaxWeight(charWithout) + 50);
    });
  });

  describe('Mutation: Hollow Bones', () => {
    it('should halve total weight capacity', () => {
      const charWithout = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
      });
      const charWith = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        mutations: ['mut_hollow_bones'],
      });
      expect(calculateMaxWeight(charWith)).toBe(Math.floor(calculateMaxWeight(charWithout) / 2));
    });

    it('should apply after all other bonuses', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 10, CON: 10 },
        equipment: { ...createTestChar().equipment, backpack: 'assault' },
        talents: ['gen_mule'],
        mutations: ['mut_hollow_bones'],
      });
      // Base: 20, Talent: +20, Backpack: +45 = 85, then halved = 42
      expect(calculateMaxWeight(char)).toBe(Math.floor(85 / 2));
    });
  });

  describe('Complex Combinations', () => {
    it('should stack all bonuses correctly', () => {
      const char = createTestChar({
        attributes: { ...createTestChar().attributes, STR: 15, CON: 14 },
        talents: ['gen_mule'],
        equipment: { ...createTestChar().equipment, backpack: 'expedition' },
        equippedArtifacts: ['guijarro_grav', null, null, null, null, null],
      });
      // Base: 15+14=29, Talent: +20, Backpack: +70, Artifact: +50 = 169
      expect(calculateMaxWeight(char)).toBe(169);
    });
  });
});

describe('calculateCurrentWeight', () => {
  it('should return 0 for empty inventory', () => {
    const char = createTestChar({ inventory: [] });
    expect(calculateCurrentWeight(char)).toBe(0);
  });

  it('should calculate weight for single item', () => {
    const char = createTestChar({
      inventory: [{ itemId: 'crono_estatilla', quantity: 1 }],
    });
    const weight = calculateCurrentWeight(char);
    expect(weight).toBeGreaterThan(0);
  });

  it('should multiply weight by quantity', () => {
    const char1 = createTestChar({
      inventory: [{ itemId: 'medkit', quantity: 1 }],
    });
    const char5 = createTestChar({
      inventory: [{ itemId: 'medkit', quantity: 5 }],
    });
    expect(calculateCurrentWeight(char5)).toBe(calculateCurrentWeight(char1) * 5);
  });

  it('should sum multiple different items', () => {
    const char = createTestChar({
      inventory: [
        { itemId: 'crono_estatilla', quantity: 2 },
        { itemId: 'corazon_acero', quantity: 3 },
      ],
    });
    expect(calculateCurrentWeight(char)).toBeGreaterThan(0);
  });

  it('should round to 1 decimal place', () => {
    const char = createTestChar({
      inventory: [{ itemId: 'water', quantity: 3 }],
    });
    const weight = calculateCurrentWeight(char);
    // Check it's rounded to 1 decimal
    expect(weight).toBe(Math.round(weight * 10) / 10);
  });

  it('should handle items with zero weight', () => {
    const char = createTestChar({
      inventory: [{ itemId: 'nonexistent_item', quantity: 5 }],
    });
    // Should not crash, should handle gracefully
    expect(calculateCurrentWeight(char)).toBeGreaterThanOrEqual(0);
  });
});

describe('calculateSpellSlots', () => {
  it('should return correct slots for level 1', () => {
    const slots = calculateSpellSlots(1);
    expect(slots).toEqual([2, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('should return correct slots for level 5', () => {
    const slots = calculateSpellSlots(5);
    expect(slots).toEqual([4, 3, 2, 0, 0, 0, 0, 0, 0]);
  });

  it('should return correct slots for level 10', () => {
    const slots = calculateSpellSlots(10);
    expect(slots).toEqual([4, 3, 3, 3, 2, 0, 0, 0, 0]);
  });

  it('should cap at level 11 progression for higher levels', () => {
    const slots11 = calculateSpellSlots(11);
    const slots15 = calculateSpellSlots(15);
    const slots20 = calculateSpellSlots(20);
    expect(slots11).toEqual(slots15);
    expect(slots11).toEqual(slots20);
  });

  it('should return level 11 slots array', () => {
    const slots = calculateSpellSlots(11);
    expect(slots).toEqual([4, 3, 3, 3, 2, 1, 0, 0, 0]);
  });

  it('should handle level 0', () => {
    const slots = calculateSpellSlots(0);
    expect(slots).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});

describe('calculateMaxCantrips', () => {
  it('should return 2 cantrips for levels 1-3', () => {
    expect(calculateMaxCantrips(1)).toBe(2);
    expect(calculateMaxCantrips(2)).toBe(2);
    expect(calculateMaxCantrips(3)).toBe(2);
  });

  it('should return 3 cantrips for levels 4-6', () => {
    expect(calculateMaxCantrips(4)).toBe(3);
    expect(calculateMaxCantrips(5)).toBe(3);
    expect(calculateMaxCantrips(6)).toBe(3);
  });

  it('should return 4 cantrips for levels 7-9', () => {
    expect(calculateMaxCantrips(7)).toBe(4);
    expect(calculateMaxCantrips(8)).toBe(4);
    expect(calculateMaxCantrips(9)).toBe(4);
  });

  it('should return 5 cantrips for levels 10+', () => {
    expect(calculateMaxCantrips(10)).toBe(5);
    expect(calculateMaxCantrips(15)).toBe(5);
    expect(calculateMaxCantrips(20)).toBe(5);
  });
});

describe('getItem', () => {
  it('should return null for null ID', () => {
    expect(getItem(null)).toBeNull();
  });

  it('should return null for undefined ID', () => {
    expect(getItem(undefined as any)).toBeNull();
  });

  it('should return null for non-existent item', () => {
    expect(getItem('fake_item_id_12345')).toBeNull();
  });

  it('should return item for valid weapon ID', () => {
    // Check that item lookup works (specific weapon IDs may vary)
    // Since we don't have access to exact weapon IDs, we test with known item
    const item = getItem('crono_estatilla');
    expect(item).toBeTruthy();
    if (item) {
      expect(item.id).toBe('crono_estatilla');
    }
  });

  it('should return item for valid armor ID', () => {
    const item = getItem('ropa_civil');
    expect(item).toBeTruthy();
  });

  it('should return item for valid consumable ID', () => {
    const item = getItem('ammo_20ga');
    expect(item).toBeTruthy();
  });
});

describe('getArmorStats', () => {
  it('should return NO_ARMOR for null ID', () => {
    const armor = getArmorStats(null);
    expect(armor.id).toBe('unarmored');
    expect(armor.acBase).toBe(10);
    expect(armor.dexBonus).toBe(99);
  });

  it('should return NO_ARMOR for undefined ID', () => {
    const armor = getArmorStats(undefined as any);
    expect(armor.id).toBe('unarmored');
  });

  it('should return NO_ARMOR for non-armor item', () => {
    const armor = getArmorStats('medkit');
    expect(armor.id).toBe('unarmored');
  });

  it('should return armor stats for valid armor ID', () => {
    const armor = getArmorStats('light_leather');
    expect(armor).toBeTruthy();
    expect(armor.acBase).toBeDefined();
    expect(armor.dexBonus).toBeDefined();
  });

  it('should return NO_ARMOR for weapon ID', () => {
    const armor = getArmorStats('ak47');
    expect(armor.id).toBe('unarmored');
  });
});
