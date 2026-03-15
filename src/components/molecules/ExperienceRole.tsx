import React, { useRef, useState, useLayoutEffect } from 'react';
import type { ExperienceRoleData } from '@/types/resume';
import { BulletList } from '@/components/atoms/BulletList';
import { formatDateRange } from '@/utils/formatDateRange';

/** Line height used for role header text (14px font x ~1.3) */
const LINE_HEIGHT = 18;

export interface ExperienceRoleProps {
  role: ExperienceRoleData;
  className?: string;
}

export const ExperienceRole: React.FC<ExperienceRoleProps> = ({
  role,
  className = '',
}) => {
  const headerRef = useRef<HTMLParagraphElement>(null);
  const [dateLevel, setDateLevel] = useState<0 | 1 | 2>(0);

  // Single-pass measurement: try each format, pick the first that fits one line
  useLayoutEffect(() => {
    const el = headerRef.current;
    const dateSpan = el?.querySelector<HTMLSpanElement>('[data-date-range]');
    if (!el || !dateSpan) return;

    for (let level = 0; level <= 2; level++) {
      dateSpan.textContent = ': ' + formatDateRange(role.date_range, level as 0 | 1 | 2);
      if (el.scrollHeight <= LINE_HEIGHT + 2) {
        setDateLevel(level as 0 | 1 | 2);
        return;
      }
    }
    // None fit on one line — use shortest
    setDateLevel(2);
  }, [role.date_range, role.title, role.company, role.company_context]);

  const displayDate = formatDateRange(role.date_range, dateLevel);

  return (
    <div className={`mb-2.5 ${className}`}>
      {/* Role header — PDF template format: Title: Company (context): Date */}
      <p
        ref={headerRef}
        className="text-sm text-text-heading tracking-tight"
        style={{ lineHeight: `${LINE_HEIGHT}px` }}
      >
        <span className="font-bold">{role.title}:</span>{' '}
        <span className="text-text-muted">{role.company}</span>
        {role.company_context && (
          <span className="italic text-text-muted"> ({role.company_context})</span>
        )}
        <span data-date-range className="italic text-text-muted">: {displayDate}</span>
      </p>

      {/* Achievements line */}
      {role.achievements_line && (
        <p
          className="text-sm text-text-body tracking-tight pl-4"
          style={{ marginTop: 1, lineHeight: `${LINE_HEIGHT}px` }}
        >
          <span className="font-semibold text-warning">Achievements:</span>{' '}
          {role.achievements_line}
        </p>
      )}

      {/* Bullet points */}
      {(role.bullets?.length ?? 0) > 0 && (
        <BulletList bullets={role.bullets} className="mt-px" />
      )}
    </div>
  );
};
