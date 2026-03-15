import React from 'react';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center px-4 py-2 rounded-md text-base font-normal
        border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${
          selected
            ? 'bg-[#D8E3F0] border-progress-active text-text-primary'
            : 'bg-white border-gray-300 text-text-primary hover:border-gray-400'
        }
        ${className}
      `}
    >
      {label}
    </button>
  );
};

