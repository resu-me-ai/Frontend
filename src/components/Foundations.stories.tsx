import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Icon, type IconProps } from './atoms/Icon';

/* ================================================================
   Foundations — Design Token Reference
   ================================================================
   Renders every CSS custom property from the @theme block in
   index.css plus the full Icon library. Intended for Figma capture
   as the "Foundations" page of the Design System file.
   ================================================================ */

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type ColorToken = { name: string; var: string; hex: string };

const GRAY: ColorToken[] = [
  { name: 'gray-50', var: '--color-gray-50', hex: '#f9fafb' },
  { name: 'gray-100', var: '--color-gray-100', hex: '#f3f4f6' },
  { name: 'gray-200', var: '--color-gray-200', hex: '#e5e7eb' },
  { name: 'gray-300', var: '--color-gray-300', hex: '#d1d5db' },
  { name: 'gray-400', var: '--color-gray-400', hex: '#9ca3af' },
  { name: 'gray-500', var: '--color-gray-500', hex: '#6b7280' },
  { name: 'gray-600', var: '--color-gray-600', hex: '#4b5563' },
  { name: 'gray-700', var: '--color-gray-700', hex: '#374151' },
  { name: 'gray-800', var: '--color-gray-800', hex: '#1f2937' },
  { name: 'gray-900', var: '--color-gray-900', hex: '#111827' },
];

const BLUE: ColorToken[] = [
  { name: 'blue-50', var: '--color-blue-50', hex: '#eff6ff' },
  { name: 'blue-100', var: '--color-blue-100', hex: '#dbeafe' },
  { name: 'blue-200', var: '--color-blue-200', hex: '#bfdbfe' },
  { name: 'blue-500', var: '--color-blue-500', hex: '#3b82f6' },
  { name: 'blue-600', var: '--color-blue-600', hex: '#2563eb' },
  { name: 'blue-700', var: '--color-blue-700', hex: '#1d4ed8' },
  { name: 'blue-800', var: '--color-blue-800', hex: '#1e40af' },
  { name: 'blue-900', var: '--color-blue-900', hex: '#1e3a8a' },
];

const GREEN: ColorToken[] = [
  { name: 'green-50', var: '--color-green-50', hex: '#f0fdf4' },
  { name: 'green-100', var: '--color-green-100', hex: '#dcfce7' },
  { name: 'green-200', var: '--color-green-200', hex: '#d1fae5' },
  { name: 'green-500', var: '--color-green-500', hex: '#22c55e' },
  { name: 'green-600', var: '--color-green-600', hex: '#16a34a' },
  { name: 'green-700', var: '--color-green-700', hex: '#15803d' },
  { name: 'green-800', var: '--color-green-800', hex: '#065f46' },
];

const RED: ColorToken[] = [
  { name: 'red-100', var: '--color-red-100', hex: '#fee2e2' },
  { name: 'red-200', var: '--color-red-200', hex: '#fef2f2' },
  { name: 'red-500', var: '--color-red-500', hex: '#ef4444' },
  { name: 'red-600', var: '--color-red-600', hex: '#dc2626' },
  { name: 'red-700', var: '--color-red-700', hex: '#b91c1c' },
];

const ORANGE: ColorToken[] = [
  { name: 'orange-100', var: '--color-orange-100', hex: '#ffedd5' },
  { name: 'orange-200', var: '--color-orange-200', hex: '#fff7ed' },
  { name: 'orange-500', var: '--color-orange-500', hex: '#f97316' },
  { name: 'orange-600', var: '--color-orange-600', hex: '#ea580c' },
];

const AMBER: ColorToken[] = [
  { name: 'amber-100', var: '--color-amber-100', hex: '#fef3c7' },
  { name: 'amber-200', var: '--color-amber-200', hex: '#fefce8' },
  { name: 'amber-300', var: '--color-amber-300', hex: '#fef9c3' },
  { name: 'amber-400', var: '--color-amber-400', hex: '#fbbf24' },
  { name: 'amber-500', var: '--color-amber-500', hex: '#f59e0b' },
  { name: 'amber-600', var: '--color-amber-600', hex: '#d97706' },
  { name: 'amber-700', var: '--color-amber-700', hex: '#ca8a04' },
  { name: 'amber-800', var: '--color-amber-800', hex: '#92400e' },
  { name: 'amber-900', var: '--color-amber-900', hex: '#78350f' },
  { name: 'amber-warm', var: '--color-amber-warm', hex: '#fffbeb' },
];

const VIOLET: ColorToken[] = [
  { name: 'violet-50', var: '--color-violet-50', hex: '#f5f3ff' },
  { name: 'violet-100', var: '--color-violet-100', hex: '#f3e8ff' },
  { name: 'violet-200', var: '--color-violet-200', hex: '#eef2ff' },
  { name: 'violet-400', var: '--color-violet-400', hex: '#a78bfa' },
  { name: 'violet-600', var: '--color-violet-600', hex: '#7c3aed' },
  { name: 'violet-700', var: '--color-violet-700', hex: '#6d28d9' },
  { name: 'violet-800', var: '--color-violet-800', hex: '#7e22ce' },
  { name: 'violet-900', var: '--color-violet-900', hex: '#9333ea' },
];

const YELLOW: ColorToken[] = [
  { name: 'yellow-500', var: '--color-yellow-500', hex: '#eab308' },
];

type SemanticToken = { name: string; var: string; resolvedHex: string; alias?: string };

const SEMANTIC_BRAND: SemanticToken[] = [
  { name: 'primary', var: '--color-primary', resolvedHex: '#3a56ff' },
  { name: 'primary-dark', var: '--color-primary-dark', resolvedHex: '#0e2157' },
  { name: 'brand-subtitle', var: '--color-brand-subtitle', resolvedHex: '#5D7285' },
];

const SEMANTIC_TEXT: SemanticToken[] = [
  { name: 'text-heading', var: '--color-text-heading', resolvedHex: '#111827', alias: 'gray-900' },
  { name: 'text-primary', var: '--color-text-primary', resolvedHex: '#1f2937', alias: 'gray-800' },
  { name: 'text-body', var: '--color-text-body', resolvedHex: '#374151', alias: 'gray-700' },
  { name: 'text-subtle', var: '--color-text-subtle', resolvedHex: '#4b5563', alias: 'gray-600' },
  { name: 'text-muted', var: '--color-text-muted', resolvedHex: '#6b7280', alias: 'gray-500' },
  { name: 'text-placeholder', var: '--color-text-placeholder', resolvedHex: '#9ca3af', alias: 'gray-400' },
  { name: 'text-secondary', var: '--color-text-secondary', resolvedHex: '#5a5a5a' },
];

const SEMANTIC_SURFACES: SemanticToken[] = [
  { name: 'bg-page', var: '--color-bg-page', resolvedHex: '#f9fafb', alias: 'gray-50' },
  { name: 'bg-muted', var: '--color-bg-muted', resolvedHex: '#f3f4f6', alias: 'gray-100' },
  { name: 'bg-gray', var: '--color-bg-gray', resolvedHex: '#f5f7fa' },
  { name: 'bg-surface', var: '--color-bg-surface', resolvedHex: '#f9fafb', alias: 'gray-50' },
  { name: 'bg-skeleton', var: '--color-bg-skeleton', resolvedHex: '#d1d5dc' },
];

const SEMANTIC_BORDERS: SemanticToken[] = [
  { name: 'border-default', var: '--color-border-default', resolvedHex: '#e5e7eb', alias: 'gray-200' },
  { name: 'border-input', var: '--color-border-input', resolvedHex: '#d1d5db', alias: 'gray-300' },
  { name: 'border-gray', var: '--color-border-gray', resolvedHex: '#d9d9d9' },
];

const SEMANTIC_INTERACTIVE: SemanticToken[] = [
  { name: 'action-primary', var: '--color-action-primary', resolvedHex: '#2563eb', alias: 'blue-600' },
  { name: 'action-primary-hover', var: '--color-action-primary-hover', resolvedHex: '#1d4ed8', alias: 'blue-700' },
  { name: 'progress-active', var: '--color-progress-active', resolvedHex: '#116ad3' },
  { name: 'progress-inactive', var: '--color-progress-inactive', resolvedHex: '#c7d3eb' },
];

const SEMANTIC_STATUS: SemanticToken[] = [
  { name: 'success', var: '--color-success', resolvedHex: '#16a34a', alias: 'green-600' },
  { name: 'success-light', var: '--color-success-light', resolvedHex: '#f0fdf4', alias: 'green-50' },
  { name: 'success-subtle', var: '--color-success-subtle', resolvedHex: '#dcfce7', alias: 'green-100' },
  { name: 'error', var: '--color-error', resolvedHex: '#ef4444', alias: 'red-500' },
  { name: 'error-strong', var: '--color-error-strong', resolvedHex: '#dc2626', alias: 'red-600' },
  { name: 'error-subtle', var: '--color-error-subtle', resolvedHex: '#fee2e2', alias: 'red-100' },
  { name: 'warning', var: '--color-warning', resolvedHex: '#ea580c', alias: 'orange-600' },
  { name: 'warning-subtle', var: '--color-warning-subtle', resolvedHex: '#fef3c7', alias: 'amber-100' },
  { name: 'info', var: '--color-info', resolvedHex: '#3b82f6', alias: 'blue-500' },
  { name: 'info-light', var: '--color-info-light', resolvedHex: '#eff6ff', alias: 'blue-50' },
  { name: 'info-subtle', var: '--color-info-subtle', resolvedHex: '#dbeafe', alias: 'blue-100' },
];

const SEMANTIC_ACCENT: SemanticToken[] = [
  { name: 'accent-purple', var: '--color-accent-purple', resolvedHex: '#7c3aed', alias: 'violet-600' },
  { name: 'bg-accent-purple', var: '--color-bg-accent-purple', resolvedHex: '#f5f3ff', alias: 'violet-50' },
];

const FONT_SIZES = [
  { label: 'xs', size: '12px', tw: 'text-xs' },
  { label: 'sm', size: '14px', tw: 'text-sm' },
  { label: 'base', size: '16px', tw: 'text-base' },
  { label: 'lg', size: '18px', tw: 'text-lg' },
  { label: 'xl', size: '20px', tw: 'text-xl' },
  { label: '2xl', size: '24px', tw: 'text-2xl' },
  { label: '3xl', size: '30px', tw: 'text-3xl' },
  { label: '4xl', size: '36px', tw: 'text-4xl' },
];

const FONT_WEIGHTS = [
  { label: 'Normal', weight: 400, tw: 'font-normal' },
  { label: 'Medium', weight: 500, tw: 'font-medium' },
  { label: 'Semibold', weight: 600, tw: 'font-semibold' },
  { label: 'Bold', weight: 700, tw: 'font-bold' },
  { label: 'Extrabold', weight: 800, tw: 'font-extrabold' },
];

const SPACING_STEPS = [
  { key: '0', rem: '0rem', px: '0px' },
  { key: '0.5', rem: '0.125rem', px: '2px' },
  { key: '1', rem: '0.25rem', px: '4px' },
  { key: '1.5', rem: '0.375rem', px: '6px' },
  { key: '2', rem: '0.5rem', px: '8px' },
  { key: '2.5', rem: '0.625rem', px: '10px' },
  { key: '3', rem: '0.75rem', px: '12px' },
  { key: '3.5', rem: '0.875rem', px: '14px' },
  { key: '4', rem: '1rem', px: '16px' },
  { key: '5', rem: '1.25rem', px: '20px' },
  { key: '6', rem: '1.5rem', px: '24px' },
  { key: '8', rem: '2rem', px: '32px' },
  { key: '10', rem: '2.5rem', px: '40px' },
  { key: '12', rem: '3rem', px: '48px' },
  { key: '16', rem: '4rem', px: '64px' },
  { key: '20', rem: '5rem', px: '80px' },
  { key: '24', rem: '6rem', px: '96px' },
];

const RADII = [
  { label: 'sm', value: '0.25rem', var: '--radius-sm' },
  { label: 'md', value: '0.375rem', var: '--radius-md' },
  { label: 'lg', value: '0.5rem', var: '--radius-lg' },
  { label: 'xl', value: '0.75rem', var: '--radius-xl' },
  { label: '2xl', value: '1rem', var: '--radius-2xl' },
  { label: 'full', value: '9999px', var: '--radius-full' },
];

const ICON_NAMES: IconProps['name'][] = [
  'chevron-down',
  'map-pin',
  'briefcase',
  'arrow-right',
  'arrow-left',
  'check',
  'upload',
  'pdf',
  'word',
  'pencil',
  'luggage',
  'drop',
  'magic-wand',
  'skills-match',
  'experience',
  'qualifications',
  'keywords',
  'missing-skills',
  'ats',
  'priority',
  'ready-to-perfect',
  'info',
  'magic-wand-blue',
  'pdf-white',
];

// ---------------------------------------------------------------------------
// Reusable sub-components
// ---------------------------------------------------------------------------

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold mb-4 text-gray-900">{children}</h2>
);

const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-semibold mb-3 text-gray-700">{children}</h3>
);

const Divider: React.FC = () => (
  <hr className="my-10 border-gray-200" />
);

/** Renders a single color swatch (primitive scales). */
const ColorSwatch: React.FC<ColorToken> = ({ name, hex }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
      style={{ backgroundColor: hex }}
      title={`${name}: ${hex}`}
    />
    <span className="text-xs font-medium text-gray-700 text-center leading-tight">{name}</span>
    <span className="text-[10px] font-mono text-gray-400 uppercase">{hex}</span>
  </div>
);

/** Renders a semantic color row with alias chain. */
const SemanticRow: React.FC<SemanticToken> = ({ name, var: cssVar, resolvedHex, alias }) => (
  <div className="flex items-center gap-4 py-2">
    <div
      className="w-10 h-10 rounded-md shadow-sm border border-gray-200 shrink-0"
      style={{ backgroundColor: resolvedHex }}
    />
    <div className="flex flex-col min-w-0">
      <span className="text-sm font-semibold text-gray-800">{name}</span>
      <span className="text-xs font-mono text-gray-400 truncate">
        {cssVar}
        {alias ? ` \u2192 ${alias} \u2192 ${resolvedHex}` : ` \u2192 ${resolvedHex}`}
      </span>
    </div>
  </div>
);

/** Renders a primitive color scale group. */
const ColorScaleGroup: React.FC<{ title: string; tokens: ColorToken[] }> = ({ title, tokens }) => (
  <div className="mb-8">
    <SubSectionTitle>{title}</SubSectionTitle>
    <div className="flex flex-wrap gap-4">
      {tokens.map((t) => (
        <ColorSwatch key={t.name} {...t} />
      ))}
    </div>
  </div>
);

/** Renders a semantic color group. */
const SemanticGroup: React.FC<{ title: string; tokens: SemanticToken[] }> = ({ title, tokens }) => (
  <div className="mb-6">
    <SubSectionTitle>{title}</SubSectionTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
      {tokens.map((t) => (
        <SemanticRow key={t.name} {...t} />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Section renderers
// ---------------------------------------------------------------------------

const ColorPrimitivesSection: React.FC = () => (
  <section>
    <SectionTitle>1. Color Primitives</SectionTitle>
    <p className="text-sm text-gray-500 mb-6">
      Raw color values from the design system. These are the building blocks referenced by semantic tokens.
    </p>
    <ColorScaleGroup title="Gray" tokens={GRAY} />
    <ColorScaleGroup title="Blue" tokens={BLUE} />
    <ColorScaleGroup title="Green" tokens={GREEN} />
    <ColorScaleGroup title="Red" tokens={RED} />
    <ColorScaleGroup title="Orange" tokens={ORANGE} />
    <ColorScaleGroup title="Amber / Yellow" tokens={AMBER} />
    <ColorScaleGroup title="Violet / Purple" tokens={VIOLET} />
    <ColorScaleGroup title="Yellow" tokens={YELLOW} />
  </section>
);

const SemanticColorsSection: React.FC = () => (
  <section>
    <SectionTitle>2. Semantic Colors</SectionTitle>
    <p className="text-sm text-gray-500 mb-6">
      Purpose-driven aliases that map to the primitive palette. Use these in components instead of raw values.
    </p>
    <SemanticGroup title="Brand" tokens={SEMANTIC_BRAND} />
    <SemanticGroup title="Text" tokens={SEMANTIC_TEXT} />
    <SemanticGroup title="Surfaces" tokens={SEMANTIC_SURFACES} />
    <SemanticGroup title="Borders" tokens={SEMANTIC_BORDERS} />
    <SemanticGroup title="Interactive" tokens={SEMANTIC_INTERACTIVE} />
    <SemanticGroup title="Status" tokens={SEMANTIC_STATUS} />
    <SemanticGroup title="Accent" tokens={SEMANTIC_ACCENT} />
  </section>
);

const TypographySection: React.FC = () => (
  <section>
    <SectionTitle>3. Typography</SectionTitle>
    <p className="text-sm text-gray-500 mb-6">
      Font families, sizes, and weights defined in the design system.
    </p>

    {/* Font Families */}
    <SubSectionTitle>Font Families</SubSectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { name: 'Inter', var: '--font-family-inter', role: 'Primary / Sans' },
        { name: 'Pretendard', var: '--font-family-pretendard', role: 'Secondary' },
        { name: 'Epilogue', var: '--font-family-epilogue', role: 'Display' },
      ].map((f) => (
        <div key={f.name} className="p-5 border border-gray-200 rounded-lg bg-white">
          <p
            className="text-2xl mb-1"
            style={{ fontFamily: `var(${f.var})` }}
          >
            {f.name}
          </p>
          <p className="text-xs font-mono text-gray-400 mb-2">{f.var}</p>
          <p className="text-xs text-gray-500">{f.role}</p>
          <p
            className="text-sm mt-3 text-gray-700"
            style={{ fontFamily: `var(${f.var})` }}
          >
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>
      ))}
    </div>

    {/* Font Sizes */}
    <SubSectionTitle>Font Sizes</SubSectionTitle>
    <div className="space-y-4 mb-8">
      {FONT_SIZES.map((fs) => (
        <div key={fs.label} className="flex items-baseline gap-4">
          <span className="text-xs font-mono text-gray-400 w-20 text-right shrink-0">
            {fs.label} ({fs.size})
          </span>
          <span style={{ fontSize: fs.size }} className="text-gray-800 font-normal leading-snug">
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      ))}
    </div>

    {/* Font Weights */}
    <SubSectionTitle>Font Weights</SubSectionTitle>
    <div className="space-y-3">
      {FONT_WEIGHTS.map((fw) => (
        <div key={fw.weight} className="flex items-baseline gap-4">
          <span className="text-xs font-mono text-gray-400 w-28 text-right shrink-0">
            {fw.weight} ({fw.label})
          </span>
          <span
            className="text-base text-gray-800"
            style={{ fontWeight: fw.weight }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      ))}
    </div>
  </section>
);

const SpacingSection: React.FC = () => (
  <section>
    <SectionTitle>4. Spacing Scale</SectionTitle>
    <p className="text-sm text-gray-500 mb-6">
      Tailwind default spacing scale used across the application. Each step doubles at regular
      intervals for a consistent rhythm.
    </p>
    <div className="space-y-2.5">
      {SPACING_STEPS.map((s) => (
        <div key={s.key} className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 w-24 text-right shrink-0">
            {s.key}
          </span>
          <div
            className="h-5 rounded-sm"
            style={{
              width: s.px === '0px' ? '2px' : s.px,
              backgroundColor: 'var(--color-blue-500)',
              minWidth: 2,
            }}
          />
          <span className="text-xs text-gray-500 shrink-0">
            {s.rem} = {s.px}
          </span>
        </div>
      ))}
    </div>
  </section>
);

const RadiusSection: React.FC = () => (
  <section>
    <SectionTitle>5. Radius Scale</SectionTitle>
    <p className="text-sm text-gray-500 mb-6">
      Border-radius tokens controlling corner rounding across components.
    </p>
    <div className="flex flex-wrap gap-6">
      {RADII.map((r) => (
        <div key={r.label} className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 border-2 border-blue-500 bg-blue-50"
            style={{ borderRadius: r.value }}
          />
          <span className="text-sm font-semibold text-gray-700">{r.label}</span>
          <span className="text-[10px] font-mono text-gray-400">{r.value}</span>
          <span className="text-[10px] font-mono text-gray-300">{r.var}</span>
        </div>
      ))}
    </div>
  </section>
);

const IconsSection: React.FC = () => (
  <section>
    <SectionTitle>6. Icon Library</SectionTitle>
    <p className="text-sm text-gray-500 mb-6">
      All {ICON_NAMES.length} icons available via the <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{'<Icon />'}</code> component.
      SVG icons render inline; bitmap icons are imported as image assets.
    </p>
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-3 border border-gray-100 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 flex items-center justify-center text-gray-700">
            <Icon name={name} size={24} />
          </div>
          <span className="text-[10px] text-gray-500 text-center leading-tight break-all">
            {name}
          </span>
        </div>
      ))}
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Full page rendering of every design token -- intended for Figma capture. */
export const AllTokens: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Design Tokens
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          A comprehensive reference of all 93 CSS custom properties, typography scales, spacing
          values, border radii, and the icon library powering the Resu-ME AI design system.
        </p>
      </header>

      <ColorPrimitivesSection />
      <Divider />
      <SemanticColorsSection />
      <Divider />
      <TypographySection />
      <Divider />
      <SpacingSection />
      <Divider />
      <RadiusSection />
      <Divider />
      <IconsSection />

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          Generated from <code>src/index.css</code> @theme block and <code>src/components/atoms/Icon.tsx</code>.
          Last token count: 93 CSS custom properties, {ICON_NAMES.length} icons.
        </p>
      </footer>
    </div>
  ),
};

/** Color primitives and semantic color tokens. */
export const Colors: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-10 max-w-7xl mx-auto">
      <ColorPrimitivesSection />
      <Divider />
      <SemanticColorsSection />
    </div>
  ),
};

/** Typography: font families, sizes, and weights. */
export const Typography: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-10 max-w-7xl mx-auto">
      <TypographySection />
    </div>
  ),
};

/** Spacing scale and border radius tokens. */
export const SpacingAndRadius: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-10 max-w-7xl mx-auto">
      <SpacingSection />
      <Divider />
      <RadiusSection />
    </div>
  ),
};

/** All icons from the Icon component. */
export const Icons: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-10 max-w-7xl mx-auto">
      <IconsSection />
    </div>
  ),
};
