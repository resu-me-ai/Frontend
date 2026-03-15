import React from 'react';

export interface SectionHeaderOptionProps {
  label: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Toggle between section header styles (no bg / with bg) */
export const SectionHeaderOption: React.FC<SectionHeaderOptionProps> = ({
  label,
  description,
  selected = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-[10px] border-[1.5px] px-4 pt-5 pb-2 flex-1 transition-colors text-center
        ${selected ? 'bg-info-light border-action-primary' : 'bg-white border-border-default hover:border-border-input'}
        ${className}`}
    >
      <span className="text-sm font-semibold text-text-heading">{label}</span>
      <span className="text-xs text-text-muted">{description}</span>
    </button>
  );
};
