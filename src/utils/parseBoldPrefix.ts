/**
 * Parses known bold-prefix labels from bullet text.
 *
 * Detects patterns like:
 *   "Achievements: Built product..." → { prefix: "Achievements:", rest: "Built product..." }
 *   "Education: Bachelor of Commerce..." → { prefix: "Education:", rest: "Bachelor of Commerce..." }
 *   "7+ years of product..." → { prefix: null, rest: "7+ years of product..." }
 *
 * Known prefixes are rendered in bold (or orange for "Achievements:").
 */

const KNOWN_PREFIXES = [
  'Achievements:',
  'Education:',
  'Certifications:',
  'Technical Skills:',
  'Skills:',
  'Languages:',
  'Awards:',
];

export interface ParsedBullet {
  prefix: string | null;
  rest: string;
  isOrangePrefix: boolean;
}

export function parseBoldPrefix(text: string): ParsedBullet {
  if (!text) return { prefix: null, rest: '', isOrangePrefix: false };

  for (const prefix of KNOWN_PREFIXES) {
    if (text.startsWith(prefix)) {
      return {
        prefix,
        rest: text.slice(prefix.length).trimStart(),
        isOrangePrefix: prefix === 'Achievements:',
      };
    }
  }

  return { prefix: null, rest: text, isOrangePrefix: false };
}
