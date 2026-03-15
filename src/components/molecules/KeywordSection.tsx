import React from 'react';
import { KeywordTag } from '@/components/atoms/KeywordTag';
import { Icon } from '@/components/atoms/Icon';

export interface KeywordSectionProps {
  title: string;
  count: number;
  keywords: string[];
  variant: 'present' | 'missing';
  className?: string;
}

export const KeywordSection: React.FC<KeywordSectionProps> = ({
  title,
  count,
  keywords,
  variant,
  className = '',
}) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        {variant === 'present' ? (
          <Icon name="check" size={16} />
        ) : (
          <Icon name="check" size={16} className="opacity-50" />
        )}
        <h4 className="text-base font-semibold text-text-heading leading-6">
          {title} ({count})
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <KeywordTag key={index} variant={variant}>
            {keyword}
          </KeywordTag>
        ))}
      </div>
    </div>
  );
};
