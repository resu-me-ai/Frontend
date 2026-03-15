/**
 * Mock data for analysis API
 * Used in demo mode when VITE_DEMO_MODE=true
 */

// Note: Types defined inline to avoid circular dependency with @/api/analysis
export const mockAnalysisResult = {
  match_report: {
    overall_score: 78,
    categories: {
      skills: {
        score: 85,
        description: 'Strong alignment with required technical skills. Python, React, and AWS experience match well.',
      },
      experience: {
        score: 72,
        description: '4 years experience aligns with 5+ year requirement. Consider highlighting leadership roles.',
      },
      qualifications: {
        score: 80,
        description: 'Bachelor\'s degree requirement met. Certifications could strengthen your application.',
      },
      keywords: {
        score: 75,
        description: 'Good keyword coverage. Consider adding: "agile", "CI/CD", "microservices".',
      },
    },
  },
  patterns: [
    {
      id: 'P1',
      name: 'Quantifiable Achievement',
      description: 'Add metrics to demonstrate impact',
      bullets: [
        {
          original: 'Led development of new features',
          suggestion: 'Led development of 5 new features, increasing user engagement by 25%',
        },
        {
          original: 'Improved system performance',
          suggestion: 'Improved system performance by reducing API latency from 800ms to 200ms (75% improvement)',
        },
      ],
    },
    {
      id: 'P2',
      name: 'Action Verb Strength',
      description: 'Use stronger action verbs to show ownership',
      bullets: [
        {
          original: 'Helped with the migration project',
          suggestion: 'Spearheaded cloud migration project serving 50K+ users',
        },
      ],
    },
    {
      id: 'P3',
      name: 'Keyword Optimization',
      description: 'Include job-relevant keywords naturally',
      bullets: [
        {
          original: 'Built backend services',
          suggestion: 'Architected microservices using Node.js and AWS Lambda',
        },
      ],
    },
  ],
  questions: [
    {
      id: 'q1',
      pattern_id: 'P1',
      bullet_ref: 0,
      question: 'Can you tell me more about the features you led development on?',
      sub_questions: [
        'How many users did these features serve?',
        'What was the measurable impact on the business?',
        'Did you lead a team, and if so, how many people?',
      ],
      why_we_ask: 'Adding specific metrics transforms generic statements into compelling achievements that catch recruiters\' attention.',
    },
    {
      id: 'q2',
      pattern_id: 'P1',
      bullet_ref: 1,
      question: 'What specific improvements did you make to system performance?',
      sub_questions: [
        'What was the before/after performance difference?',
        'How many users or requests were affected?',
        'What technologies or techniques did you use?',
      ],
      why_we_ask: 'Performance improvements with specific numbers demonstrate technical expertise and business impact.',
    },
    {
      id: 'q3',
      pattern_id: 'P2',
      bullet_ref: 0,
      question: 'Tell me about your role in the migration project.',
      sub_questions: [
        'Were you the lead or a key contributor?',
        'What was the scope of the migration?',
        'What challenges did you overcome?',
      ],
      why_we_ask: 'Clarifying your specific role helps us use action verbs that accurately reflect your ownership level.',
    },
  ],
};

/**
 * Simulates API delay for realistic demo experience
 */
export async function simulateApiDelay(ms: number = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
