import React from 'react';
import { Button } from '@/components/atoms/Button';

export interface PortfolioPreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  embedUrl: string;
  embedType: 'figma' | 'pdf' | 'video' | 'image';
}

const embedTypeClasses = {
  figma: 'aspect-video',
  pdf: 'aspect-[8.5/11]',
  video: 'aspect-video',
  image: 'aspect-video',
};

export const PortfolioPreviewModal: React.FC<PortfolioPreviewModalProps> = ({
  open,
  onClose,
  title,
  description,
  embedUrl,
  embedType,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-placeholder hover:text-text-body transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-text-heading">{title}</h2>
          <p className="text-sm text-text-muted mt-1">{description}</p>
        </div>

        <div className={`w-full ${embedTypeClasses[embedType]} bg-gray-100 rounded-lg overflow-hidden`}>
          {embedType === 'image' ? (
            <img
              src={embedUrl}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allowFullScreen
            />
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="back" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
