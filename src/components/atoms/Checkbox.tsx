import React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  className = '',
}) => {
  const checkboxId = id || `checkbox-${React.useId()}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="h-4 w-4 shrink-0 rounded border border-border-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className={`text-sm text-text-body ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
