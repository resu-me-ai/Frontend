import React from 'react';
import { Input } from '@/components/atoms/Input';
import type { InputProps } from '@/components/atoms/Input';

export interface FormInputProps extends Omit<InputProps, 'id'> {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  required = false,
  error,
  ...inputProps
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-base font-semibold text-text-primary mb-4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input id={id} error={error} {...inputProps} />
    </div>
  );
};

