import React from 'react';
import { Badge } from '@/components/atoms/Badge';

export type ActionItemPriority = 'high' | 'medium' | 'low';

export interface ActionItemCardProps {
  number: number;
  title: string;
  description: string;
  priority: ActionItemPriority;
  badgeLabel?: string;
  className?: string;
}

export const ActionItemCard: React.FC<ActionItemCardProps> = ({
  number,
  title,
  description,
  priority,
  badgeLabel,
  className = '',
}) => {
  const borderColors = {
    high: 'border-l-error',
    medium: priority === 'medium' ? 'border-l-orange-500' : 'border-l-yellow-500',
    low: 'border-l-info',
  };

  const backgroundColors = {
    high: 'bg-red-200',
    medium: priority === 'medium' ? 'bg-orange-200' : 'bg-amber-200',
    low: 'bg-info-light',
  };

  const numberColors = {
    high: 'bg-error',
    medium: priority === 'medium' ? 'bg-orange-500' : 'bg-yellow-500',
    low: 'bg-info',
  };

  const badgeVariants = {
    high: 'critical' as const,
    medium: priority === 'medium' ? 'important' as const : 'nice-to-have' as const,
    low: 'low-priority' as const,
  };

  const badgeText = {
    high: 'HIGH PRIORITY',
    medium: 'MEDIUM PRIORITY',
    low: 'LOW PRIORITY',
  };

  return (
    <div
      className={`${backgroundColors[priority]} ${borderColors[priority]} border-l-4 rounded-lg px-4 py-4 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={`${numberColors[priority]} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
          <span className="text-xs font-bold text-white">{number}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-base font-semibold text-text-heading mb-2">{title}</h4>
          <p className="text-sm font-normal text-text-body mb-3">{description}</p>
          <Badge variant={badgeVariants[priority]}>{badgeLabel ?? badgeText[priority]}</Badge>
        </div>
      </div>
    </div>
  );
};
