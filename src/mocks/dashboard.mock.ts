/**
 * Mock data for Dashboard page
 * Stats, combinations, recent activity, user data
 */

export interface MockStatCard {
  id: string;
  label: string;
  value: number | string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface MockCombination {
  id: string;
  jobTitle: string;
  company: string;
  matchPercentage: number;
  status: 'interview' | 'applied' | 'draft';
  lastAnalyzed: string;
  resumeVersion: string;
  evidenceFiles: number;
  appliedDate?: string;
  interviewDate?: string;
}

export interface MockActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  iconBg: string;
  iconColor: string;
}

export const mockStats: MockStatCard[] = [
  { id: 'stat-1', label: 'Total Combos', value: 3, icon: 'file-text', iconBg: '#eff6ff', iconColor: '#2563eb' },
  { id: 'stat-2', label: 'Applied', value: 1, icon: 'building', iconBg: '#f0fdf4', iconColor: '#16a34a' },
  { id: 'stat-3', label: 'Interviews', value: 1, icon: 'calendar', iconBg: '#f5f3ff', iconColor: '#7c3aed' },
  { id: 'stat-4', label: 'Avg Match', value: '85%', icon: 'trending-up', iconBg: '#ecfdf5', iconColor: '#059669' },
];

export const mockCombinations: MockCombination[] = [
  {
    id: 'combo-1',
    jobTitle: 'Product Manager',
    company: 'TechCorp',
    matchPercentage: 92,
    status: 'interview',
    lastAnalyzed: 'Today at 2:30 PM',
    resumeVersion: 'Resume v3.2',
    evidenceFiles: 15,
    appliedDate: '1/31/2024',
    interviewDate: '2/9/2024',
  },
  {
    id: 'combo-2',
    jobTitle: 'UX Designer',
    company: 'StartupXYZ',
    matchPercentage: 85,
    status: 'applied',
    lastAnalyzed: 'Yesterday at 10:15 AM',
    resumeVersion: 'Resume v2.1',
    evidenceFiles: 12,
    appliedDate: '2/4/2024',
  },
  {
    id: 'combo-3',
    jobTitle: 'Engineering Lead',
    company: 'InnovateTech',
    matchPercentage: 78,
    status: 'draft',
    lastAnalyzed: 'Feb 25 at 4:00 PM',
    resumeVersion: 'Resume v1.5',
    evidenceFiles: 8,
  },
];

export const mockRecentActivity: MockActivityItem[] = [
  {
    id: 'act-1',
    icon: 'check-circle',
    title: 'Product Manager at TechCorp',
    description: 'Analysis completed',
    timestamp: '2 hours ago',
    iconBg: '#f5f3ff',
    iconColor: '#7c3aed',
  },
  {
    id: 'act-2',
    icon: 'file-text',
    title: 'UX Designer at StartupXYZ',
    description: 'Application submitted',
    timestamp: '1 day ago',
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
  },
  {
    id: 'act-3',
    icon: 'message-circle',
    title: 'Product Manager at TechCorp',
    description: 'Resume updated',
    timestamp: '2 days ago',
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
  },
  {
    id: 'act-4',
    icon: 'plus-circle',
    title: 'Engineering Lead at InnovateTech',
    description: 'New combination created',
    timestamp: '3 days ago',
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
  },
  {
    id: 'act-5',
    icon: 'upload',
    title: 'Engineering Lead at InnovateTech',
    description: 'Resume analyzed',
    timestamp: '3 days ago',
    iconBg: '#f3f4f6',
    iconColor: '#6b7280',
  },
];

export const mockUserDashboard = {
  userName: 'John',
  memberSince: 'February 2026',
  plan: 'Pro',
};
