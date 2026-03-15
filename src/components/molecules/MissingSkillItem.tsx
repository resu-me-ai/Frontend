import React from 'react';
import { Badge } from '@/components/atoms/Badge';

export type MissingSkillPriority = 'critical' | 'important' | 'nice-to-have';

export interface MissingSkillItemProps {
  name: string;
  priority: MissingSkillPriority;
  badgeLabel?: string;
  className?: string;
}

export const MissingSkillItem: React.FC<MissingSkillItemProps> = ({ name, priority, badgeLabel, className = '' }) => {
  const borderColors = {
    critical: 'border-l-error',
    important: 'border-l-orange-500',
    'nice-to-have': 'border-l-yellow-500',
  };

  const backgroundColors = {
    critical: 'bg-red-200',
    important: 'bg-orange-200',
    'nice-to-have': 'bg-amber-200',
  };

  const badgeVariants = {
    critical: 'critical' as const,
    important: 'important' as const,
    'nice-to-have': 'nice-to-have' as const,
  };

  return (
    <div
      className={`${backgroundColors[priority]} ${borderColors[priority]} border-l-4 rounded-lg px-3 py-3 flex items-center justify-between ${className}`}
    >
      <span className="text-sm font-medium text-text-primary">{name}</span>
      <Badge variant={badgeVariants[priority]}>
        {badgeLabel ?? (priority === 'critical' ? 'CRITICAL' : priority === 'important' ? 'IMPORTANT' : 'NICE TO HAVE')}
      </Badge>
    </div>
  );
};
