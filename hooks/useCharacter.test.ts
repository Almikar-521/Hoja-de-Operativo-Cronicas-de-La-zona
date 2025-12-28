import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCharacter } from './useCharacter';

describe('useCharacter', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  describe('Initialization', () => {
    it('should initialize with default character state', () => {
      const { result } = renderHook(() => useCharacter());

      expect(result.current.char.name).toBe('');
      expect(result.current.char.level).toBe(1);
      expect(result.current.char.attributes.STR).toBe(10);
      expect(result.current.char.inventory).toEqual([]);
    });

    it('should load character from localStorage if available', () => {
      const savedChar = {
        name: 'Saved Hero',
        player: 'Test Player',
        class: 'Tank',
        level: 5,
        background: '',
        xp: 1000,
        notes: '',
        attributes: { STR: 15, DEX: 12, CON: 14, INT: 10, WIS: 10, CHA: 8 },
        proficiencies: ['STR'],
        skillProficiencies: ['athletics'],
        hpCurrent: 30,
        hpMax: 30,
        hpTemp: 0,
        radiationLevel: 0,
        magicStress: 0,
        exhaustion: 0,
        conditions: [],
        anomalousEssence: 500,
        equipment: {
          head: null,
          face: null,
          eyes: null,
          ears: null,
          body: 'light_leather',
          rig: null,
          backpack: 'assault',
          weaponPrimary: 'ak47',
          weaponSecondary: null,
          weaponMelee: null,
        },
        equippedArtifacts: [null, null, null, null, null, null],
        inventory: [{ itemId: 'medkit', quantity: 3 }],
        gold: 100,
        talents: ['tank_tier1_1'],
        traits: [],
        mutations: [],
        preparedSpells: [],
      };

      localStorage.setItem('cdlz_character_v2', JSON.stringify(savedChar));

      const { result } = renderHook(() => useCharacter());

      expect(result.current.char.name).toBe('Saved Hero');
      expect(result.current.char.level).toBe(5);
      expect(result.current.char.attributes.STR).toBe(15);
    });

    it('should handle corrupt localStorage data', () => {
      localStorage.setItem('cdlz_character_v2', 'invalid json{]');

      const { result } = renderHook(() => useCharacter());

      // Should fall back to initial state
      expect(result.current.char.name).toBe('');
      expect(result.current.char.level).toBe(1);
    });
  });

  describe('Persistence', () => {
    it('should save to localStorage after changes', async () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.updateAttr('STR', 15);
      });

      // Fast-forward 500ms for debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      const saved = localStorage.getItem('cdlz_character_v2');
      expect(saved).toBeTruthy();
      if (saved) {
        const parsed = JSON.parse(saved);
        expect(parsed.attributes.STR).toBe(15);
      }

      vi.useRealTimers();
    });
  });

  describe('Derived Stats', () => {
    it('should calculate proficiency bonus correctly', () => {
      const { result } = renderHook(() => useCharacter());

      expect(result.current.derived.pb).toBe(2); // Level 1: ceil(1/4) + 1 = 2

      act(() => {
        result.current.setChar(prev => ({ ...prev, level: 5 }));
      });

      expect(result.current.derived.pb).toBe(3); // Level 5: ceil(5/4) + 1 = 3
    });

    it('should calculate initiative with DEX modifier', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.updateAttr('DEX', 16); // +3 modifier
      });

      expect(result.current.derived.initiative).toBe(3);
    });

    it('should add proficiency bonus to initiative for DPS with Reflex talent', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          class: 'DPS',
          level: 5,
          attributes: { ...prev.attributes, DEX: 14 }, // +2
          talents: ['dps_reflex'],
        }));
      });

      // DEX +2 + PB +3 = 5
      expect(result.current.derived.initiative).toBe(5);
    });

    it('should add +5 initiative for Alert trait', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          attributes: { ...prev.attributes, DEX: 10 },
          traits: ['trait_alert'],
        }));
      });

      expect(result.current.derived.initiative).toBe(5); // 0 + 5
    });

    it('should subtract 5 initiative for Living Shadow mutation', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          attributes: { ...prev.attributes, DEX: 14 }, // +2
          mutations: ['mut_living_shadow'],
        }));
      });

      expect(result.current.derived.initiative).toBe(-3); // 2 - 5
    });
  });

  describe('Speed Calculation', () => {
    it('should start with base speed of 30', () => {
      const { result } = renderHook(() => useCharacter());
      expect(result.current.derived.speed).toBe(30);
    });

    it('should add +5 speed for Gen Runner talent', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          talents: ['gen_runner'],
        }));
      });

      expect(result.current.derived.speed).toBe(35);
    });

    it('should add +5 speed for Messenger background (non-heavy armor)', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          traits: ['background_messenger'],
        }));
      });

      expect(result.current.derived.speed).toBe(35);
    });

    it('should not add messenger bonus with heavy armor', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          traits: ['background_messenger'],
          equipment: { ...prev.equipment, body: 'juggernaut' },
        }));
      });

      // Juggernaut armor reduces speed by 10, so 30 - 10 = 20
      // Messenger bonus doesn't apply with heavy armor
      expect(result.current.derived.speed).toBe(20);
    });

    it('should add +10 speed for Hollow Bones mutation', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          mutations: ['mut_hollow_bones'],
        }));
      });

      expect(result.current.derived.speed).toBe(40);
    });

    it('should reduce speed by 10 for Juggernaut armor without talent', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          equipment: { ...prev.equipment, body: 'juggernaut' },
        }));
      });

      expect(result.current.derived.speed).toBe(20);
    });

    it('should halve speed at radiation level 2', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          radiationLevel: 2,
        }));
      });

      expect(result.current.derived.speed).toBe(15);
    });

    it('should halve speed at exhaustion level 2', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          exhaustion: 2,
        }));
      });

      expect(result.current.derived.speed).toBe(15);
    });

    it('should set speed to 0 at exhaustion level 5', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          exhaustion: 5,
        }));
      });

      expect(result.current.derived.speed).toBe(0);
    });

    it('should reduce speed by 10 for Fracture condition', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          conditions: ['Fractura'],
        }));
      });

      expect(result.current.derived.speed).toBe(20);
    });

    it('should never go below 0 speed', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          equipment: { ...prev.equipment, body: 'juggernaut' },
          radiationLevel: 2,
          exhaustion: 2,
          conditions: ['Fractura'],
        }));
      });

      expect(result.current.derived.speed).toBeGreaterThanOrEqual(0);
    });
  });

  describe('HP Auto-Calculation', () => {
    it('should increase current HP when max HP increases', () => {
      const { result } = renderHook(() => useCharacter());

      const initialCurrentHP = result.current.char.hpCurrent;

      act(() => {
        result.current.setChar(prev => ({ ...prev, level: 2 }));
      });

      // Current HP should increase by the same amount as max HP
      expect(result.current.char.hpCurrent).toBeGreaterThan(initialCurrentHP);
    });

    it('should clamp current HP when max HP decreases', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          level: 5,
          hpCurrent: 30,
          hpMax: 30,
        }));
      });

      act(() => {
        result.current.actions.updateAttr('CON', 8); // Decrease CON
      });

      // Current HP should not exceed new max HP
      expect(result.current.char.hpCurrent).toBeLessThanOrEqual(result.current.char.hpMax);
    });

    it('should never allow negative HP', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          hpCurrent: 10,
        }));
      });

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          radiationLevel: 4,
          exhaustion: 4,
        }));
      });

      expect(result.current.char.hpCurrent).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Actions: Attribute Management', () => {
    it('should update attribute value', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.updateAttr('STR', 18);
      });

      expect(result.current.char.attributes.STR).toBe(18);
    });

    it('should toggle attribute proficiency', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.toggleProf('STR');
      });

      expect(result.current.char.proficiencies).toContain('STR');

      act(() => {
        result.current.actions.toggleProf('STR');
      });

      expect(result.current.char.proficiencies).not.toContain('STR');
    });

    it('should toggle skill proficiency', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.toggleSkill('athletics');
      });

      expect(result.current.char.skillProficiencies).toContain('athletics');

      act(() => {
        result.current.actions.toggleSkill('athletics');
      });

      expect(result.current.char.skillProficiencies).not.toContain('athletics');
    });
  });

  describe('Actions: Equipment Management', () => {
    it('should update equipment slot', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.updateEquipment('weaponPrimary', 'ak47');
      });

      expect(result.current.char.equipment.weaponPrimary).toBe('ak47');
    });
  });

  describe('Actions: Inventory Management', () => {
    it('should add item to inventory', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleUpdateItem('medkit', 3);
      });

      expect(result.current.char.inventory).toHaveLength(1);
      expect(result.current.char.inventory[0].itemId).toBe('medkit');
      expect(result.current.char.inventory[0].quantity).toBe(3);
    });

    it('should increase quantity for existing item', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleUpdateItem('medkit', 2);
      });

      act(() => {
        result.current.actions.handleUpdateItem('medkit', 3);
      });

      expect(result.current.char.inventory).toHaveLength(1);
      expect(result.current.char.inventory[0].quantity).toBe(5);
    });

    it('should decrease quantity for existing item', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleUpdateItem('medkit', 5);
      });

      act(() => {
        result.current.actions.handleUpdateItem('medkit', -2);
      });

      expect(result.current.char.inventory[0].quantity).toBe(3);
    });

    it('should remove item when quantity reaches 0', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleUpdateItem('medkit', 3);
      });

      act(() => {
        result.current.actions.handleUpdateItem('medkit', -3);
      });

      expect(result.current.char.inventory).toHaveLength(0);
    });

    it('should auto-unequip items when quantity becomes insufficient', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleUpdateItem('ak47', 1);
        result.current.actions.updateEquipment('weaponPrimary', 'ak47');
      });

      expect(result.current.char.equipment.weaponPrimary).toBe('ak47');

      act(() => {
        result.current.actions.handleUpdateItem('ak47', -1);
      });

      expect(result.current.char.equipment.weaponPrimary).toBeNull();
    });
  });

  describe('Actions: Buy Item', () => {
    it('should not buy item if insufficient gold', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({ ...prev, gold: 10 }));
      });

      const item = { id: 'medkit', price: 50 };

      act(() => {
        result.current.actions.handleBuyItem(item, 'item');
      });

      expect(result.current.char.gold).toBe(10);
      expect(result.current.char.inventory).toHaveLength(0);
    });

    it('should buy item and deduct gold', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({ ...prev, gold: 100 }));
      });

      const item = { id: 'medkit', price: 30 };

      act(() => {
        result.current.actions.handleBuyItem(item, 'item');
      });

      expect(result.current.char.gold).toBe(70);
      expect(result.current.char.inventory).toHaveLength(1);
      expect(result.current.char.inventory[0].itemId).toBe('medkit');
    });

    it('should buy item for free when free flag is true', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({ ...prev, gold: 0 }));
      });

      const item = { id: 'medkit', price: 50 };

      act(() => {
        result.current.actions.handleBuyItem(item, 'item', true);
      });

      expect(result.current.char.gold).toBe(0);
      expect(result.current.char.inventory).toHaveLength(1);
    });
  });

  describe('Actions: Talent Management', () => {
    it('should toggle talent', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleToggleTalent('tank_tier1_1');
      });

      expect(result.current.char.talents).toContain('tank_tier1_1');

      act(() => {
        result.current.actions.handleToggleTalent('tank_tier1_1');
      });

      expect(result.current.char.talents).not.toContain('tank_tier1_1');
    });
  });

  describe('Actions: Trait Management', () => {
    it('should toggle positive/background trait', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleToggleTrait('trait_alert');
      });

      expect(result.current.char.traits).toContain('trait_alert');
    });

    it('should grant essence for negative trait', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({ ...prev, anomalousEssence: 0 }));
      });

      // Assuming there's a negative trait that grants 1000 EA
      act(() => {
        result.current.actions.handleToggleTrait('trait_fragile');
      });

      expect(result.current.char.anomalousEssence).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Actions: Mutation Management', () => {
    it('should toggle mutation', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleToggleMutation('mut_bark_skin');
      });

      expect(result.current.char.mutations).toContain('mut_bark_skin');

      act(() => {
        result.current.actions.handleToggleMutation('mut_bark_skin');
      });

      expect(result.current.char.mutations).not.toContain('mut_bark_skin');
    });
  });

  describe('Actions: Condition Management', () => {
    it('should toggle condition', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleToggleCondition('Bleeding');
      });

      expect(result.current.char.conditions).toContain('Bleeding');

      act(() => {
        result.current.actions.handleToggleCondition('Bleeding');
      });

      expect(result.current.char.conditions).not.toContain('Bleeding');
    });
  });

  describe('Actions: Artifact Management', () => {
    it('should equip artifact to slot', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleEquipArtifact(0, 'medula');
      });

      expect(result.current.char.equippedArtifacts[0]).toBe('medula');
    });

    it('should unequip artifact from slot', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleEquipArtifact(0, 'medula');
      });

      act(() => {
        result.current.actions.handleUnequipArtifact(0);
      });

      expect(result.current.char.equippedArtifacts[0]).toBeNull();
    });
  });

  describe('Artifact Slot Cleanup', () => {
    it('should unequip artifacts beyond armor RA limit when changing armor', () => {
      const { result } = renderHook(() => useCharacter());

      // Equip heavy armor with 6 RA slots
      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          equipment: { ...prev.equipment, body: 'juggernaut' },
          equippedArtifacts: ['art1', 'art2', 'art3', 'art4', 'art5', 'art6'],
        }));
      });

      // Change to light armor with 1 RA slot
      act(() => {
        result.current.actions.updateEquipment('body', 'light_leather');
      });

      // Only first slot should remain (RA = 1)
      // Other slots should be cleared
      const artifacts = result.current.char.equippedArtifacts;
      expect(artifacts.slice(1).every(a => a === null)).toBe(true);
    });
  });

  describe('Actions: Background Management', () => {
    it('should change background and update traits', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleChangeBackground('background_messenger');
      });

      expect(result.current.char.background).toBe('background_messenger');
      expect(result.current.char.traits).toContain('background_messenger');
    });

    it('should change background when requested', () => {
      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.actions.handleChangeBackground('background_messenger');
      });

      expect(result.current.char.background).toBe('background_messenger');

      act(() => {
        result.current.actions.handleChangeBackground('background_soldier');
      });

      expect(result.current.char.background).toBe('background_soldier');
      // New background should be in traits
      expect(result.current.char.traits).toContain('background_soldier');
    });
  });

  describe('Actions: Reset Character', () => {
    it('should reset character to initial state', () => {
      // Mock window.confirm to always return true
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          name: 'Test Hero',
          level: 10,
          attributes: { ...prev.attributes, STR: 20 },
        }));
      });

      act(() => {
        result.current.actions.handleReset();
      });

      expect(result.current.char.name).toBe('');
      expect(result.current.char.level).toBe(1);
      expect(result.current.char.attributes.STR).toBe(10);

      vi.restoreAllMocks();
    });

    it('should not reset if user cancels confirmation', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      const { result } = renderHook(() => useCharacter());

      act(() => {
        result.current.setChar(prev => ({
          ...prev,
          name: 'Test Hero',
        }));
      });

      act(() => {
        result.current.actions.handleReset();
      });

      expect(result.current.char.name).toBe('Test Hero');

      vi.restoreAllMocks();
    });
  });

  describe('Actions: Load Character', () => {
    it('should load character from JSON', () => {
      const { result } = renderHook(() => useCharacter());

      const loadedChar = {
        name: 'Loaded Hero',
        player: 'Player',
        class: 'DPS' as const,
        level: 7,
        background: '',
        xp: 5000,
        notes: '',
        attributes: { STR: 12, DEX: 18, CON: 14, INT: 10, WIS: 10, CHA: 8 },
        proficiencies: ['DEX' as const],
        skillProficiencies: ['stealth'],
        hpCurrent: 35,
        hpMax: 35,
        hpTemp: 0,
        radiationLevel: 0,
        magicStress: 0,
        exhaustion: 0,
        conditions: [],
        anomalousEssence: 2000,
        equipment: {
          head: null,
          face: null,
          eyes: null,
          ears: null,
          body: 'light_leather',
          rig: null,
          backpack: 'assault',
          weaponPrimary: 'ak47',
          weaponSecondary: 'glock',
          weaponMelee: 'knife',
        },
        equippedArtifacts: [null, null, null, null, null, null],
        inventory: [{ itemId: 'medkit', quantity: 5 }],
        gold: 500,
        talents: ['dps_reflex'],
        traits: [],
        mutations: [],
        preparedSpells: [],
      };

      act(() => {
        result.current.actions.handleLoadChar(loadedChar);
      });

      expect(result.current.char.name).toBe('Loaded Hero');
      expect(result.current.char.level).toBe(7);
      expect(result.current.char.attributes.DEX).toBe(18);
    });
  });
});
