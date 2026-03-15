import { useQuery } from '@tanstack/react-query';
import { getApiBase } from '@/lib/api';

interface ResumeHtmlResponse {
  html: string;
}

export const useResumeHtml = (sessionId: string) => {
  const { data, isLoading, error, refetch } = useQuery<ResumeHtmlResponse>({
    queryKey: ['resume-html', sessionId],
    queryFn: async () => {
      const res = await fetch(`${getApiBase()}/pipeline/${sessionId}/resume-html`);
      if (!res.ok) throw new Error(`Failed to fetch resume HTML: ${res.status}`);
      return res.json();
    },
    enabled: !!sessionId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    resumeHtml: data?.html ?? '',
    isLoading,
    error,
    refetch,
  };
};
