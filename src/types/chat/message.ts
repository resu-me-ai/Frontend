import type { ReactNode } from 'react';

export type MessageVariant = 'question' | 'feedback' | 'default';

/**
 * Represents a single chat message in the conversation UI.
 */
export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  content: ReactNode;
  timestamp: string;
  variant?: MessageVariant;
}
