import React, { useRef, useState, useEffect } from 'react';
import { sanitizeHtml } from '@/utils/sanitize';

/** US Letter width at 96 DPI (8.5 inches x 96) */
const DOCUMENT_WIDTH = 816;

export interface ResumePreviewPanelProps {
  /** Raw HTML string from DOCX-to-HTML conversion */
  resumeHtml: string;
  /** ID of bullet element to scroll to (e.g. "role_0.bullet_0") */
  highlightedBulletId?: string;
  /** Substring within the bullet to highlight yellow (resumeQuote) */
  highlightedText?: string;
  /** Additional CSS classes on the root element */
  className?: string;
}

/**
 * Strip outer html/head/body wrappers from raw HTML.
 * Extracts style blocks and inner body content separately
 * so we can scope them inside our container without style bleed.
 */
const extractContent = (raw: string): { styles: string; body: string } => {
  const styleBlocks: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(raw)) !== null) {
    styleBlocks.push(match[1]);
  }

  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : raw;

  return { styles: styleBlocks.join('\n'), body };
};

export const ResumePreviewPanel: React.FC<ResumePreviewPanelProps> = ({
  resumeHtml,
  highlightedBulletId,
  highlightedText,
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
  }, [resumeHtml, highlightedBulletId, highlightedText]);

  const processedHtml = React.useMemo(() => {
    if (!resumeHtml) return { styles: '', body: '' };

    const { styles, body } = extractContent(resumeHtml);
    let html = body;

    if (highlightedText) {
      let cleanText = highlightedText.replace(/\.{2,}$/, '').trim();
      if (cleanText.length > 80) {
        cleanText = cleanText.substring(0, 80);
      }

      const plainChars: number[] = [];
      let inTag = false;
      for (let i = 0; i < html.length; i++) {
        if (html[i] === '<') { inTag = true; continue; }
        if (html[i] === '>') { inTag = false; continue; }
        if (!inTag) { plainChars.push(i); }
      }
      const plainTextRaw = plainChars.map(i => html[i]).join('');

      const decodedChars: number[] = [];
      let decoded = '';
      const entityRegex = /&(?:#(\d+)|#x([0-9a-fA-F]+)|(\w+));/g;
      let lastIdx = 0;
      let entityMatch: RegExpExecArray | null;
      while ((entityMatch = entityRegex.exec(plainTextRaw)) !== null) {
        for (let k = lastIdx; k < entityMatch.index; k++) {
          decodedChars.push(k);
          decoded += plainTextRaw[k];
        }
        let ch: string;
        if (entityMatch[1]) {
          ch = String.fromCharCode(parseInt(entityMatch[1], 10));
        } else if (entityMatch[2]) {
          ch = String.fromCharCode(parseInt(entityMatch[2], 16));
        } else {
          const namedEntities: Record<string, string> = {
            amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
            nbsp: '\u00A0', ndash: '\u2013', mdash: '\u2014',
          };
          ch = namedEntities[entityMatch[3]] || entityMatch[0];
        }
        decodedChars.push(entityMatch.index);
        decoded += ch;
        lastIdx = entityMatch.index + entityMatch[0].length;
      }
      for (let k = lastIdx; k < plainTextRaw.length; k++) {
        decodedChars.push(k);
        decoded += plainTextRaw[k];
      }

      const matchIdx = decoded.toLowerCase().indexOf(cleanText.toLowerCase());
      if (matchIdx !== -1) {
        let endDecoded = matchIdx + cleanText.length;
        while (endDecoded < decoded.length && decoded[endDecoded] !== '\n') {
          endDecoded++;
        }
        const plainStart = decodedChars[matchIdx];
        const plainEnd = decodedChars[endDecoded - 1];
        const htmlStart = plainChars[plainStart];
        const htmlEnd = plainChars[plainEnd] + 1;
        let insertEnd = htmlEnd;
        while (insertEnd < html.length && html[insertEnd] !== '<') {
          insertEnd++;
        }

        html =
          html.substring(0, htmlStart) +
          '<span class="highlight-yellow">' +
          html.substring(htmlStart, insertEnd) +
          '</span>' +
          html.substring(insertEnd);
      }
    }

    return { styles, body: html };
  }, [resumeHtml, highlightedBulletId, highlightedText]);

  return (
    <div className={`bg-white ${className}`}>
      {/* Scoped styles */}
      <style>{`
        .resume-preview-scope .highlight-yellow {
          background-color: #fef08a;
          padding: 1px 2px;
          border-radius: 2px;
        }
        .resume-preview-scope .resume,
        .resume-preview-scope .resume-container {
          width: 100% !important;
          min-height: auto !important;
          box-shadow: none !important;
          padding: 0.4in 0.5in !important;
        }
        .resume-preview-scope h1 {
          font-size: 22px !important;
          letter-spacing: 3px !important;
        }
        .resume-preview-scope ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        .resume-preview-scope li {
          list-style-position: inside;
        }
        .resume-preview-scope li:has(> ul) {
          list-style-type: none;
        }
        .resume-preview-scope ul ul {
          padding-left: 0;
        }
      `}</style>
      {processedHtml.styles && (
        <style>{processedHtml.styles}</style>
      )}

      {/* Scaling wrapper: renders at fixed 816px, scales to fit container */}
      <div
        ref={outerRef}
        className="overflow-hidden"
        style={wrapperHeight ? { height: wrapperHeight } : undefined}
      >
        <div
          ref={innerRef}
          className="resume-preview-scope bg-white rounded-lg shadow-sm"
          style={{
            width: DOCUMENT_WIDTH,
            transform: `translateX(${translateX}px) scale(${scale})`,
            transformOrigin: 'top left',
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(processedHtml.body) }}
        />
      </div>
    </div>
  );
};
