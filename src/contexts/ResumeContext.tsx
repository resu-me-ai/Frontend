import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ResumeData {
  file: File | null;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'doc' | null;
  // For PDF: store as Uint8Array (doesn't get detached like ArrayBuffer)
  pdfData: Uint8Array | null;
  // For DOCX: store converted HTML
  htmlContent: string | null;
}

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeFile: (file: File) => Promise<void>;
  clearResume: () => void;
  isLoading: boolean;
  error: string | null;
}

const initialResumeData: ResumeData = {
  file: null,
  fileName: '',
  fileType: null,
  pdfData: null,
  htmlContent: null,
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setResumeFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLowerCase();

      let fileType: 'pdf' | 'docx' | 'doc' | null = null;
      let pdfData: Uint8Array | null = null;
      let htmlContent: string | null = null;

      if (extension === 'pdf') {
        fileType = 'pdf';
        // Read PDF as Uint8Array (doesn't get detached like ArrayBuffer)
        const arrayBuffer = await file.arrayBuffer();
        pdfData = new Uint8Array(arrayBuffer);
      } else if (extension === 'docx') {
        fileType = 'docx';
        // Convert DOCX to HTML using mammoth
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        htmlContent = result.value;
      } else if (extension === 'doc') {
        fileType = 'doc';
        setError('Legacy .doc format is not supported. Please convert to PDF or DOCX.');
        setIsLoading(false);
        return;
      } else {
        setError('Unsupported file format. Please upload PDF or DOCX.');
        setIsLoading(false);
        return;
      }

      setResumeData({
        file,
        fileName,
        fileType,
        pdfData,
        htmlContent,
      });
    } catch (err) {
      console.error('Error processing resume file:', err);
      setError('Failed to process resume file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResume = useCallback(() => {
    setResumeData(initialResumeData);
    setError(null);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeFile,
        clearResume,
        isLoading,
        error,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
