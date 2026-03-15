import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';

export interface HatCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  deliverables: string[];
  marketRate: string;
  className?: string;
}

export const HatCard: React.FC<HatCardProps> = ({
  title,
  subtitle,
  icon,
  deliverables,
  marketRate,
  className = '',
}) => {
  return (
    <Card variant="outlined" padding="md" className={`flex flex-col h-full ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 bg-violet-200 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <ul className="flex-1 space-y-1.5 mb-4">
        {deliverables.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-text-body">
            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="pt-3 border-t border-border-default">
        <Badge variant="moderate">{marketRate}</Badge>
      </div>
    </Card>
  );
};
