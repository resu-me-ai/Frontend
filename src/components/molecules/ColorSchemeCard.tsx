import React from 'react';

export interface ColorSchemeCardProps {
  label: string;
  primaryColor: string;
  secondaryColor: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Selectable color scheme card with color swatch pair */
export const ColorSchemeCard: React.FC<ColorSchemeCardProps> = ({
  label,
  primaryColor,
  secondaryColor,
  selected = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-3 rounded-[10px] border-[1.5px] px-4 pt-5 pb-2 w-full transition-colors
        ${selected ? 'bg-info-light border-action-primary' : 'bg-white border-border-default hover:border-border-input'}
        ${className}`}
    >
      <div className="flex gap-2 justify-center">
        <div
          className="w-8 h-8 rounded"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="w-8 h-8 rounded"
          style={{ backgroundColor: secondaryColor }}
        />
      </div>
      <span className="text-sm font-semibold text-text-heading text-center">{label}</span>
    </button>
  );
};
