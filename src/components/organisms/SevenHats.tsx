import React from 'react';
import { HatCard } from './HatCard';

export interface HatData {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  deliverables: string[];
  marketRate: string;
}

export interface SevenHatsProps {
  hats: HatData[];
  className?: string;
}

export const SevenHats: React.FC<SevenHatsProps> = ({
  hats,
  className = '',
}) => {
  return (
    <section className={`py-12 ${className}`}>
      <h2 className="text-2xl font-bold text-text-primary mb-2">The Seven Hats</h2>
      <p className="text-sm text-text-muted mb-8">
        One person. Seven capabilities. Each role priced at market rate.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hats.map((hat, index) => (
          <HatCard
            key={index}
            title={hat.title}
            subtitle={hat.subtitle}
            icon={hat.icon}
            deliverables={hat.deliverables}
            marketRate={hat.marketRate}
          />
        ))}
      </div>
    </section>
  );
};
