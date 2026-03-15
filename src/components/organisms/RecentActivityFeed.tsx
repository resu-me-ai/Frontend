import React from 'react';
import { ActivityItem } from '@/components/molecules/ActivityItem';
import type { MockActivityItem } from '@/mocks/dashboard.mock';

export interface RecentActivityFeedProps {
  activities: MockActivityItem[];
  className?: string;
}

/** Title + list of recent activity items */
export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  activities,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-[14px] border border-border-default ${className}`}>
      <div className="px-6 py-5 border-b border-border-default">
        <h3 className="text-xl font-bold text-text-heading">Recent Activity</h3>
        <p className="text-sm text-text-muted mt-0.5">Your latest updates and changes</p>
      </div>
      <div className="divide-y divide-border-default">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            timestamp={activity.timestamp}
            iconBg={activity.iconBg}
            iconColor={activity.iconColor}
          />
        ))}
      </div>
    </div>
  );
};
