import React, { useEffect, useRef } from 'react';
import { ChatAvatar } from '@/components/atoms/ChatAvatar';
import { MessageTimestamp } from '@/components/atoms/MessageTimestamp';
import { ChatBubble } from '@/components/molecules/ChatBubble';
import type { ChatMessage } from '@/types';

export type { ChatMessage } from '@/types';

export interface ChatMessageListProps {
  messages: ChatMessage[];
  userAvatarSrc?: string;
  userAvatarFallback?: string;
  className?: string;
}

const FeedbackIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0 mt-0.5"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  userAvatarSrc,
  userAvatarFallback = 'U',
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div
      ref={scrollRef}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className={`flex-1 min-h-0 overflow-y-auto px-4 py-3 ${className}`}
    >
      <div className="space-y-3">
      {messages.map((message) => {
        const isUser = message.sender === 'user';
        const isFeedback = message.variant === 'feedback';

        if (isUser) {
          return (
            <div key={message.id} className="flex items-start gap-3 justify-end">
              <div className="max-w-[75%] space-y-1">
                <div className="bg-action-primary text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-4 py-3 shadow-sm">
                  <div className="text-sm leading-relaxed">{message.content}</div>
                </div>
                <div className="flex justify-end">
                  <MessageTimestamp time={message.timestamp} />
                </div>
              </div>
              <ChatAvatar
                variant="user"
                src={userAvatarSrc}
                fallback={userAvatarFallback}
              />
            </div>
          );
        }

        if (isFeedback) {
          return (
            <div key={message.id} className="flex items-start gap-3">
              <ChatAvatar variant="ai" />
              <div className="max-w-[70%] space-y-1">
                <ChatBubble>
                  <div className="flex items-start gap-2">
                    <FeedbackIcon />
                    <div className="text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </ChatBubble>
                <MessageTimestamp time={message.timestamp} className="ml-1" />
              </div>
            </div>
          );
        }

        return (
          <div key={message.id} className="flex items-start gap-3">
            <ChatAvatar variant="ai" />
            <div className="max-w-[70%] space-y-1">
              <ChatBubble>
                {message.content}
              </ChatBubble>
              <MessageTimestamp time={message.timestamp} className="ml-1" />
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
