import React from 'react';

export interface ChatBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-bg-muted rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm px-4 py-3 ${className}`}
    >
      <div className="text-sm text-text-heading leading-relaxed">
        {children}
      </div>
    </div>
  );
};
