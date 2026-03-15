import React from 'react';
import { Icon } from '@/components/atoms/Icon';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: DropdownOption[];
  error?: string;
  leadingIcon?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className = '', error, leadingIcon, options, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="w-full">
        <div className="relative">
          {leadingIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              {leadingIcon}
            </div>
          )}
          <select
            ref={ref}
            onChange={handleChange}
            className={`
              w-full px-4 py-3.5 text-base appearance-none
              bg-white border border-border-gray rounded-lg
              text-text-primary
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${leadingIcon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <Icon name="chevron-down" size={16} />
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

