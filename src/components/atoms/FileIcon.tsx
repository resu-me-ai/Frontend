import React from 'react';
import { Icon } from './Icon';

export interface FileIconProps {
  fileType: 'pdf' | 'word' | 'pencil';
  size?: number;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({
  fileType,
  size = 24,
  className = '',
}) => {
  const iconMap = {
    pdf: 'pdf' as const,
    word: 'word' as const,
    pencil: 'pencil' as const,
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Icon name={iconMap[fileType]} size={size} />
    </div>
  );
};
