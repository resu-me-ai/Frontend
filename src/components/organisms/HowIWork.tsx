import React from 'react';

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface HowIWorkProps {
  steps: ProcessStep[];
  title?: string;
  className?: string;
}

export const HowIWork: React.FC<HowIWorkProps> = ({
  steps,
  title = 'How I Work',
  className = '',
}) => {
  return (
    <section className={`py-12 ${className}`}>
      <h2 className="text-2xl font-bold text-text-primary mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col">
            {/* Connector line (hidden on last item) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-[calc(100%)] w-full h-0.5 bg-gray-200 -z-10" />
            )}

            {/* Step number */}
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4">
              {step.number}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
