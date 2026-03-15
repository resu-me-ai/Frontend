import React from 'react';
import { FileText, Building2, Calendar, TrendingUp, Layers, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'file-text': FileText,
  building: Building2,
  calendar: Calendar,
  'trending-up': TrendingUp,
  layers: Layers,
};

export interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

/** Dashboard stat card — horizontal layout with colored icon square */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  iconBg = '#eff6ff',
  iconColor = '#2563eb',
  className = '',
}) => {
  const IconComponent = iconMap[icon] || Layers;

  return (
    <div
      className={`bg-white border border-border-default rounded-[14px] px-6 py-6 flex items-center gap-3 ${className}`}
    >
      <div
        className="rounded-[10px] w-10 h-10 flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <IconComponent size={20} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-2xl font-bold text-text-heading">{value}</div>
        <div className="text-xs text-text-muted">{label}</div>
      </div>
    </div>
  );
};
