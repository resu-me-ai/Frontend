import type React from 'react';

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  active?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  ariaLabel,
  active = false,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
  };

  const stateClasses = active
    ? 'text-indigo-500 bg-indigo-50'
    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg bg-transparent transition-colors duration-150 ${sizeClasses[size]} ${stateClasses} ${disabledClasses} ${className}`}
    >
      {icon}
    </button>
  );
};
