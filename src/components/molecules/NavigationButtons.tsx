import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export interface NavigationButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBack?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = 'Continue',
  showBack = true,
  nextDisabled = false,
  className = '',
}) => {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {showBack && onBack && (
        <Button
          type="button"
          variant="back"
          onClick={onBack}
          className="w-[74px] h-[74px] rounded-xl p-0"
        >
          <Icon name="arrow-left" size={24} />
        </Button>
      )}
      <Button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 h-[74px] rounded-xl text-base font-normal"
      >
        {nextLabel}
        <Icon name="arrow-right" size={16} className="ml-2" />
      </Button>
    </div>
  );
};

