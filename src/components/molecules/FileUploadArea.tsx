import React, { useRef, useState } from 'react';
import { Icon } from '@/components/atoms/Icon';

export interface FileUploadAreaProps {
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
  selectedFile?: File | null;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile = null,
  accept = '.pdf,.doc,.docx',
  maxSize = 5 * 1024 * 1024, // 5MB default
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileName: string): 'pdf' | 'word' => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'pdf' ? 'pdf' : 'word';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      setError('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect?.(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Show file attached state
  if (selectedFile) {
    return (
      <div className={className}>
        <div className="border-2 border-solid border-green-500 bg-success-light rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white border border-border-default flex items-center justify-center">
                <Icon name={getFileIcon(selectedFile.name)} size={24} className="text-text-muted" />
              </div>
              <div>
                <p className="text-base font-semibold text-text-body">{selectedFile.name}</p>
                <p className="text-sm text-text-muted">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClick}
                className="text-sm text-action-primary hover:text-action-primary-hover font-medium"
              >
                Change
              </button>
              <button
                onClick={handleRemove}
                className="w-8 h-8 rounded-full hover:bg-error-subtle flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-error"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      </div>
    );
  }

  // Show default upload state
  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          cursor-pointer transition-colors
          ${isDragging ? 'border-action-primary bg-blue-50' : 'border-border-input bg-white'}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-bg-muted flex items-center justify-center">
            <Icon name="drop" size={25} className="text-text-muted" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-text-body">
              <span>Drop your resume here or</span>{' '}
              <span className="text-action-primary cursor-pointer">click to browse</span>
            </p>
            <p className="text-xs text-text-placeholder mt-2">
              Supports PDF, DOC, DOCX (Max {maxSize / (1024 * 1024)}MB)
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
