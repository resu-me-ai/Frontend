import React from 'react';
import { ConversationPanel } from '@/components/organisms/ConversationPanel';
import type { ConversationPanelProps } from '@/components/organisms/ConversationPanel';
import { ResumePreviewPanel } from '@/components/organisms/ResumePreviewPanel';

export interface ContextCollectionV3ViewProps {
  /** Raw resume HTML string for the left panel. Omit to leave left panel empty. */
  resumeHtml?: string;
  /** ID of the bullet to highlight in the resume (e.g. "role_0.bullet_0") */
  highlightedBulletId?: string;
  /** Substring within the highlighted bullet to emphasize */
  highlightedText?: string;
  /** Props forwarded to ConversationPanel in the right panel. Omit to leave right panel empty. */
  conversationPanelProps?: Omit<ConversationPanelProps, 'className'>;
  className?: string;
}

export const ContextCollectionV3View: React.FC<ContextCollectionV3ViewProps> = ({
  resumeHtml,
  highlightedBulletId,
  highlightedText,
  conversationPanelProps,
  className = '',
}) => {
  return (
    <div className={`flex flex-col h-screen bg-white ${className}`}>
      {/* Nav bar — 63px */}
      <nav className="shrink-0 h-[63px] bg-white border-b border-border-default flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-dark to-progress-active flex items-center justify-center">
            <span className="text-white text-sm font-bold">Ri</span>
          </div>
          <span className="text-text-heading font-semibold text-base">Resu-ME AI</span>
        </div>
        <div className="w-[35px] h-[35px] rounded-full bg-gray-200 overflow-hidden">
          <div className="w-full h-full bg-gray-300" />
        </div>
      </nav>

      {/* Main content — gray bg, two panels */}
      <main className="flex-1 min-h-0 bg-bg-muted px-8 py-6">
        <div className="grid grid-cols-[3fr_2fr] gap-8 h-full">
          {/* Left panel (60%) — scrollable resume */}
          <div className="min-h-0 overflow-y-auto">
            {resumeHtml ? (
              <ResumePreviewPanel
                key={`resume-preview-${highlightedText || 'none'}`}
                resumeHtml={resumeHtml}
                highlightedBulletId={highlightedBulletId}
                highlightedText={highlightedText}
              />
            ) : (
              <div className="bg-white px-[30px] py-[38px] min-h-full" />
            )}
          </div>

          {/* Right panel (40%) */}
          <div className="min-h-0 flex flex-col">
            <div className="flex-1 min-h-0 bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
              {conversationPanelProps ? (
                <ConversationPanel {...conversationPanelProps} className="h-full" />
              ) : null}
            </div>
          </div>
        </div>
      </main>

      {/* Footer — 64px */}
      <footer className="shrink-0 h-[64px] bg-white border-t border-border-default flex items-center px-6">
        <div className="flex items-center gap-2 text-sm text-text-subtle">
          <span>&copy; 2026 Resu-ME AI</span>
          <span>&bull;</span>
          <span>Privacy Policy</span>
          <span>&bull;</span>
          <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
};
