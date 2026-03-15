import React, { useState, useMemo } from 'react';
import { sanitizeHtml } from '@/utils/sanitize';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface ResumeViewerProps {
  pdfData?: Uint8Array | null;
  htmlContent?: string | null;
  fileType: 'pdf' | 'docx' | 'doc' | null;
  fileName?: string;
  className?: string;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  pdfData,
  htmlContent,
  fileType,
  fileName: _fileName,
  className = '',
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Memoize the file prop to avoid unnecessary reloads
  const pdfFile = useMemo(() => {
    if (pdfData) {
      return { data: pdfData };
    }
    return null;
  }, [pdfData]);

  // Render PDF
  if (fileType === 'pdf' && pdfFile) {
    return (
      <div className={`resume-viewer ${className}`}>
        {/* PDF Controls */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded text-sm"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {pageNumber} of {numPages || '?'}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(numPages || p, p + 1))}
              disabled={pageNumber >= (numPages || 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded text-sm"
            >
              Next
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              -
            </button>
            <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* PDF Document */}
        <div className="flex justify-center overflow-auto bg-gray-100 rounded-lg p-4">
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-96 text-red-500">
                Failed to load PDF
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    );
  }

  // Render DOCX (converted to HTML)
  if (fileType === 'docx' && htmlContent) {
    return (
      <div className={`resume-viewer ${className}`}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-[680px] mx-auto">
          <div
            className="prose prose-sm max-w-none docx-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContent || '') }}
          />
        </div>
        <style>{`
          .docx-content h1 { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
          .docx-content h2 { font-size: 1.25rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; }
          .docx-content p { margin-bottom: 0.5rem; }
          .docx-content ul, .docx-content ol { margin-left: 1.5rem; margin-bottom: 0.5rem; }
          .docx-content li { margin-bottom: 0.25rem; }
          .docx-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
          .docx-content td, .docx-content th { border: 1px solid #e5e7eb; padding: 0.5rem; }
        `}</style>
      </div>
    );
  }

  // No content or unsupported
  return (
    <div className={`resume-viewer ${className}`}>
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500 text-lg mb-2">No resume uploaded</p>
        <p className="text-gray-400 text-sm">Upload a PDF or DOCX file to view</p>
      </div>
    </div>
  );
};
