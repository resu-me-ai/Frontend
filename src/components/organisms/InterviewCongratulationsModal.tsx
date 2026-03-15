import React from 'react';
import { PartyPopper, X } from 'lucide-react';

export interface InterviewCongratulationsModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onTryCrucible?: () => void;
  className?: string;
}

/** Congratulations modal with Crucible cross-sell */
export const InterviewCongratulationsModal: React.FC<InterviewCongratulationsModalProps> = ({
  isOpen,
  onClose,
  onTryCrucible,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-action-primary to-accent-purple p-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <PartyPopper size={48} className="text-yellow-300 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-1">Congratulations!</h2>
          <p className="text-sm text-blue-100">Your enhanced resume is ready to download.</p>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-text-body mb-4">
            Your resume has been optimized and is now tailored to the job description.
            Download it and start applying with confidence!
          </p>

          <div className="bg-bg-accent-purple rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-accent-purple mb-1">
              Ready for the interview?
            </h3>
            <p className="text-xs text-text-muted mb-3">
              Practice with Crucible, our AI-powered interview prep tool tailored to your target role.
            </p>
            <button
              type="button"
              onClick={onTryCrucible}
              className="bg-accent-purple text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors w-full"
            >
              Try Crucible Interview Prep
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-text-muted hover:text-text-body transition-colors py-2"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
