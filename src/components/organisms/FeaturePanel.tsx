import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturePanelProps {
  features: Feature[];
  className?: string;
}

export const FeaturePanel: React.FC<FeaturePanelProps> = ({
  features,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-primary
        relative overflow-y-auto
        flex flex-col items-center justify-center
        p-12 xl:p-20
        rounded-tr-[80px]
        ${className}
      `}
    >

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-[16px] w-full max-w-[501px]">
        {/* Title Section */}
        <div className="flex flex-col gap-[16px] mb-[32px]">
          <h1 className="font-inter text-[40px] font-bold leading-normal text-black text-center whitespace-nowrap">
            <span>Your Resume, </span>
            <span className="text-white">Smarter Every Time</span>
          </h1>
          <p className="font-pretendard text-[20px] font-medium text-white leading-[1.2] tracking-[-0.2px]">
            "Building meaningful experiences together."
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-[24px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-0">
              <div className="flex-shrink-0 w-[81px] h-[72px] flex items-center justify-center">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-inter text-[18px] font-semibold text-white leading-[24px] mb-[8px]">
                  {feature.title}
                </h3>
                <p className="font-inter text-[16px] font-normal text-[#BABABA] leading-[20px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

