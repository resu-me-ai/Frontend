import React from 'react';
import { FileIcon } from '@/components/atoms/FileIcon';

export interface ResumeOptionCardProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  fileName: string;
  lastUpdated: string;
  fileType: 'pdf' | 'word' | 'pencil';
  className?: string;
}

export const ResumeOptionCard: React.FC<ResumeOptionCardProps> = ({
  name,
  value,
  checked = false,
  onChange,
  fileName,
  lastUpdated,
  fileType,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange?.(value);
    }
  };

  return (
    <div className={className}>
      <label className="flex items-center gap-3 p-4 border border-border-default rounded-xl cursor-pointer hover:bg-gray-50 transition-colors bg-white">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          className="w-4 h-4 text-primary border-[#000000] border-[0.5px] focus:ring-primary focus:ring-2"
        />
        <FileIcon fileType={fileType} size={24} />
        <div className="flex flex-col flex-1">
          <span className="text-sm font-medium text-text-body">{fileName}</span>
          <span className="text-xs text-text-muted">{lastUpdated}</span>
        </div>
      </label>
    </div>
  );
};
