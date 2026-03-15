import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';

export interface CaseStudy {
  title: string;
  description: string;
  metrics: string[];
  tags: string[];
}

export interface CaseStudiesProps {
  studies: CaseStudy[];
  className?: string;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  studies,
  className = '',
}) => {
  return (
    <section className={`py-12 ${className}`}>
      <h2 className="text-2xl font-bold text-text-primary mb-8">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study, index) => (
          <Card key={index} variant="outlined" padding="md" className="flex flex-col h-full">
            <h3 className="text-lg font-semibold text-text-primary mb-2">{study.title}</h3>
            <p className="text-sm text-text-muted mb-4 flex-1">{study.description}</p>

            <div className="space-y-2 mb-4">
              {study.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-medium text-text-body">{metric}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-border-default">
              {study.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="moderate">{tag}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
