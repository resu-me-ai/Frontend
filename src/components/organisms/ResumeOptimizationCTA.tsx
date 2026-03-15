import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { FeatureListItem } from '@/components/molecules/FeatureListItem';
import { Button } from '@/components/atoms/Button';

export interface ResumeOptimizationCTAProps {
  title?: string;
  description?: string;
  optimizeButtonLabel?: string;
  downloadButtonLabel?: string;
  features?: string[];
  infoText?: string;
  onOptimizeClick?: () => void;
  onDownloadClick?: () => void;
  className?: string;
  /** Disable the optimize button (e.g., while questions are being generated) */
  optimizeDisabled?: boolean;
  /** Loading text to show when optimize button is disabled */
  optimizeLoadingText?: string;
}

export const ResumeOptimizationCTA: React.FC<ResumeOptimizationCTAProps> = ({
  title = 'Ready to Perfect Your Resume?',
  description = "Kickstart your resume makeover for FREE using our AI-powered optimizer. You'll get core improvements and essential insights to help your resume stand out.",
  optimizeButtonLabel = 'Try FREE Resume Optimization',
  downloadButtonLabel = 'Download Report',
  features = ['ATS-Optimized', 'Industry Templates', 'One-Click Export'],
  infoText = 'Your optimized resume will include all suggested improvements, proper formatting, and ATS-friendly keywords. Download as PDF, DOCX, or both formats.',
  onOptimizeClick,
  onDownloadClick,
  className = '',
  optimizeDisabled = false,
  optimizeLoadingText = 'Generating questions...',
}) => {
  return (
    <div className={`bg-gradient-to-r from-action-primary to-violet-900 rounded-2xl p-8 ${className}`}>
      <div className="flex items-start mb-8">
        <div className="w-[817.734px]">
          <div className="flex flex-col mb-[12px]">
            <Icon name="ready-to-perfect" size={48} className="self-start" />
            <h2 className="text-[30px] font-bold text-white">{title}</h2>
          </div>
          <p className="text-base font-normal text-info-subtle leading-6">
            {description}
          </p>
        </div>
        <div className="ml-[31.996px] w-[206.266px]">
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-4">
            {features.map((feature, index) => (
              <FeatureListItem key={index} text={feature} className={index < features.length - 1 ? 'mb-[24px]' : ''} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start gap-[38px] mb-6">
        <Button
          onClick={onOptimizeClick}
          disabled={optimizeDisabled}
          className={`font-bold h-[64px] w-[570px] rounded-lg flex items-center justify-center gap-2 shadow-lg ${
            optimizeDisabled
              ? '!bg-white/50 !text-action-primary/50 cursor-not-allowed'
              : '!bg-white !text-action-primary hover:bg-gray-50'
          }`}
        >
          {optimizeDisabled ? (
            <>
              <div className="w-4 h-4 border-2 border-action-primary/50 border-t-transparent rounded-full animate-spin" />
              <span>{optimizeLoadingText}</span>
            </>
          ) : (
            <>
              <Icon name="magic-wand-blue" size={18} />
              <span>{optimizeButtonLabel}</span>
            </>
          )}
        </Button>
        <Button
          onClick={onDownloadClick}
          className="bg-violet-800 border-2 border-white text-white hover:bg-[#6d1bb8] font-bold h-[64px] w-[448px] rounded-lg flex items-center justify-center gap-2"
        >
          <Icon name="pdf-white" size={18} />
          {downloadButtonLabel}
        </Button>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-4">
        <div className="flex items-start gap-2">
          <Icon name="info" size={18} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-normal text-info-subtle leading-5">
            {infoText}
          </p>
        </div>
      </div>
    </div>
  );
};
