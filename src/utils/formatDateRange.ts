/**
 * Progressively shorten a date range string to fit tighter layouts.
 *
 * Level 0: "March 2016-February 2019"  (original)
 * Level 1: "Mar 2016-Feb 2019"         (abbreviated month)
 * Level 2: "03/2016-02/2019"           (numeric)
 */

const MONTH_ABBR: Record<string, string> = {
  january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
  may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
  september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec',
};

const MONTH_NUM: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04',
  may: '05', june: '06', july: '07', august: '08',
  september: '09', october: '10', november: '11', december: '12',
};

function formatPart(raw: string, level: 1 | 2): string {
  const trimmed = raw.trim();
  if (trimmed.toLowerCase() === 'present') return 'Present';

  const match = trimmed.match(/^(\w+)\s+(\d{4})$/);
  if (!match) return trimmed;

  const monthLower = match[1].toLowerCase();
  const year = match[2];

  if (level === 1) {
    return `${MONTH_ABBR[monthLower] || match[1].substring(0, 3)} ${year}`;
  }
  return `${MONTH_NUM[monthLower] || match[1].substring(0, 2)}/${year}`;
}

export function formatDateRange(dateRange: string, level: 0 | 1 | 2): string {
  if (level === 0) return dateRange;

  const parts = dateRange.split(/[-\u2013\u2014]/).map(s => s.trim());
  if (parts.length !== 2) return dateRange;

  return `${formatPart(parts[0], level)}-${formatPart(parts[1], level)}`;
}
