import React from 'react';
import {
  CheckCircle,
  FileText,
  MessageCircle,
  Upload,
  PlusCircle,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'check-circle': CheckCircle,
  'file-text': FileText,
  'message-circle': MessageCircle,
  upload: Upload,
  'plus-circle': PlusCircle,
};

export interface ActivityItemProps {
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  iconBg: string;
  iconColor: string;
  className?: string;
}

/** Single activity row with colored square icon, title+timestamp, and description */
export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  iconBg,
  iconColor,
  className = '',
}) => {
  const IconComponent = iconMap[icon] || CheckCircle;

  return (
    <div className={`flex items-start gap-4 pt-5 px-5 pb-5 ${className}`}>
      <div
        className="rounded-[10px] w-10 h-10 flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <IconComponent size={18} style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-text-heading truncate">{title}</p>
          <span className="text-xs text-text-placeholder shrink-0">{timestamp}</span>
        </div>
        <p className="text-sm text-text-muted mt-0.5">{description}</p>
      </div>
    </div>
  );
};
