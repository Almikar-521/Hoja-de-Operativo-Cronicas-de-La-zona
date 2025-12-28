# Testing Guide

This document describes the testing setup and strategy for Crónicas de la Zona character sheet application.

## Test Framework

We use **Vitest** as our testing framework, along with:
- **React Testing Library** for component testing
- **jsdom** for DOM simulation
- **@testing-library/user-event** for user interaction simulation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
/src
├── utils.test.ts              # Pure utility function tests
├── hooks/
│   └── useCharacter.test.ts   # React hook tests
├── test/
│   ├── setup.ts               # Test environment setup
│   └── helpers.ts             # Shared test utilities
/components
├── InventoryPanel.test.tsx    # Component tests
└── ArtifactSlots.test.tsx     # Component tests
```

## What's Tested

### 1. Utility Functions (utils.test.ts)

All game mechanics calculations are thoroughly tested:

- **Ability Modifiers**: D&D-style (score - 10) / 2 calculation
- **Armor Class (AC)**:
  - Unarmored, light, medium, heavy, and exo armor
  - DEX modifier caps and negative DEX handling
  - Bark Skin mutation
  - Talent and artifact bonuses
  - Headgear effects
- **Hit Points (HP)**:
  - Class progression tables (Tank/DPS/Support)
  - CON modifier scaling
  - Artifact bonuses
  - Radiation and exhaustion penalties
- **Encumbrance**:
  - Base weight capacity (STR + CON)
  - Backpack bonuses
  - Talent and trait modifiers
  - MULE exo armor effects
  - Hollow Bones mutation
- **Spell Slots**: Level-based progression
- **Item Lookups**: getItem() and getArmorStats()

**Coverage Goal**: 90%+ for utils.ts

### 2. Character Hook (useCharacter.test.ts)

State management and side effects:

- **Initialization**: Default state and localStorage loading
- **Persistence**: Auto-save debouncing
- **Derived Stats**:
  - Proficiency bonus
  - Initiative (with talents, traits, mutations)
  - Speed (with armor, conditions, status effects)
  - AC and weight calculations
- **HP Auto-calculation**: Level/CON changes
- **Actions**:
  - Attribute and proficiency management
  - Equipment management
  - Inventory operations
  - Shopping system
  - Evolution rolls (talents/attributes)
  - Artifact slots
  - Traits, mutations, conditions
- **Artifact Slot Cleanup**: Auto-unequip on armor change

**Coverage Goal**: 80%+ for useCharacter.ts

### 3. Component Tests

Critical UI components with business logic:

- **InventoryPanel**: Item display, quantity updates, weight calculation
- **ArtifactSlots**: Slot visibility based on armor RA, equip/unequip

**Coverage Goal**: 70%+ for tested components

## Testing Patterns

### Pure Functions

For pure utility functions, use simple input/output tests:

```typescript
it('should calculate modifier correctly', () => {
  expect(getModifier(10)).toBe(0);
  expect(getModifier(20)).toBe(5);
});
```

### React Hooks

Use `renderHook` from `@testing-library/react`:

```typescript
it('should update attribute', () => {
  const { result } = renderHook(() => useCharacter());

  act(() => {
    result.current.actions.updateAttr('STR', 18);
  });

  expect(result.current.char.attributes.STR).toBe(18);
});
```

### Components

Use `render` and `screen` from `@testing-library/react`:

```typescript
it('should display item', () => {
  render(<InventoryPanel inventory={[...]} />);

  expect(screen.getByText('Medkit')).toBeInTheDocument();
});
```

### User Interactions

Use `@testing-library/user-event`:

```typescript
it('should increment quantity on click', async () => {
  const user = userEvent.setup();
  const onUpdate = vi.fn();

  render(<InventoryPanel onUpdateItem={onUpdate} />);

  await user.click(screen.getByRole('button', { name: '+' }));

  expect(onUpdate).toHaveBeenCalledWith('medkit', 1);
});
```

## Test Helpers

Common test utilities are in `src/test/helpers.ts`:

```typescript
import { createTestCharacter, createTankCharacter } from './test/helpers';

// Create minimal character with defaults
const char = createTestCharacter({ level: 5 });

// Create class-specific character
const tank = createTankCharacter(5);
```

## Edge Cases to Test

When writing new tests, consider:

1. **Boundary values**: 0, 1, 10, 20, max values
2. **Negative values**: negative DEX, negative HP, etc.
3. **Null/undefined**: missing equipment, empty inventory
4. **Combined effects**: multiple bonuses/penalties stacking
5. **State cleanup**: artifact unequipping, item removal
6. **Debouncing**: localStorage save delays
7. **Error handling**: corrupt data, unknown items

## Coverage Goals

| Area | Target | Current |
|------|--------|---------|
| utils.ts | 90% | TBD |
| useCharacter.ts | 80% | TBD |
| Components | 70% | TBD |
| **Overall** | **75%** | **TBD** |

Run `npm run test:coverage` to see current coverage.

## Continuous Integration

Tests should run on:
- Every commit (pre-commit hook)
- Every pull request
- Before merging to main

## Known Limitations

1. Some components are purely presentational and not tested
2. E2E tests are not yet implemented
3. Visual regression testing is not set up
4. Performance testing is manual

## Future Improvements

- [ ] Add E2E tests with Playwright
- [ ] Set up visual regression testing
- [ ] Add performance benchmarks
- [ ] Test mobile responsiveness
- [ ] Add accessibility tests
- [ ] Mock external dependencies (if any)

## Troubleshooting

### Tests failing with "localStorage is not defined"

Check that `src/test/setup.ts` is configured in `vitest.config.ts`:

```typescript
setupFiles: './src/test/setup.ts'
```

### Component tests failing with "not wrapped in act(...)"

Wrap state updates in `act()`:

```typescript
act(() => {
  result.current.actions.updateAttr('STR', 15);
});
```

### Hook tests hanging

Make sure to use `vi.useFakeTimers()` and `vi.useRealTimers()`:

```typescript
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});
```

## Questions?

See the [Vitest docs](https://vitest.dev/) or [Testing Library docs](https://testing-library.com/).
