import React, { useCallback } from 'react';

export interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  supportedFormats?: string[];
  maxSizeMB?: number;
  selectedFile?: File | null;
  isUploading?: boolean;
  className?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFilesSelected,
  supportedFormats = ['PNG', 'JPG', 'PDF', 'DOCX'],
  maxSizeMB = 5,
  selectedFile = null,
  isUploading = false,
  className = '',
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected],
  );

  const acceptString = supportedFormats
    .map((f) => `.${f.toLowerCase()}`)
    .join(',');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full py-8 px-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragOver
            ? 'border-action-primary bg-info-light'
            : selectedFile
              ? 'border-success bg-success-light'
              : 'border-border-input bg-bg-surface hover:border-text-placeholder hover:bg-bg-muted'
        }`}
      >
        <input
          type="file"
          className="sr-only"
          accept={acceptString}
          onChange={handleFileInput}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            {/* File icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-success-subtle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-sm font-medium text-text-heading">
              {selectedFile.name}
            </span>
            <span className="text-xs text-text-muted">
              {formatFileSize(selectedFile.size)}
            </span>
            <span className="text-xs text-action-primary hover:underline">
              Click to replace
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* Paperclip / upload icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isDragOver ? 'bg-info-subtle' : 'bg-bg-muted'
            }`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDragOver ? '#2563eb' : '#6b7280'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </div>

            <div className="text-center">
              <span className="text-sm font-medium text-text-heading">
                Drop files here or{' '}
                <span className="text-action-primary">click to upload</span>
              </span>
            </div>

            {isUploading && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-action-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-text-muted">Uploading...</span>
              </div>
            )}
          </div>
        )}
      </label>

      {/* Metadata line */}
      <div className="flex items-center gap-2 mt-2 text-xs text-text-placeholder">
        <span>Supports: {supportedFormats.join(', ')}</span>
        <span aria-hidden="true">&middot;</span>
        <span>Max {maxSizeMB}MB per file</span>
      </div>
    </div>
  );
};
