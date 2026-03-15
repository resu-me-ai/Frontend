import React from 'react';
import { Badge } from '@/components/atoms/Badge';

export interface SkillItemProps {
  name: string;
  strength: 'strong' | 'moderate';
  badgeLabel?: string;
  className?: string;
}

export const SkillItem: React.FC<SkillItemProps> = ({ name, strength, badgeLabel, className = '' }) => {
  const defaultBadgeLabel = strength === 'strong' ? 'STRONG' : 'MODERATE';

  return (
    <div className={`bg-success-light rounded-lg px-3 py-3 flex items-center justify-between ${className}`}>
      <span className="text-sm font-medium text-text-primary">{name}</span>
      <Badge variant={strength}>{badgeLabel ?? defaultBadgeLabel}</Badge>
    </div>
  );
};
