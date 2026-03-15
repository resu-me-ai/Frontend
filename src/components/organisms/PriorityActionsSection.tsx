import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { ActionItemCard } from '@/components/molecules/ActionItemCard';

export interface PriorityActionsSectionProps {
  actionItems: Array<{
    number: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const PriorityActionsSection: React.FC<PriorityActionsSectionProps> = ({
  actionItems,
  title = 'Priority Action Items',
  subtitle = "Complete these tasks to maximize your resume's effectiveness",
  className = '',
}) => {
  return (
    <div className={`bg-white border border-border-default rounded-2xl p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-lg bg-orange-100 flex items-center justify-center">
          <Icon name="priority" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-heading">{title}</h3>
          <p className="text-sm font-normal text-text-subtle">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {actionItems.map((item) => (
          <ActionItemCard
            key={item.number}
            number={item.number}
            title={item.title}
            description={item.description}
            priority={item.priority}
          />
        ))}
      </div>
    </div>
  );
};
