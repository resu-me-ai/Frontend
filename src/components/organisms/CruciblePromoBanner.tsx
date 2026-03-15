import React from 'react';
import { Flame, Check } from 'lucide-react';

export interface CruciblePromoBannerProps {
  className?: string;
}

const features = [
  'AI-Powered Feedback',
  'Video Practice',
  'Real Questions',
  'Track Progress',
];

/** Large purple promo banner for Crucible interview prep feature */
export const CruciblePromoBanner: React.FC<CruciblePromoBannerProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`bg-gradient-to-b from-accent-purple to-violet-400 rounded-[16px] overflow-hidden shadow-lg ${className}`}
    >
      <div className="pt-8 px-8 pb-8">
        {/* "New App" badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-5">
          <Flame size={20} className="text-orange-300" />
          <span className="text-sm font-semibold text-white">New App</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-3">
          Ace Your Interviews with The Crucible
        </h2>

        {/* Description */}
        <p className="text-lg text-white/90 mb-6 max-w-2xl">
          Practice with real interview questions, get AI-powered feedback, and build
          confidence before your big day. Tailored preparation for your specific role
          and industry.
        </p>

        {/* 2x2 Features grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8 max-w-md">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <span className="text-sm text-white">{feature}</span>
            </div>
          ))}
        </div>

        {/* App store button placeholders */}
        <div className="flex gap-3">
          <div className="bg-black/30 rounded-lg px-5 py-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-white/30 rounded" />
            <div>
              <p className="text-[10px] text-white/70 leading-tight">GET IT ON</p>
              <p className="text-sm font-semibold text-white leading-tight">Google Play</p>
            </div>
          </div>
          <div className="bg-black/30 rounded-lg px-5 py-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-white/30 rounded" />
            <div>
              <p className="text-[10px] text-white/70 leading-tight">Download on the</p>
              <p className="text-sm font-semibold text-white leading-tight">App Store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
