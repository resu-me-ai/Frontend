import React, { useRef, useState, useEffect } from 'react';
import type { ResumeDocumentData } from '@/types/resume';
import { ResumeHeader } from '@/components/molecules/ResumeHeader';
import { ResumeSection } from '@/components/molecules/ResumeSection';

/** US Letter width at 96 DPI (8.5 inches × 96) */
const DOCUMENT_WIDTH = 816;

export interface ResumeDocumentProps {
  data: ResumeDocumentData;
  className?: string;
}

/**
 * Resume rendered at a fixed document width (816px = US Letter).
 * Automatically scales down when the container is narrower,
 * preserving exact text-wrapping positions like a print preview.
 */
export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  className = '',
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const containerWidth = outer.clientWidth;
      const s = containerWidth / DOCUMENT_WIDTH;
      const visualWidth = DOCUMENT_WIDTH * s;
      const x = Math.max(0, (containerWidth - visualWidth) / 2);

      setScale(s);
      setTranslateX(x);
      setWrapperHeight(inner.scrollHeight * s);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    return () => ro.disconnect();
  }, [data]);

  return (
    <div
      ref={outerRef}
      className={`overflow-hidden ${className}`}
      style={wrapperHeight ? { height: wrapperHeight } : undefined}
    >
      <div
        ref={innerRef}
        className="bg-white shadow-md"
        style={{
          width: DOCUMENT_WIDTH,
          padding: 40,
          transform: `translateX(${translateX}px) scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <ResumeHeader overview={data.resume_overview} />

        {(data.resume_sections ?? []).map((section, i) => (
          <ResumeSection
            key={section.section_index ?? i}
            section={section}
          />
        ))}
      </div>
    </div>
  );
};
