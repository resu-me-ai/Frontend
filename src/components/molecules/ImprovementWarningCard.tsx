import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ImprovementWarningCardProps {
  items: string[];
  className?: string;
}

/** Yellow warning card listing areas for improvement */
export const ImprovementWarningCard: React.FC<ImprovementWarningCardProps> = ({
  items,
  className = '',
}) => {
  if (!items.length) return null;

  return (
    <div className={`bg-amber-200 border border-amber-300 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-1.5 mb-3">
        <AlertTriangle size={16} className="text-[#854d0e]" />
        <span className="text-sm font-medium text-[#854d0e]">Areas for Improvement</span>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-xs text-[#a16207]">
            &bull; {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
