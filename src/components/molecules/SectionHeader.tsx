import React from 'react';
import { Icon } from '@/components/atoms/Icon';

export interface SectionHeaderProps {
  icon: 'upload' | 'luggage' | 'magic-wand';
  iconBgColor?: string;
  title: string;
  step: string;
  showCheckmark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  iconBgColor = '#dbeafe',
  title,
  step,
  showCheckmark = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon name={icon} size={20} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-text-heading leading-7">{title}</h3>
          <p className="text-base font-medium text-text-muted leading-5">{step}</p>
        </div>
      </div>
      {showCheckmark && (
        <Icon name="check" size={24} />
      )}
    </div>
  );
};
