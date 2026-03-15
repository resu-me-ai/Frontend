import React from 'react';
import { Dropdown } from '@/components/atoms/Dropdown';
import type { DropdownProps } from '@/components/atoms/Dropdown';

export interface FormDropdownProps extends Omit<DropdownProps, 'id'> {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  id,
  required = false,
  error,
  ...dropdownProps
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-base font-semibold text-text-primary mb-4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Dropdown id={id} error={error} {...dropdownProps} />
    </div>
  );
};

