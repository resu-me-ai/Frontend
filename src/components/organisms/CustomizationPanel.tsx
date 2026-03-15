import React, { useState } from 'react';
import { Download, FileText, Copy } from 'lucide-react';
import { LayoutStyleCard } from '@/components/molecules/LayoutStyleCard';
import { ColorSchemeCard } from '@/components/molecules/ColorSchemeCard';
import { FontFamilyCard } from '@/components/molecules/FontFamilyCard';
import { SectionHeaderOption } from '@/components/molecules/SectionHeaderOption';
import {
  mockLayoutStyles,
  mockColorSchemes,
  mockFontFamilies,
  mockSectionHeaderOptions,
  mockCustomizationDefaults,
} from '@/mocks/customization.mock';

export interface CustomizationPanelProps {
  onDownloadPdf?: () => void;
  onDownloadWord?: () => void;
  onCopyText?: () => void;
  className?: string;
}

/** Full customization panel: layout/color/font/header selectors + download */
export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  onDownloadPdf,
  onDownloadWord,
  onCopyText,
  className = '',
}) => {
  const [selectedLayout, setSelectedLayout] = useState(mockCustomizationDefaults.layoutStyleId);
  const [selectedColor, setSelectedColor] = useState(mockCustomizationDefaults.colorSchemeId);
  const [selectedFont, setSelectedFont] = useState(mockCustomizationDefaults.fontFamilyId);
  const [selectedHeader, setSelectedHeader] = useState(mockCustomizationDefaults.sectionHeaderId);

  return (
    <div className={`bg-white rounded-[10px] shadow-sm border border-border-default flex flex-col ${className}`}>
      {/* Header */}
      <div className="px-6 pt-6 pb-1 border-b border-border-default">
        <h2 className="text-xl font-semibold text-text-heading">Customize Your Resume</h2>
        <p className="text-sm text-text-muted mt-1 mb-4">Choose your preferred layout, colors, and fonts</p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
        {/* Layout Style */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-text-heading">Layout Style</h3>
          <div className="grid grid-cols-3 gap-4">
            {mockLayoutStyles.map((style) => (
              <LayoutStyleCard
                key={style.id}
                emoji={style.emoji}
                label={style.label}
                description={style.description}
                selected={selectedLayout === style.id}
                onClick={() => setSelectedLayout(style.id)}
              />
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-text-heading">Color Scheme</h3>
          <div className="grid grid-cols-3 gap-4">
            {mockColorSchemes.map((scheme) => (
              <ColorSchemeCard
                key={scheme.id}
                label={scheme.label}
                primaryColor={scheme.primaryColor}
                secondaryColor={scheme.secondaryColor}
                selected={selectedColor === scheme.id}
                onClick={() => setSelectedColor(scheme.id)}
              />
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-text-heading">Font Family</h3>
          <div className="grid grid-cols-3 gap-4">
            {mockFontFamilies.map((font) => (
              <FontFamilyCard
                key={font.id}
                label={font.label}
                description={font.description}
                previewFont={font.previewFont}
                selected={selectedFont === font.id}
                onClick={() => setSelectedFont(font.id)}
              />
            ))}
          </div>
        </div>

        {/* Section Headers */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-text-heading">Section Headers</h3>
          <div className="flex gap-4">
            {mockSectionHeaderOptions.map((option) => (
              <SectionHeaderOption
                key={option.id}
                label={option.label}
                description={option.description}
                selected={selectedHeader === option.id}
                onClick={() => setSelectedHeader(option.id)}
              />
            ))}
          </div>
        </div>

        {/* Preview note */}
        <div className="bg-info-light border border-blue-200 rounded-[10px] px-4 py-3">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Preview:</span>{' '}
            Your customized resume is displayed on the left. Adjust the settings above to see real-time changes.
          </p>
        </div>
      </div>

      {/* Download Footer */}
      <div className="p-6 border-t border-border-default flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="flex-1 bg-action-primary text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-action-primary-hover transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onDownloadWord}
            className="flex-1 bg-action-primary text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-action-primary-hover transition-colors"
          >
            <FileText size={16} />
            Download Word
          </button>
        </div>
        <button
          type="button"
          onClick={onCopyText}
          className="w-full border border-border-input text-text-body font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-bg-surface transition-colors"
        >
          <Copy size={16} />
          Copy Resume Text
        </button>
        <p className="text-xs text-text-muted text-center">
          Your resume data is processed locally and never stored on our servers
        </p>
      </div>
    </div>
  );
};
