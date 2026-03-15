import React from 'react';
import type { BulletItem } from '@/types/resume';
import { parseBoldPrefix } from '@/utils/parseBoldPrefix';

export interface BulletListProps {
  bullets: BulletItem[];
  className?: string;
}

export const BulletList: React.FC<BulletListProps> = ({
  bullets,
  className = '',
}) => {
  return (
    <div className={`space-y-0.5 ${className}`}>
      {bullets.filter((b) => b?.text).map((bullet) => {
        // Backend-provided bold_prefix overrides heuristic detection
        const hasBoldPrefix = !!bullet.bold_prefix;
        const { prefix, rest, isOrangePrefix } = hasBoldPrefix
          ? { prefix: bullet.bold_prefix!, rest: bullet.text.slice(bullet.bold_prefix!.length).trimStart(), isOrangePrefix: false }
          : parseBoldPrefix(bullet.text);

        return (
          <p
            key={bullet.bullet_index}
            className="text-sm text-text-body tracking-tight pl-4 flex"
            style={{ lineHeight: '18px' }}
          >
            <span className="text-text-muted mr-2 shrink-0" aria-hidden="true">&#x2022;</span>
            <span>
              {prefix && (
                <span
                  className={`font-semibold ${isOrangePrefix ? 'text-warning' : 'text-text-heading'}`}
                >
                  {prefix}{' '}
                </span>
              )}
              {rest}
            </span>
          </p>
        );
      })}
    </div>
  );
};
