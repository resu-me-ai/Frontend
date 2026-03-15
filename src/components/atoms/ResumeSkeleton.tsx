import React from 'react';

export interface ResumeSkeletonProps {
  className?: string;
}

/** Gray placeholder bars mimicking resume structure during loading */
export const ResumeSkeleton: React.FC<ResumeSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-white rounded-[10px] shadow-lg opacity-77 p-12 w-full ${className}`}
    >
      {/* Header: Name + contact */}
      <div className="mb-10">
        <div className="bg-bg-skeleton h-8 w-[350px] rounded mb-3" />
        <div className="bg-gray-200 h-4 w-[233px] rounded mb-1.5" />
        <div className="bg-gray-200 h-4 w-[279px] rounded" />
      </div>

      {/* Summary section */}
      <div className="mb-8">
        <div className="bg-bg-skeleton h-6 w-[174px] rounded mb-3" />
        <div className="bg-gray-200 h-4 w-full rounded mb-1.5" />
        <div className="bg-gray-200 h-4 w-full rounded mb-1.5" />
        <div className="bg-gray-200 h-4 w-[80%] rounded" />
      </div>

      {/* Experience section */}
      <div className="mb-8">
        <div className="bg-bg-skeleton h-6 w-[233px] rounded mb-3" />
        {/* Role 1 */}
        <div className="mb-4">
          <div className="bg-gray-200 h-4 w-[72%] rounded mb-1.5" />
          <div className="bg-bg-muted h-3 w-[350px] rounded mb-1.5" />
          <div className="bg-gray-200 h-3 w-full rounded mb-1" />
          <div className="bg-gray-200 h-3 w-full rounded mb-1" />
          <div className="bg-gray-200 h-3 w-[77%] rounded" />
        </div>
        {/* Role 2 */}
        <div className="mb-4">
          <div className="bg-gray-200 h-4 w-[65%] rounded mb-1.5" />
          <div className="bg-bg-muted h-3 w-[350px] rounded mb-1.5" />
          <div className="bg-gray-200 h-3 w-full rounded mb-1" />
          <div className="bg-gray-200 h-3 w-full rounded mb-1" />
          <div className="bg-gray-200 h-3 w-[72%] rounded" />
        </div>
      </div>

      {/* Education section */}
      <div className="mb-8">
        <div className="bg-bg-skeleton h-6 w-[174px] rounded mb-3" />
        <div className="bg-gray-200 h-4 w-[58%] rounded mb-1.5" />
        <div className="bg-bg-muted h-3 w-[279px] rounded mb-1.5" />
        <div className="bg-gray-200 h-3 w-full rounded mb-1" />
        <div className="bg-gray-200 h-3 w-full rounded mb-1" />
        <div className="bg-gray-200 h-3 w-[80%] rounded" />
      </div>

      {/* Skills section */}
      <div>
        <div className="bg-bg-skeleton h-6 w-[140px] rounded mb-3" />
        <div className="flex gap-3 mb-1.5">
          <div className="bg-gray-200 h-3 w-[48%] rounded" />
          <div className="bg-gray-200 h-3 w-[48%] rounded" />
        </div>
        <div className="flex gap-3">
          <div className="bg-gray-200 h-3 w-[48%] rounded" />
          <div className="bg-gray-200 h-3 w-[48%] rounded" />
        </div>
      </div>
    </div>
  );
};
