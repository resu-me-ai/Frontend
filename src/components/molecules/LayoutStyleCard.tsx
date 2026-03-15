import React from 'react';

export interface LayoutStyleCardProps {
  emoji: string;
  label: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Selectable layout style card with emoji thumbnail */
export const LayoutStyleCard: React.FC<LayoutStyleCardProps> = ({
  emoji,
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
      className={`flex flex-col items-center gap-2 rounded-[10px] border-[1.5px] px-4 pt-5 pb-2 w-full transition-colors text-center
        ${selected ? 'bg-info-light border-action-primary' : 'bg-white border-border-default hover:border-border-input'}
        ${className}`}
    >
      <span className="text-4xl leading-10">{emoji}</span>
      <span className="text-sm font-semibold text-text-heading">{label}</span>
      <span className="text-xs text-text-muted leading-4">{description}</span>
    </button>
  );
};
