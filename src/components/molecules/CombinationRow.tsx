import React from 'react';
import { ExternalLink, Clock, ChevronDown, Calendar, Send, FileEdit } from 'lucide-react';

export type CombinationStatus = 'interview' | 'applied' | 'draft';

export interface CombinationRowProps {
  jobTitle: string;
  company: string;
  matchPercentage: number;
  status: CombinationStatus;
  lastAnalyzed: string;
  resumeVersion: string;
  evidenceFiles: number;
  appliedDate?: string;
  interviewDate?: string;
  className?: string;
  onClick?: () => void;
}

const statusStyles: Record<CombinationStatus, { bg: string; text: string; label: string; icon: React.ElementType }> = {
  interview: { bg: 'bg-bg-accent-purple', text: 'text-accent-purple', label: 'Interview', icon: Calendar },
  applied: { bg: 'bg-info-light', text: 'text-action-primary', label: 'Applied', icon: Send },
  draft: { bg: 'bg-bg-muted', text: 'text-text-muted', label: 'Draft', icon: FileEdit },
};

const getMatchColor = (pct: number) => {
  if (pct >= 85) return 'bg-green-200 text-green-800';
  if (pct >= 70) return 'bg-info-subtle text-blue-800';
  return 'bg-warning-subtle text-amber-800';
};

/** Job + resume combination row with match score, status, and metadata */
export const CombinationRow: React.FC<CombinationRowProps> = ({
  jobTitle,
  company,
  matchPercentage,
  status,
  lastAnalyzed,
  resumeVersion,
  evidenceFiles,
  appliedDate,
  interviewDate,
  className = '',
  onClick,
}) => {
  const statusStyle = statusStyles[status];
  const StatusIcon = statusStyle.icon;

  const metaParts = [
    resumeVersion,
    `${evidenceFiles} evidence files`,
    ...(appliedDate ? [`Applied: ${appliedDate}`] : []),
    ...(interviewDate ? [`Interview: ${interviewDate}`] : []),
  ];

  return (
    <div
      className={`pt-6 px-6 pb-6 border-b border-border-default last:border-b-0 hover:bg-bg-surface transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Top area */}
      <div className="flex items-start justify-between gap-4">
        {/* Left: title + last analyzed */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-text-heading truncate">
              {jobTitle} at {company}
            </h4>
            <ExternalLink size={14} className="text-text-placeholder shrink-0" />
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={14} className="text-text-placeholder shrink-0" />
            <span className="text-sm text-text-muted">Last analyzed: {lastAnalyzed}</span>
          </div>
        </div>

        {/* Right: match badge + status button */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-[10px] text-sm font-semibold ${getMatchColor(matchPercentage)}`}
          >
            {matchPercentage}%
          </span>
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}
          >
            <StatusIcon size={14} />
            {statusStyle.label}
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Bottom metadata row */}
      <div className="flex items-center gap-1 mt-3">
        {metaParts.map((part, i) => (
          <React.Fragment key={part}>
            {i > 0 && <span className="text-xs text-border-input">&bull;</span>}
            <span className="text-xs text-text-muted">{part}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
