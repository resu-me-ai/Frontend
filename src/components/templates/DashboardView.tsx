import React from 'react';
import { DashboardCTABanner } from '@/components/organisms/DashboardCTABanner';
import { StatsCardsRow } from '@/components/organisms/StatsCardsRow';
import { CombinationsList } from '@/components/organisms/CombinationsList';
import { RecentActivityFeed } from '@/components/organisms/RecentActivityFeed';
import { CruciblePromoBanner } from '@/components/organisms/CruciblePromoBanner';
import type { MockStatCard, MockCombination, MockActivityItem } from '@/mocks/dashboard.mock';

export interface DashboardViewProps {
  stats: MockStatCard[];
  combinations: MockCombination[];
  activities: MockActivityItem[];
  onStartNewAnalysis?: () => void;
  onCombinationClick?: (id: string) => void;
}

/** Full dashboard layout: heading + CTA + stats + combos + activity + promo */
export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  combinations,
  activities,
  onStartNewAnalysis,
  onCombinationClick,
}) => {
  return (
    <div className="max-w-[1216px] mx-auto px-6 py-8 flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="text-[30px] font-bold text-text-heading">Overview</h1>
        <p className="text-base text-text-muted mt-1">
          Manage your resume optimizations and track your job applications
        </p>
      </div>

      {/* CTA Banner */}
      <DashboardCTABanner onStartNewAnalysis={onStartNewAnalysis} />

      {/* Stats */}
      <StatsCardsRow stats={stats} />

      {/* Combinations — full width */}
      <CombinationsList
        combinations={combinations}
        onCombinationClick={onCombinationClick}
      />

      {/* Recent Activity — full width */}
      <RecentActivityFeed activities={activities} />

      {/* Crucible promo */}
      <CruciblePromoBanner />
    </div>
  );
};
