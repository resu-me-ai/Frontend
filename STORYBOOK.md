# Storybook Documentation

## Overview

This project uses **Storybook 10** for component documentation and development. All **atoms** and **molecules** have comprehensive stories with multiple variants, states, and interactive examples.

## Running Storybook

### Development Mode
```bash
npm run storybook
```
This starts Storybook on [http://localhost:6006](http://localhost:6006)

### Build Static Storybook
```bash
npm run build-storybook
```
This creates a static version of Storybook in the `storybook-static` folder.

## Component Coverage

### ✅ Atoms (7/7 documented)
1. **Button** (`Button.stories.tsx`)
   - Primary, Secondary, Back variants
   - Small, Medium, Large sizes
   - Full width and disabled states
   - Interactive examples

2. **Input** (`Input.stories.tsx`)
   - Default, with value, with error
   - Leading icon support
   - Disabled state
   - All states overview

3. **Dropdown** (`Dropdown.stories.tsx`)
   - Default with options
   - Error and disabled states
   - Leading icon support
   - Pre-selected values

4. **Logo** (`Logo.stories.tsx`)
   - Multiple size variations (24px - 120px)
   - Brand integration example

5. **ProgressBar** (`ProgressBar.stories.tsx`)
   - All step progressions (1/5 through 5/5)
   - Custom step counts (3, 5, 7 steps)

6. **Chip** (`Chip.stories.tsx`)
   - Selected and unselected states
   - Interactive toggle example
   - Role selection showcase

7. **Icon** (`Icon.stories.tsx`)
   - All available icons (chevron-down, map-pin, briefcase, arrow-right, arrow-left, check)
   - Multiple sizes
   - Colored variants

### ✅ Molecules (5/5 documented)
1. **FormInput** (`FormInput.stories.tsx`)
   - With and without labels
   - Required field indicators
   - Error states
   - Leading icon support
   - Complete form example

2. **FormDropdown** (`FormDropdown.stories.tsx`)
   - Label and required states
   - Pre-selected values
   - Error handling
   - Icon integration
   - Form layout examples

3. **RoleChipGroup** (`RoleChipGroup.stories.tsx`)
   - Single and multi-select
   - Interactive selection
   - All role options showcase
   - Form integration

4. **NavigationButtons** (`NavigationButtons.stories.tsx`)
   - With/without back button
   - Disabled states
   - Custom labels (Continue, Submit, Get Started)
   - All variations overview

5. **ProgressIndicator** (`ProgressIndicator.stories.tsx`)
   - All step progressions
   - With/without skip button
   - In-card context
   - Step counter display

## Story Structure

Each story file follows this pattern:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Atoms/ComponentName', // or 'Molecules/ComponentName'
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    // prop definitions with controls
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Individual story variations
export const Default: Story = { ... };
export const Variant1: Story = { ... };
export const Interactive: Story = { ... };
export const AllStates: Story = { ... };
```

## Features

### Auto-Documentation
- **Props Table**: Automatically generated from TypeScript types
- **Controls**: Interactive prop controls in the Storybook UI
- **Descriptions**: ArgTypes provide detailed prop descriptions

### Interactive Examples
All molecules include interactive stories where you can:
- Toggle states
- Change values
- See real-time updates

### Multiple Variants
Each component includes:
- Default state
- All major variants
- Error/disabled states
- Size variations
- "All States" overview story

### Accessibility
- Includes `@storybook/addon-a11y` for accessibility testing
- All components follow WCAG guidelines

## Customization

### Backgrounds
Storybook is configured with three background options:
- **Light** (`#F5F7FA`) - Default app background
- **White** (`#FFFFFF`) - Clean background
- **Dark** (`#1F2937`) - Dark mode testing

### Layout Options
- **centered**: Component centered in viewport (good for small components)
- **padded**: Component with padding (good for full-width components)

## Best Practices

1. **One Component Per File**: Each `.stories.tsx` file documents one component
2. **Multiple Stories**: Show all important states and variations
3. **Interactive Examples**: Include at least one interactive story with `render()`
4. **Controls**: Define all important props in `argTypes`
5. **Documentation**: Add descriptions to help users understand prop usage

## File Structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx ✅
│   │   ├── Input.tsx
│   │   ├── Input.stories.tsx ✅
│   │   ├── Dropdown.tsx
│   │   ├── Dropdown.stories.tsx ✅
│   │   ├── Logo.tsx
│   │   ├── Logo.stories.tsx ✅
│   │   ├── ProgressBar.tsx
│   │   ├── ProgressBar.stories.tsx ✅
│   │   ├── Chip.tsx
│   │   ├── Chip.stories.tsx ✅
│   │   ├── Icon.tsx
│   │   └── Icon.stories.tsx ✅
│   └── molecules/
│       ├── FormInput.tsx
│       ├── FormInput.stories.tsx ✅
│       ├── FormDropdown.tsx
│       ├── FormDropdown.stories.tsx ✅
│       ├── RoleChipGroup.tsx
│       ├── RoleChipGroup.stories.tsx ✅
│       ├── NavigationButtons.tsx
│       ├── NavigationButtons.stories.tsx ✅
│       ├── ProgressIndicator.tsx
│       └── ProgressIndicator.stories.tsx ✅
├── stories/
│   └── Introduction.mdx
└── .storybook/
    ├── main.ts
    └── preview.tsx
```

## Adding New Stories

To add stories for a new component:

1. Create `ComponentName.stories.tsx` next to your component
2. Import the component and Storybook types
3. Define the meta object with title and component
4. Create story variations using `StoryObj`
5. Export all stories

Example:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from './NewComponent';

const meta = {
  title: 'Atoms/NewComponent',
  component: NewComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof NewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## Troubleshooting

### Storybook won't start
- Run `npm install` to ensure all dependencies are installed
- Check that `@types/node` is installed for Node.js imports
- Verify `tsconfig.json` includes `"types": ["vite/client", "node"]`

### PostCSS/Tailwind errors
- Ensure `@tailwindcss/postcss` is installed (Tailwind v4 requirement)
- Check `postcss.config.js` uses `'@tailwindcss/postcss'` not `'tailwindcss'`

### Stories not appearing
- Verify file name ends with `.stories.tsx`
- Check the story is exported properly
- Restart Storybook dev server

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Tailwind CSS](https://tailwindcss.com/)

