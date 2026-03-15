/**
 * Mock data for onboarding flow
 * Used in demo mode when VITE_DEMO_MODE=true
 */

export interface MockUser {
  id: string;
  fullName: string;
  email: string;
  imageUrl?: string;
}

export const mockUser: MockUser = {
  id: 'demo_user_123',
  fullName: 'Alex Demo',
  email: 'alex.demo@example.com',
  imageUrl: undefined,
};

export const mockOnboardingData = {
  step1: {
    fullName: 'Alex Demo',
    pronouns: 'they/them',
  },
  step2: {
    targetRole: 'Senior Software Engineer',
    experienceLevel: '5-7 years',
  },
  step3: {
    resumeUploaded: true,
    fileName: 'alex_demo_resume.pdf',
    fileSize: 245000,
  },
  step4: {
    jobDescriptionText: `Senior Software Engineer - Full Stack

We are looking for a Senior Software Engineer to join our growing team.

Requirements:
- 5+ years of experience in software development
- Strong proficiency in Python, JavaScript/TypeScript
- Experience with React, Node.js, and cloud services (AWS/GCP)
- Bachelor's degree in Computer Science or related field
- Experience with agile methodologies
- Strong problem-solving skills

Nice to have:
- Experience with microservices architecture
- Familiarity with CI/CD pipelines
- AWS certifications`,
  },
  step5: {
    analysisComplete: true,
    matchScore: 78,
  },
};

export const mockResumeText = `ALEX DEMO
Senior Software Engineer
alex.demo@example.com | (555) 123-4567 | San Francisco, CA

SUMMARY
Experienced software engineer with 5 years of experience building scalable web applications.

EXPERIENCE
Software Engineer | TechCorp Inc | 2020 - Present
- Led development of new features
- Improved system performance
- Helped with the migration project
- Built backend services

Junior Developer | StartupXYZ | 2018 - 2020
- Developed React components for customer dashboard
- Participated in code reviews and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2018

SKILLS
Python, JavaScript, TypeScript, React, Node.js, AWS, PostgreSQL, Docker
`;
