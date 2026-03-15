# Figma Component Engineering Patterns -> React Mapping

Comprehensive reference for building Figma components that map cleanly to React/TypeScript implementations. Researched March 2026.

---

## Table of Contents

1. [Auto-Layout <-> CSS Flexbox](#1-auto-layout--css-flexbox)
2. [Component Properties <-> React Props](#2-component-properties--react-props)
3. [Nested Component Architecture](#3-nested-component-architecture)
4. [Slot Patterns](#4-slot-patterns)
5. [Responsive Design](#5-responsive-design)
6. [Professional Plan Constraints & Workarounds](#6-professional-plan-constraints--workarounds)
7. [Variant Explosion Prevention](#7-variant-explosion-prevention)

---

## 1. Auto-Layout <-> CSS Flexbox

Figma Auto Layout is a visual interface over CSS Flexbox. Every auto-layout frame maps to `display: flex`.

### Property Mapping Table

| CSS Flexbox | Figma Auto Layout | Notes |
|---|---|---|
| `display: flex` | Add Auto Layout (Shift+A) | Converts frame to flex container |
| `flex-direction: row` | Direction: Horizontal | Left-to-right flow |
| `flex-direction: column` | Direction: Vertical | Top-to-bottom flow |
| `gap: Npx` | Space between items | Numeric spacing between children |
| `padding` | Padding (per-side or uniform) | Supports independent top/right/bottom/left |
| `justify-content: flex-start` | Primary axis: Packed (start) | Items packed to start |
| `justify-content: center` | Primary axis: Packed (center) | Items centered |
| `justify-content: flex-end` | Primary axis: Packed (end) | Items packed to end |
| `justify-content: space-between` | Primary axis: Space between | Equal space between items |
| `align-items: flex-start` | Counter axis: Top/Left | Cross-axis alignment |
| `align-items: center` | Counter axis: Center | Cross-axis centering |
| `align-items: stretch` | Counter axis: (child set to Fill) | Child stretches to fill cross-axis |
| `flex-grow: 1` | Child sizing: Fill container | Child expands to fill available space |
| `flex-grow: 0; flex-shrink: 0` | Child sizing: Fixed | Child maintains exact dimensions |
| `width: fit-content` | Child sizing: Hug contents | Shrinks to wrap content |
| `min-width` / `max-width` | Min/Max width constraints | Works with Hug and Fill sizing |
| `min-height` / `max-height` | Min/Max height constraints | Prevents over-compression/stretching |
| `flex-wrap: wrap` | Wrap (horizontal only) | Children flow to next row |
| `position: absolute` | Absolute position (child) | "Ignore auto layout" -- removed from flow |

### Common Pitfalls

1. **No flex-shrink control**: Figma has no explicit flex-shrink. "Hug contents" approximates it but does not behave identically to `flex-shrink: 1`.

2. **Wrap is horizontal-only**: Figma auto layout wrap only works on horizontal direction. Vertical wrap is not supported.

3. **No percentage widths**: You cannot say "this child is 25% of the parent." Workaround: use Fill container on multiple children (they split equally) or use spacer frames.

4. **Space-around not available**: Figma supports space-between but not `space-around` or `space-evenly` as primary axis distribution modes.

5. **No order property**: Cannot reorder children independently of layer order. CSS `order` has no Figma equivalent.

### Grid Auto Layout (Config 2025, Open Beta)

Figma added `display: grid` support via Grid Auto Layout Flow:
- Supports fixed pixel tracks and "auto" (equivalent to `1fr`)
- Elements can span multiple rows/columns
- Dev Mode outputs CSS Grid code
- **Missing**: `fr` units, percentages, named grid areas, subgrid, auto-fill/auto-fit, content-based sizing, multiple elements per cell

### Practical Pattern: Card Component

```
/* React */                          /* Figma */
<div style={{                        Frame with Auto Layout:
  display: 'flex',                     Direction: Vertical
  flexDirection: 'column',             Padding: 16px
  padding: 16,                         Gap: 12px
  gap: 12,                             Width: Fill container
  width: '100%'                        Children:
}}>                                      Image: Fixed height 200px
  <img style={{height: 200}} />          Title: Hug contents
  <h3>Title</h3>                         Body: Hug contents
  <p>Body</p>                            Button: Hug contents
  <button>Action</button>
</div>
```

---

## 2. Component Properties <-> React Props

Figma has 5 property types. Each maps to a React prop pattern.

### Complete Property Type Mapping

| Figma Property | React/TS Equivalent | Code Connect Helper | When to Use |
|---|---|---|---|
| **Variant** | `type: 'primary' \| 'secondary'` (union/enum) | `figma.enum('Type', { Primary: 'primary' })` | Discrete visual states: size, hierarchy, style |
| **Boolean** | `disabled?: boolean` | `figma.boolean('Has Icon', { true: <Icon/> })` | Toggle layer visibility: show/hide icon, badge, label |
| **Instance Swap** | `icon?: React.ReactNode` | `figma.instance('Icon')` | Swappable nested components: icons, avatars |
| **Text** | `label?: string` | `figma.string('Label')` | Editable string content: button label, heading |
| **Slot** (beta) | `children?: React.ReactNode` | `figma.slot('Content')` | Flexible content area: card body, modal content |

### Variant Properties (Enum-like)

Use for properties where the component changes visual appearance significantly.

```typescript
// React
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  state: 'default' | 'hover' | 'active' | 'disabled';
}

// Figma: Create variant properties named "Variant", "Size", "State"
// Each combination = one variant in the component set
```

**Rule of thumb**: Use variant properties when the change affects layout structure or requires different layer arrangements (not just color swaps).

### Boolean Properties (Show/Hide Toggle)

Use for toggling visibility of optional layers.

```typescript
// React
interface ButtonProps {
  hasIcon?: boolean;    // Figma: Boolean property on icon layer
  hasLabel?: boolean;   // Figma: Boolean property on label layer
}

// Name booleans affirmatively: "Has Icon" not "Hide Icon"
```

**Limitation**: Boolean properties only control layer visibility. They cannot change values, colors, or other attributes.

### Instance Swap Properties (Slot-like for Single Elements)

Use for elements that should be replaceable with other components.

```typescript
// React
interface ButtonProps {
  leftIcon?: React.ComponentType;
  rightIcon?: React.ComponentType;
}

// Figma: Instance swap property on icon instance
// Set "preferred values" to curate the icon picker
```

### Text Properties (Editable Strings)

Use for text content that consumers edit.

```typescript
// React
interface ButtonProps {
  label: string;
  helperText?: string;
}

// Figma: Text property on text layer
```

**Limitation**: Text properties do not support rich text formatting (bold, italic, lists). Those must be applied directly to the text layer.

### Exposing Nested Properties

Figma allows exposing properties of nested component instances at the parent level:
- Select the parent main component
- In Properties section, click to expose properties from nested instances
- Check the nested instances whose properties should appear at the top level

**Limitation**: You expose ALL properties of a nested instance -- you cannot selectively hide specific ones. This mirrors React's prop spreading (`{...iconProps}`) with no filtering.

### Code Connect Example (Complete Button)

```typescript
import figma from '@figma/code-connect/react'
import { Button } from './Button'

figma.connect(Button, 'https://figma.com/file/...', {
  props: {
    label: figma.string('Label'),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    disabled: figma.boolean('Disabled'),
    icon: figma.instance('Icon'),
  },
  example: ({ label, variant, size, disabled, icon }) => (
    <Button variant={variant} size={size} disabled={disabled} icon={icon}>
      {label}
    </Button>
  ),
})
```

---

## 3. Nested Component Architecture

### Atomic Design Mapping

| Level | Figma | React | Examples |
|---|---|---|---|
| Atoms | Base components (often hidden/unpublished) | Primitive components | Icon, Text, Badge, Avatar |
| Molecules | Components with nested atom instances | Composed components | Button (icon + label), Input (label + field + hint) |
| Organisms | Components with nested molecule instances | Feature components | Card (header + body + footer), Navbar (logo + nav items) |
| Templates | Frames using organism instances | Layout components | PageLayout, DashboardLayout |

### Best Practices for Composition Without Detaching

1. **Keep nesting shallow: 2-3 levels max.** Deeper hierarchies become hard to override and debug.

2. **Use base components (hidden/unpublished).** Internal building blocks that are not published to the library. Changes to the base cascade to all components that use it.

3. **Expose nested instance properties.** Surface inner component props at the outer level so users do not need to deep-select layers.

4. **Use instance swap for flexible children.** Instead of hardcoding a specific icon, make it an instance swap property.

5. **Name layers semantically.** Use "Icon / Chevron Down" not "Frame 47". Layer names become the property names.

6. **Match auto-layout nesting to flex nesting.** If your React component has a horizontal row inside a vertical column, mirror that with nested auto-layout frames.

### Nesting Pattern: Input Field

```
InputField (Component, Vertical Auto Layout, gap: 4)
  |-- Label (Text property: "Label")
  |-- InputWrapper (Horizontal Auto Layout, gap: 8, Fill container)
  |    |-- LeadingIcon (Instance Swap, Boolean: "Has Leading Icon")
  |    |-- TextValue (Text property, Fill container)
  |    |-- TrailingIcon (Instance Swap, Boolean: "Has Trailing Icon")
  |-- HelperText (Text property, Boolean: "Has Helper Text")
  |-- ErrorText (Text property, Boolean: "Has Error", hidden by default)
```

Maps to:

```typescript
interface InputFieldProps {
  label: string;
  value: string;
  helperText?: string;
  errorText?: string;
  hasLeadingIcon?: boolean;
  leadingIcon?: React.ReactNode;
  hasTrailingIcon?: boolean;
  trailingIcon?: React.ReactNode;
}
```

### Warning: Property Reset on Instance Swap

When you swap a nested instance in Figma, other overrides on that instance may reset. Always inspect nested layers after swapping to verify intended behavior is preserved.

---

## 4. Slot Patterns

Slots (open beta, launched Schema 2025) are Figma's answer to React's `children` prop.

### Slots vs Instance Swap

| Feature | Instance Swap | Slot |
|---|---|---|
| Content type | Single component instance | Any number of layers, components, text, frames |
| Arrangement | Fixed (one-to-one replacement) | Free-form add, remove, reorder |
| Detaching required | No | No |
| React equivalent | `icon?: ReactNode` (single element) | `children?: ReactNode` (flexible content) |
| Use case | Replace one icon with another | Fill a card body with arbitrary content |

### How Slots Model React `children`

```typescript
// React pattern
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>
    <p>Any content here</p>
    <img src="..." />
    <Button>Action</Button>
  </CardBody>
</Card>

// Figma equivalent:
// Card component with a Slot property on the body frame
// Designers can add any instances, text, or frames into the slot
```

### Creating Slots

Three methods:
1. **Convert existing frame**: Right-click nested frame -> "Convert to slot" (Cmd+Shift+S)
2. **Wrap objects**: Select layers -> Right-click -> "Wrap in new slot"
3. **Create property first**: Properties panel -> Create property -> Slot -> assign to frame later

### Slot Architecture Rules (Nathan Curtis)

1. **Never add padding to slot layers directly.** Nest the slot inside a padded frame instead.
2. **Never add visual styling (color, corners, strokes) to slot layers.** Keep slots as pure layout containers.
3. **Set appropriate default dimensions for empty slots** so they remain visible and usable.
4. **Use preferred instances** to curate what appears in the "+" menu when designers add content to slots.
5. **Set `minItems`/`maxItems`** when the slot should have bounded content (e.g., a tab bar with 2-6 items).

### Slot Patterns by Component Type

| Component | Slot Name | Content Pattern |
|---|---|---|
| Card | body / content | Free-form: text, images, buttons |
| Modal | content | Free-form: forms, text, media |
| Dialog | actions | Bounded: 1-3 buttons |
| List | items | Repeating: list item instances |
| Tabs | panels | Named: one per tab |
| Toolbar | tools | Bounded: action buttons/icons |
| Page | main | Free-form: primary content |

### Configuration Collapse

Slots naturally drive "configuration collapse": moving from property-based configuration (many boolean/variant props) to composition-based solutions (just drop content in). This mirrors the React pattern of favoring `children` over excessive props.

**Before slots (variant explosion)**:
- Card with hasImage, hasSubtitle, hasActions, hasBadge = 16 boolean combinations

**After slots**:
- Card with a content slot. Designers compose freely. Zero boolean variants needed for content variation.

### Code Connect for Slots

```typescript
figma.connect(Card, 'https://...', {
  props: {
    content: figma.slot('Content'),
  },
  example: ({ content }) => <Card>{content}</Card>,
})
```

---

## 5. Responsive Design

### Figma Responsive Toolkit

| Tool | CSS Equivalent | Purpose |
|---|---|---|
| Auto Layout direction + wrap | `flex-direction` + `flex-wrap` | Reflow layout |
| Fill container | `flex: 1` | Expand to available space |
| Hug contents | `width: fit-content` | Shrink to content |
| Min/Max width/height | `min-width`, `max-width` | Bound resizing |
| Constraints | `position` anchoring | Pin to edges during parent resize |
| Variable modes | CSS custom properties + media queries | Switch values per breakpoint |

### Variable Modes for Breakpoints

Create a "Breakpoints" variable collection with modes for each viewport:

| Variable | Mobile | Tablet | Desktop |
|---|---|---|---|
| `spacing/section` | 16 | 24 | 32 |
| `spacing/gutter` | 8 | 12 | 16 |
| `fontSize/heading` | 20 | 22 | 24 |
| `maxWidth/content` | 100% | 720 | 1200 |
| `columns/grid` | 1 | 2 | 3 |

Apply modes to top-level frames representing each breakpoint. All children using these variables update simultaneously.

### Variant Binding for Responsive Components

Boolean, number, and string variables can be bound to component variant properties. A button's size variant can bind to a `Button/Size` variable:
- Desktop mode -> "large"
- Mobile mode -> "small"

When the frame switches modes, the button variant switches automatically.

### Limitations vs CSS Media Queries

1. **No automatic breakpoint detection.** Figma requires manual mode switching; CSS responds to viewport automatically.
2. **Static preview.** Designers see one breakpoint at a time. No live responsive resizing.
3. **No pseudo-states.** `:hover`, `:focus`, `:active` have no automatic CSS equivalent in Figma. Use interactive components (variant-based prototyping) as a workaround.
4. **No container queries.** CSS `@container` has no Figma equivalent.
5. **Min/Max conflicts with constraints.** Setting both min/max width disables left+right constraints because they would conflict.

### Practical Responsive Component Pattern

```
ResponsiveCard (Auto Layout, Horizontal, Wrap)
  |-- ImageFrame (Fixed: 200px width, Min: 150px, Max: 300px)
  |-- ContentFrame (Fill container, Min: 200px)
       |-- Title (Hug)
       |-- Body (Hug)
       |-- Actions (Hug)
```

At narrow widths, wrap causes ImageFrame and ContentFrame to stack vertically. Min/max constraints prevent extreme sizing.

---

## 6. Professional Plan Constraints & Workarounds

### Current Plan Limits (Post-Schema 2025)

| Feature | Professional ($15/editor/mo) | Organization ($45/editor/mo) | Enterprise (custom) |
|---|---|---|---|
| Variable modes per collection | **10** | 20 | 40 |
| Branching | No | Yes | Yes |
| Extended collections | No | No | Yes |
| Code Connect UI | No | Yes | Yes |
| Dev Mode | Included | Included | Included |

Note: Mode limits were increased at Schema 2025 (previously 4 for Pro, now 10).

### Workaround: More Than 10 Themes

**Strategy 1 -- Collection splitting:**
Split variables across multiple collections. Instead of one "Colors" collection with 12 brand modes, create:
- "Colors-Brand-Set-A" (modes: Brand1, Brand2, Brand3, Brand4)
- "Colors-Brand-Set-B" (modes: Brand5, Brand6, Brand7, Brand8)
- "Colors-Brand-Set-C" (modes: Brand9, Brand10, Brand11, Brand12)

Downside: Cannot mode-switch across collections in a single frame. Each collection is independent.

**Strategy 2 -- Switcher collections with aliases:**
Create "switcher" collections that alias variables from other collections. This lets you effectively multiplex modes beyond the per-collection limit.

**Strategy 3 -- Tokens Studio (third-party):**
Use Tokens Studio plugin for advanced theme management. Its "Themes (pro)" feature groups token sets and syncs to Figma variables, bypassing native mode limits.

**Strategy 4 -- JSON import/export:**
Export variables as DTCG-format JSON, modify programmatically, and re-import. Useful for generating brand variants from a template.

### Workaround: No Branching

Without branching (Org/Enterprise only), Professional plan teams use:

1. **Duplicate file as staging.** Before major changes, duplicate the library file. Work in the copy. When validated, copy components back. Manual but functional.

2. **Version history as undo.** Figma auto-saves with version history. Name checkpoints before risky changes. Restore if needed.

3. **Multi-file libraries.** Split the design system across files (primitives, components, patterns). Publish each as a separate library. Reduces blast radius of changes.

4. **Page-based versioning.** Dedicate a page in the file to version tracking: labeled rectangles with version number, date, and change summary.

5. **Changelog page.** Maintain a page with design system release notes visible to all consumers.

### Practical Impact Assessment

| Constraint | Severity | Workaround Quality |
|---|---|---|
| 10 modes (was 4) | Medium | Collection splitting works but adds management overhead |
| No branching | High | File duplication is error-prone; version history helps but is not true branching |
| No extended collections | Low | Only matters for multi-brand enterprise orgs |
| No Code Connect UI | Low | CLI-based Code Connect still works on all plans |

---

## 7. Variant Explosion Prevention

### The Problem

A button with these properties as variants:
- Variant: primary, secondary, ghost (3)
- Size: sm, md, lg (3)
- State: default, hover, active, disabled (4)
- Icon: none, left, right, both (4)

Total variants: 3 x 3 x 4 x 4 = **144 variants**

Add a "destructive" color variant (x2) and you hit **288**. This is unmanageable.

### Strategy 1: Use Component Properties Instead of Variants

Move non-structural differences out of variants into component properties:

| Property | Keep as Variant? | Move to Component Property? | Why? |
|---|---|---|---|
| State (default/hover/active/disabled) | YES (variant) | -- | Required for interactive prototyping |
| Variant (primary/secondary/ghost) | YES (variant) | -- | Different visual structure |
| Size (sm/md/lg) | MAYBE | Use variables with modes | If only spacing/font changes, variables are better |
| Has Icon (yes/no) | -- | YES (boolean) | Just toggles layer visibility |
| Icon type | -- | YES (instance swap) | Swap the nested icon instance |
| Label text | -- | YES (text property) | Editable string, not a visual variant |

**Result**: 3 variants x 4 states = **12 variants** + 3 component properties. Down from 144.

### Strategy 2: Offload to Variables

Use variable modes instead of variants for properties that change numeric/color values without altering structure:

- **Size**: Variable mode changes padding, font-size, gap, icon-size
- **Theme/Color**: Variable mode changes fill colors, text colors, border colors
- **Density**: Variable mode changes spacing and padding

### Strategy 3: Separate Component Sets by Hierarchy

Instead of one Button component with a "hierarchy" variant (primary/secondary/tertiary), create separate component sets:
- `Button / Primary` (component set with State variants)
- `Button / Secondary` (component set with State variants)
- `Button / Ghost` (component set with State variants)

Benefits:
- Better discoverability in the Assets panel (visual thumbnails)
- Each can evolve independently (different layer structures if needed)
- Granular library versioning and publish notes
- Reduces property clutter for consumers

### Strategy 4: Use Nested Instances for Slot-like Content

Instead of creating icon variants:
- Add a single icon instance inside the button
- Make it an instance swap property
- Add a boolean to show/hide it

This replaces an entire dimension of the variant matrix (4 icon options x N other variants) with 2 properties.

### Strategy 5: Use Slots for Content Variation

For components like cards, modals, and list items where content varies:
- Use a slot instead of variant combinations for "with image / without image / with badge / with subtitle"
- One component with a slot replaces 2^N boolean variant combinations

### Decision Framework Summary

```
Does the property change LAYOUT STRUCTURE (different layers)?
  YES -> Variant property
  NO -> Does it change NUMERIC VALUES (spacing, size, color)?
    YES -> Variable mode
    NO -> Does it SHOW/HIDE a layer?
      YES -> Boolean property
      NO -> Does it SWAP one component for another?
        YES -> Instance swap property
        NO -> Does it change TEXT content?
          YES -> Text property
          NO -> Does it need FREE-FORM content?
            YES -> Slot property
```

### Naming Convention Alignment with React

| Figma Property Name | React Prop | TypeScript Type |
|---|---|---|
| `Variant` | `variant` | `'primary' \| 'secondary' \| 'ghost'` |
| `Size` | `size` | `'sm' \| 'md' \| 'lg'` |
| `State` | N/A (CSS pseudo-states) | Handled by CSS `:hover`, `:active`, `:disabled` |
| `Has Icon` | `icon?: ReactNode` (presence = truthy) | `React.ReactNode \| undefined` |
| `Icon` (instance swap) | `icon` | `React.ComponentType` |
| `Label` (text) | `children` or `label` | `string` |
| `Content` (slot) | `children` | `React.ReactNode` |

---

## Quick Reference: Figma -> React Cheat Sheet

| I want to... | In Figma, use... | In React, use... |
|---|---|---|
| Change visual style (primary/secondary) | Variant property | Union type prop |
| Show/hide an element | Boolean property | Conditional rendering |
| Replace an icon | Instance swap | Component prop (`icon?: ReactNode`) |
| Edit text content | Text property | String prop or children |
| Allow arbitrary content | Slot | `children` prop |
| Change spacing/sizing per breakpoint | Variable modes | CSS custom properties + media queries |
| Handle hover/active states | Interactive component variants | CSS `:hover`, `:active` pseudo-classes |
| Create responsive layouts | Auto layout + Fill + Min/Max | Flexbox + `flex: 1` + `min-width`/`max-width` |
| Two-dimensional grid | Grid auto layout (beta) | CSS Grid |
| Theme switching | Variable modes (light/dark) | CSS variables or theme context |

---

## Sources

### Auto-Layout & Flexbox
- [Guide to Auto Layout - Figma Help Center](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout)
- [Auto Layout - Figma for Developers (Steve Kinney)](https://stevekinney.com/courses/figma/auto-layout)
- [Integrating Flexbox Principles with Figma Auto Layout - Ascend UX](https://pros.com/ascend/integrating-flexbox-principles-with-figma-auto-layout/)
- [Auto Layout = display: flex - Figma Community](https://www.figma.com/community/file/1127864650040224142)
- [What the Fig is Auto Layout (Jamie Ryan)](https://www.jamieryan.ie/writing/what-the-fig-is-auto-layout)

### Component Properties
- [Explore Component Properties - Figma Help Center](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
- [Create and Manage Component Properties - Figma Help Center](https://help.figma.com/hc/en-us/articles/8883756012823-Create-and-manage-component-properties)
- [Using Figma's Instance Swap and Other Component Properties - LogRocket](https://blog.logrocket.com/ux-design/using-component-properties-figma/)
- [When to Use Variants vs Component Props vs Variables (Alice Packard)](https://www.alicepackarddesign.com/blog/when-you-should-use-variants-vs-creating-separate-components)

### Nested Components & Atomic Design
- [Creating Atomic Components in Figma - Figma Blog](https://www.figma.com/blog/creating-atomic-components-in-figma/)
- [Nested Components: Building Complexity Without Losing Control - Designilo](https://designilo.com/2025/07/12/nested-components-in-figma-building-complexity-without-losing-control/)
- [Rethink Your Figma Components with a Modular Nested Approach](https://medium.com/design-bootcamp/rethink-your-figma-components-with-a-modular-nested-approach-98a79c2c1da3)

### Slots
- [Use Slots to Build Flexible Components - Figma Help Center](https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma)
- [How to Supercharge your Design System with Slots - Figma Blog](https://www.figma.com/blog/supercharge-your-design-system-with-slots/)
- [Implementing Slots in a Figma Library (Nathan Curtis)](https://nathanacurtis.substack.com/p/implementing-slots-in-a-figma-library)
- [Figma Slots: What It Is, Why It Exists](https://medium.com/@Atrams/figma-slots-what-it-is-why-it-exists-and-what-it-teaches-you-about-design-8f7f6dd2288d)

### Responsive Design
- [Figma Responsive Design Patterns: Variables & Variants - Devot](https://devot.team/blog/figma-responsive-design)
- [Create a Responsive Card with Auto Layout - Figma Help Center](https://help.figma.com/hc/en-us/articles/18894664907287-Create-a-responsive-card-with-auto-layout-and-constraints)
- [Responsive Components in Figma (Flex Design System)](https://flexdesignsystem.com/how-to-create-responsive-components-in-figma/)

### Plan Constraints & Variables
- [What's New from Schema 2025 - Figma Help Center](https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025)
- [Modes for Variables - Figma Help Center](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- [Variable Mode Limit Discussion - Figma Forum](https://forum.figma.com/suggest-a-feature-11/launched-all-plans-should-offer-more-than-4-variable-modes-13979)
- [Branching Feature for Professional Plan - Figma Forum](https://forum.figma.com/suggest-a-feature-11/branching-feature-for-professional-plan-31418)

### Variant Management
- [Create and Use Variants - Figma Help Center](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants)
- [Creating and Organizing Variants - Figma Best Practices](https://www.figma.com/best-practices/creating-and-organizing-variants/)
- [Figma Variants & Component Properties (The Code Accelerator)](https://thecodeaccelerator.com/blog/figma-variants-component-properties)

### Code Connect
- [Connecting React Components - Figma Developer Docs](https://developers.figma.com/docs/code-connect/react/)
- [Props and Variables - Figma Developer Docs](https://developers.figma.com/docs/code/props-and-variables/)

### Grid Auto Layout
- [Figma's New Grid Auto-Layout: What It Does and Doesn't Yet Do (Nearform)](https://nearform.com/digital-community/figmas-new-grid-auto-layout-what-it-does-and-doesnt-yet-do/)
- [Grid Auto Layout Flow - Figma Help Center](https://help.figma.com/hc/en-us/articles/31289469907863-Use-the-grid-auto-layout-flow)
