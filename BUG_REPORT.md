# Bug Report - Crónicas de la Zona Character Sheet

**Date**: 2025-12-28
**Severity Levels**: 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

## 🔴 CRITICAL BUGS

### 1. Weight Calculation Bug: MULE Exo Overrides Talent/Trait Bonuses

**File**: `utils.ts:151-198` (calculateMaxWeight)
**Severity**: 🔴 Critical
**Impact**: Players lose Gen Mule talent (+20 lbs) and Fragile Bones trait (-10 lbs) effects when wearing MULE exoskeleton

**Description**:
The MULE exoskeleton recalculation (lines 180-183) **overwrites** the base value AFTER Gen Mule and Fragile Bones modifiers have been applied, causing these effects to be lost.

**Current Code**:
```typescript
// Lines 158-166: Apply modifiers to base
if (char.talents.includes('gen_mule')) {
    base += 20;  // ← Applied here
}
if (char.traits.includes('trait_fragile')) {
    base -= 10;  // ← Applied here
}

// Lines 180-183: MULE exo OVERWRITES base
if (char.equipment.body === 'mule_exo') {
    const effectiveStr = Math.max(str, 19);
    base = effectiveStr + con;  // ← OVERWRITES previous modifiers!
}
```

**Proof**:
- Without MULE exo: (10 STR + 10 CON) + 20 (Gen Mule) = **40 lbs** ✅
- With MULE exo: (19 + 10) = **29 lbs** (lost +20 from Gen Mule) ❌
- Expected with MULE exo: (19 + 10) + 20 = **49 lbs**

**Test Results** (bug-tests.test.ts):
```
✓ MULE exo + Gen Mule: Expected 49, Actual 29 ❌
✓ MULE exo + Fragile Bones: Expected 19, Actual 29 ❌
✓ MULE exo + Both: Expected 39, Actual 29 ❌
```

**Fix**:
Move MULE exo calculation to BEFORE talent/trait modifiers:
```typescript
export const calculateMaxWeight = (char: CharacterState): number => {
  const str = char.attributes.STR;
  const con = char.attributes.CON;

  // Step 1: Base calculation (apply MULE exo FIRST)
  let base;
  if (char.equipment.body === 'mule_exo') {
      const effectiveStr = Math.max(str, 19);
      base = effectiveStr + con;
  } else {
      base = str + con;
  }

  // Step 2: Talent/Trait modifiers
  if (char.talents.includes('gen_mule')) {
      base += 20;
  }
  if (char.traits.includes('trait_fragile')) {
      base -= 10;
  }

  // Step 3: Backpack bonuses
  let backpackBonus = 0;
  const packId = char.equipment.backpack;
  if (packId === 'sling') backpackBonus = 25;
  // ... rest of backpack logic

  // Step 4: Artifact bonuses
  if (char.equippedArtifacts.includes('guijarro_grav') ||
      char.equippedArtifacts.includes('grav_stone')) {
      base += 50;
  }

  let total = base + backpackBonus;

  // Step 5: Mutation penalties (applied last)
  if (char.mutations.includes('mut_hollow_bones')) {
      total = Math.floor(total / 2);
  }

  return total;
};
```

---

## 🟠 HIGH SEVERITY BUGS

### 2. Incomplete Item Unequipping When Quantity Insufficient

**File**: `hooks/useCharacter.ts:186-196` (handleUpdateItem)
**Severity**: 🟠 High
**Impact**: Items remain equipped when inventory quantity is insufficient

**Description**:
When removing items from inventory, the code only unequips **ONE** item slot even if multiple slots have the same item equipped.

**Scenario**:
1. Player has 2x "AK-47" in inventory
2. Equips one in Primary Weapon slot, one in Secondary Weapon slot
3. Removes 1 from inventory (now has 1 left)
4. totalEquipped (2) > nextQty (1), so it should unequip one slot ✅
5. Removes 1 more (now has 0 left)
6. totalEquipped is still 1, but nextQty = 0, so **it should unequip but doesn't**

**Current Code**:
```typescript
if (totalEquipped > nextQty) {
    const artIndex = newArtifacts.findIndex(id => id === itemId);
    if (artIndex >= 0) {
        newArtifacts[artIndex] = null;  // ← Only unequips ONE
    } else {
        const slotToClear = Object.keys(newEquipment).reverse()
            .find(key => newEquipment[key as keyof CharacterState['equipment']] === itemId);
        if (slotToClear) {
            newEquipment[slotToClear as keyof CharacterState['equipment']] = null;  // ← Only unequips ONE
        }
    }
}
```

**Fix**:
Use a loop to unequip ALL items beyond available quantity:
```typescript
while (totalEquipped > nextQty) {
    const artIndex = newArtifacts.findIndex(id => id === itemId);
    if (artIndex >= 0) {
        newArtifacts[artIndex] = null;
        totalEquipped--;
    } else {
        const slotToClear = Object.keys(newEquipment).reverse()
            .find(key => newEquipment[key as keyof CharacterState['equipment']] === itemId);
        if (slotToClear) {
            newEquipment[slotToClear as keyof CharacterState['equipment']] = null;
            totalEquipped--;
        } else {
            break; // Safety: no more items to unequip
        }
    }
}
```

---

## 🟡 MEDIUM SEVERITY BUGS

### 3. Duplicate Talents Allowed in Free Mode

**File**: `hooks/useCharacter.ts:258-268` (handleBuyTalent)
**Severity**: 🟡 Medium
**Impact**: Players can get the same talent multiple times when using free mode

**Description**:
When `free = true`, the function doesn't check if the talent is already owned before adding it.

**Current Code**:
```typescript
const handleBuyTalent = (talent: Talent, free: boolean = false) => {
    const cost = talent.cost;
    if (!free && char.anomalousEssence < cost) return;
    if (free) {
        // ❌ No duplicate check here!
        setChar(prev => ({ ...prev, talents: [...prev.talents, talent.id] }));
        return;
    }
    // ...
}
```

**Fix**:
```typescript
if (free) {
    if (char.talents.includes(talent.id)) return; // ← Add duplicate check
    setChar(prev => ({ ...prev, talents: [...prev.talents, talent.id] }));
    return;
}
```

---

### 4. Unnecessary HP Recalculation Triggers

**File**: `hooks/useCharacter.ts:83-104` (HP auto-calculation useEffect)
**Severity**: 🟡 Medium
**Impact**: Performance issue - HP recalculates every time any artifact changes

**Description**:
The dependency array includes `char.equippedArtifacts` which is an array reference. Any artifact equip/unequip triggers the effect, even if the "medula" artifact (the only one affecting HP) didn't change.

**Current Code**:
```typescript
useEffect(() => {
    // ...HP calculation logic
}, [char.class, char.level, char.attributes.CON, char.radiationLevel,
    char.exhaustion, char.equippedArtifacts]);  // ← Array reference
```

**Fix**:
Only depend on whether 'medula' is equipped:
```typescript
const hasMedula = useMemo(() =>
    char.equippedArtifacts.includes('medula'),
    [char.equippedArtifacts]
);

useEffect(() => {
    // ...HP calculation logic
}, [char.class, char.level, char.attributes.CON, char.radiationLevel,
    char.exhaustion, hasMedula]);  // ← Boolean value
```

---

### 5. D20 Roll Uses Unconventional Method

**File**: `hooks/useCharacter.ts:227` (performEvolutionRoll)
**Severity**: 🟢 Low (technically correct, but unconventional)
**Impact**: Code readability and potential confusion

**Description**:
Uses `Math.ceil(Math.random() * 20)` instead of the standard D&D convention `Math.floor(Math.random() * 20) + 1`.

**Current Code**:
```typescript
const d20 = Math.ceil(Math.random() * 20);  // ← Unconventional
```

**Both produce 1-20**, but the conventional method is clearer:
```typescript
const d20 = Math.floor(Math.random() * 20) + 1;  // ← Standard
```

---

## 🟢 LOW SEVERITY ISSUES

### 6. Hit Die Recovery Uses Math.ceil Instead of Math.floor

**File**: `hooks/useCharacter.ts:373` (handleHitDieRecovery)
**Severity**: 🟢 Low
**Impact**: Dice rolls never produce natural 0, slightly higher average

**Description**:
Most D&D implementations use `Math.floor() + 1`, but this uses `Math.ceil()`.

**Current Code**:
```typescript
const roll = Math.ceil(Math.random() * die);
```

**Both work**, but conventional:
```typescript
const roll = Math.floor(Math.random() * die) + 1;
```

---

### 7. Artifact Slot Cleanup Doesn't Track Full State

**File**: `hooks/useCharacter.ts:63-80`
**Severity**: 🟢 Low
**Impact**: Edge case where artifacts might not clean up if array reference changes externally

**Description**:
The effect only depends on `char.equipment.body` but reads `char.equippedArtifacts`. If equippedArtifacts changes without body changing, cleanup won't run.

**This is likely intentional**, but could be made more explicit:
```typescript
useEffect(() => {
    const armor = getItem(char.equipment.body);
    const ra = armor && (armor as any).ra !== undefined ? (armor as any).ra : 0;

    setChar(prev => {
        let needsCleanup = false;
        const newArtifacts = [...prev.equippedArtifacts];  // ← Use prev state

        for (let i = ra; i < 6; i++) {
            if (newArtifacts[i] !== null) {
                newArtifacts[i] = null;
                needsCleanup = true;
            }
        }

        return needsCleanup
            ? { ...prev, equippedArtifacts: newArtifacts }
            : prev;  // ← Don't update if no changes
    });
}, [char.equipment.body]);
```

---

## 📊 Summary

| Severity | Count | Critical Impact |
|----------|-------|----------------|
| 🔴 Critical | 1 | Weight calculation broken with MULE exo |
| 🟠 High | 1 | Items not fully unequipped |
| 🟡 Medium | 3 | Duplicate talents, performance, unconventional code |
| 🟢 Low | 3 | Minor issues, edge cases |
| **TOTAL** | **8** | **2 gameplay-affecting bugs** |

---

## 🔧 Recommended Fix Priority

1. **Fix #1 (Weight Calculation)** - Immediate - breaks game balance
2. **Fix #2 (Item Unequipping)** - High - inventory desync
3. **Fix #3 (Duplicate Talents)** - Medium - exploitable in free mode
4. **Fix #4 (HP Performance)** - Medium - performance optimization
5. Fixes #5-7 - Low priority - code quality improvements

---

## ✅ Verification

Run `npm test -- bug-tests.test.ts` to verify bugs #1 exists.

Create additional tests for bugs #2-3 to verify and prevent regression.
