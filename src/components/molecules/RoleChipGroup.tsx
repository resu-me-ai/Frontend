import React from 'react';
import { Chip } from '@/components/atoms/Chip';

export interface RoleChipGroupProps {
  options: string[];
  selectedRole: string | null;
  onChange: (role: string | null) => void;
  className?: string;
}

export const RoleChipGroup: React.FC<RoleChipGroupProps> = ({
  options,
  selectedRole,
  onChange,
  className = '',
}) => {
  const handleSelect = (role: string) => {
    // Single-select: clicking the same role deselects it, clicking a different role selects it
    if (selectedRole === role) {
      onChange(null);
    } else {
      onChange(role);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((role) => (
        <Chip
          key={role}
          label={role}
          selected={selectedRole === role}
          onClick={() => handleSelect(role)}
        />
      ))}
    </div>
  );
};
