import React from 'react';
import type { InputMode } from '@/types';

export type { InputMode } from '@/types';

export interface InputModeTabsProps {
  activeMode: InputMode;
  onModeChange: (mode: InputMode) => void;
  className?: string;
}

const tabs: { mode: InputMode; label: string }[] = [
  { mode: 'text', label: 'Text' },
  { mode: 'voice', label: 'Voice' },
  { mode: 'upload', label: 'Upload File' },
];

export const InputModeTabs: React.FC<InputModeTabsProps> = ({
  activeMode,
  onModeChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      className={`flex border-b border-border-default ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeMode === tab.mode;
        return (
          <button
            key={tab.mode}
            role="tab"
            aria-selected={isActive}
            data-tab={tab.mode}
            onClick={() => onModeChange(tab.mode)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-action-primary text-action-primary'
                : 'border-transparent text-text-muted hover:text-text-body'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
