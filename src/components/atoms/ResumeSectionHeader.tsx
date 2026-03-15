import React from 'react';

export interface ResumeSectionHeaderProps {
  title: string;
  className?: string;
}

export const ResumeSectionHeader: React.FC<ResumeSectionHeaderProps> = ({
  title,
  className = '',
}) => {
  return (
    <h2
      className={`text-[20px] font-bold text-text-heading pb-1 border-b border-border-default mb-2 ${className}`}
    >
      {title}
    </h2>
  );
};
