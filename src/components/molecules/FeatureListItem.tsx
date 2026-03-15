import React from 'react';
import { Icon } from '@/components/atoms/Icon';

export interface FeatureListItemProps {
  text: string;
  className?: string;
}

export const FeatureListItem: React.FC<FeatureListItemProps> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name="check" size={20} className="text-white flex-shrink-0" />
      <span className="text-sm font-medium text-white whitespace-nowrap">{text}</span>
    </div>
  );
};
