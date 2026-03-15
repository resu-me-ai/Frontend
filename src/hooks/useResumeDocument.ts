import { useQuery } from '@tanstack/react-query';
import { getApiBase } from '@/lib/api';
import type { ResumeDocumentData } from '@/types/resume';

export const useResumeDocument = (sessionId: string, enabled = true) => {
  const { data, isLoading, error } = useQuery<ResumeDocumentData | null>({
    queryKey: ['resume-document', sessionId],
    queryFn: async () => {
      const res = await fetch(
        `${getApiBase()}/pipeline/${sessionId}/resume-document`,
      );
      // Graceful degradation: if endpoint 404s, return null instead of throwing
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Failed to fetch resume document: ${res.status}`);
      return res.json();
    },
    enabled: !!sessionId && enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    resumeData: data ?? null,
    isLoading,
    error,
  };
};
