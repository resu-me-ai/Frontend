import React from 'react';

interface CompetencyGap {
  skill: string;
  gapType: 'exceeds' | 'meets' | 'level_below' | 'missing';
  jdLevel: string;
  resumeLevel: string;
  importance: 'CRITICAL' | 'IMPORTANT' | 'NICE_TO_HAVE';
  action: string;
}

interface CompetencyGapsSectionProps {
  gaps: CompetencyGap[];
  competenciesMet: number;
  competenciesTotal: number;
}

const GAP_TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  exceeds: { bg: 'bg-green-100', text: 'text-green-700', label: 'Exceeds' },
  meets: { bg: 'bg-green-50', text: 'text-green-600', label: 'Meets' },
  level_below: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Below Level' },
  missing: { bg: 'bg-red-100', text: 'text-red-700', label: 'Missing' },
};

const IMPORTANCE_ORDER: Record<string, number> = {
  CRITICAL: 0,
  IMPORTANT: 1,
  NICE_TO_HAVE: 2,
};

const IMPORTANCE_STYLES: Record<string, string> = {
  CRITICAL: 'text-red-600 font-semibold',
  IMPORTANT: 'text-amber-600 font-medium',
  NICE_TO_HAVE: 'text-gray-500',
};

export const CompetencyGapsSection: React.FC<CompetencyGapsSectionProps> = ({
  gaps,
  competenciesMet,
  competenciesTotal,
}) => {
  // Sort: gaps first (missing, level_below), then met competencies
  const sorted = [...gaps].sort((a, b) => {
    const gapOrder: Record<string, number> = { missing: 0, level_below: 1, meets: 2, exceeds: 3 };
    const gapDiff = (gapOrder[a.gapType] ?? 2) - (gapOrder[b.gapType] ?? 2);
    if (gapDiff !== 0) return gapDiff;
    return (IMPORTANCE_ORDER[a.importance] ?? 1) - (IMPORTANCE_ORDER[b.importance] ?? 1);
  });

  const gapsOnly = sorted.filter((g) => g.gapType === 'missing' || g.gapType === 'level_below');
  const metOnly = sorted.filter((g) => g.gapType === 'meets' || g.gapType === 'exceeds');

  return (
    <div data-testid="competency-gaps-section" className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Competency Analysis</h3>
        <span className="text-sm text-gray-500">
          {competenciesMet}/{competenciesTotal} met
        </span>
      </div>

      {/* Gaps */}
      {gapsOnly.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Gaps to Address</h4>
          <div className="space-y-2">
            {gapsOnly.map((gap, i) => {
              const style = GAP_TYPE_STYLES[gap.gapType] ?? GAP_TYPE_STYLES.missing;
              return (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-col gap-1 shrink-0">
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                    <span className={`text-xs ${IMPORTANCE_STYLES[gap.importance] ?? ''}`}>
                      {gap.importance.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{gap.skill}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Required: <span className="font-medium">{gap.jdLevel}</span>
                      {' '}&middot;{' '}
                      Found: <span className="font-medium">{gap.resumeLevel}</span>
                    </p>
                    {gap.action && (
                      <p className="text-xs text-gray-600 mt-1">{gap.action}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Met competencies (collapsed) */}
      {metOnly.length > 0 && (
        <details className="group">
          <summary className="text-sm font-medium text-gray-700 mb-2 cursor-pointer select-none">
            Matched Competencies ({metOnly.length})
            <span className="ml-1 text-gray-400 group-open:hidden">+</span>
            <span className="ml-1 text-gray-400 hidden group-open:inline">-</span>
          </summary>
          <div className="space-y-1 mt-2">
            {metOnly.map((gap, i) => {
              const style = GAP_TYPE_STYLES[gap.gapType] ?? GAP_TYPE_STYLES.meets;
              return (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded">
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                  <span className="text-sm text-gray-700">{gap.skill}</span>
                  <span className="text-xs text-gray-400 ml-auto">{gap.resumeLevel}</span>
                </div>
              );
            })}
          </div>
        </details>
      )}
    </div>
  );
};
