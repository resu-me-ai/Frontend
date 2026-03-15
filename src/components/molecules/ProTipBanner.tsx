import React from 'react';
import { Icon } from '@/components/atoms/Icon';

export interface ProTipBannerProps {
  tip: string;
  label?: string;
  className?: string;
}

export const ProTipBanner: React.FC<ProTipBannerProps> = ({ tip, label = 'Pro Tip:', className = '' }) => {
  return (
    <div className={`bg-info-light border border-blue-200 rounded-lg px-4 py-4 ${className}`}>
      <div className="flex items-start gap-2">
        <Icon name="info" size={14} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="text-sm font-bold text-blue-800 mr-2">{label}</span>
          <span className="text-sm font-normal text-blue-800">{tip}</span>
        </div>
      </div>
    </div>
  );
};
