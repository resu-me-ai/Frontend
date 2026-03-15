import React from 'react';
import { StatCard } from '@/components/molecules/StatCard';
import type { MockStatCard } from '@/mocks/dashboard.mock';

export interface StatsCardsRowProps {
  stats: MockStatCard[];
  className?: string;
}

/** Row of 4 stat cards */
export const StatsCardsRow: React.FC<StatsCardsRowProps> = ({
  stats,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          iconBg={stat.iconBg}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};
