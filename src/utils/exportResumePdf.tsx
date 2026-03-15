import { pdf } from '@react-pdf/renderer';
import { ResumePdfDocument } from '@/components/pdf';
import type { ResumeDocumentData } from '@/types/resume';

export async function exportResumePdf(
  data: ResumeDocumentData,
  filename: string,
): Promise<void> {
  const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
