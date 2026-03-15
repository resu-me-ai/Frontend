/**
 * Mock data for Resume Customization page
 * Layout styles, color schemes, font families, section header options
 */

export interface MockLayoutStyle {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface MockColorScheme {
  id: string;
  label: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface MockFontFamily {
  id: string;
  label: string;
  description: string;
  previewFont: string;
}

export interface MockSectionHeaderOption {
  id: string;
  label: string;
  description: string;
}

export const mockLayoutStyles: MockLayoutStyle[] = [
  { id: 'modern', emoji: '\uD83D\uDCC4', label: 'Modern', description: 'Clean layout with subtle accents' },
  { id: 'classic', emoji: '\uD83D\uDCCB', label: 'Classic', description: 'Traditional two-column design' },
  { id: 'minimal', emoji: '\uD83D\uDCC3', label: 'Minimal', description: 'Simple and straightforward' },
];

export const mockColorSchemes: MockColorScheme[] = [
  { id: 'blue', label: 'Professional Blue', primaryColor: '#2563eb', secondaryColor: '#3b82f6' },
  { id: 'green', label: 'Corporate Green', primaryColor: '#16a34a', secondaryColor: '#22c55e' },
  { id: 'mono', label: 'Monochrome', primaryColor: '#000000', secondaryColor: '#374151' },
];

export const mockFontFamilies: MockFontFamily[] = [
  { id: 'montserrat', label: 'Montserrat', description: 'Modern & geometric', previewFont: 'Montserrat, sans-serif' },
  { id: 'garamond', label: 'Garamond', description: 'Classic & elegant', previewFont: 'Garamond, serif' },
  { id: 'inter', label: 'Inter', description: 'Clean & versatile', previewFont: 'Inter, sans-serif' },
];

export const mockSectionHeaderOptions: MockSectionHeaderOption[] = [
  { id: 'no-bg', label: 'No Background', description: 'Simple border style' },
  { id: 'with-bg', label: 'With Background', description: 'Colored background box' },
];

export const mockCustomizationDefaults = {
  layoutStyleId: 'modern',
  colorSchemeId: 'blue',
  fontFamilyId: 'inter',
  sectionHeaderId: 'no-bg',
};
