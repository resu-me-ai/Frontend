import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab List */}
      <div className="flex w-full items-center rounded-lg bg-bg-muted p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={`
              flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all
              ${activeTab === tab.id
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-body'
              }
              ${tab.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-3">
        {activeContent}
      </div>
    </div>
  );
};
