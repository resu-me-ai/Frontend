import React from 'react';

export interface TemplateCardProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  name,
  selected = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`border rounded-lg p-2 text-left transition-colors ${
        selected ? 'border-primary bg-info-light' : 'border-border-default hover:border-border-input'
      } ${className}`}
    >
      <div className="bg-bg-muted rounded h-16 mb-2" />
      <span className="text-xs text-text-subtle">{name}</span>
    </button>
  );
};
