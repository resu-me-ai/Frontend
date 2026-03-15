import React from 'react';
import { Check } from 'lucide-react';

export interface BulletVersionCardProps {
  version: number;
  text: string;
  score: number;
  selected: boolean;
  isBest: boolean;
  onSelect: () => void;
}

export const BulletVersionCard: React.FC<BulletVersionCardProps> = ({
  version,
  text,
  score,
  selected,
  isBest,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-lg border-2 p-4 transition-colors ${
        selected
          ? 'border-success bg-success-light'
          : 'border-border-default bg-white hover:border-border-input'
      }`}
    >
      {/* Header row: radio + version label + score + badges */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Radio indicator */}
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selected ? 'border-success bg-success' : 'border-border-input'
            }`}
          >
            {selected && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <span className="text-xs font-semibold text-text-body">
            Version {version}
          </span>
          {selected && (
            <span className="text-xs font-medium text-success">Selected</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-success bg-success-subtle px-2 py-0.5 rounded-full">
            {score.toFixed(1)}/10
          </span>
          {isBest && (
            <span className="bg-orange-500 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
              Best
            </span>
          )}
        </div>
      </div>

      {/* Bullet text */}
      <p className="text-sm text-text-body leading-relaxed pl-6">{text}</p>
    </button>
  );
};
