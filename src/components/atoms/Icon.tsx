import React from 'react';
import UploadIconUrl from '@/assets/icons/Upload.svg';
import PdfIconUrl from '@/assets/icons/pdf.svg';
import WordIconUrl from '@/assets/icons/word.svg';
import PencilIconUrl from '@/assets/icons/Pencil.svg';
import LuggageIconUrl from '@/assets/icons/luggage.svg';
import DropIconUrl from '@/assets/icons/Drop.svg';
import MagicWandIconUrl from '@/assets/icons/magic wand.svg';
import CheckmarkIconUrl from '@/assets/icons/checkmark.svg';
import SkillsMatchIconUrl from '@/assets/icons/skills_match.svg';
import ExperienceIconUrl from '@/assets/icons/experience.svg';
import QualificationsIconUrl from '@/assets/icons/qualifications.svg';
import KeywordsIconUrl from '@/assets/icons/keywords.svg';
import MissingSkillsIconUrl from '@/assets/icons/missing skills.svg';
import ATSIconUrl from '@/assets/icons/ats.svg';
import PriorityIconUrl from '@/assets/icons/priority.svg';
import ReadyToPerfectIconUrl from '@/assets/icons/readytoperfect.svg';
import InfoIconUrl from '@/assets/icons/info.svg';
import MagicWandBlueIconUrl from '@/assets/icons/magic wand blue.svg';
import PdfWhiteIconUrl from '@/assets/icons/pdf-white.svg';

export interface IconProps {
  name:
    | 'chevron-down'
    | 'map-pin'
    | 'briefcase'
    | 'arrow-right'
    | 'arrow-left'
    | 'check'
    | 'upload'
    | 'pdf'
    | 'word'
    | 'pencil'
    | 'luggage'
    | 'drop'
    | 'magic-wand'
    | 'skills-match'
    | 'experience'
    | 'qualifications'
    | 'keywords'
    | 'missing-skills'
    | 'ats'
    | 'priority'
    | 'ready-to-perfect'
    | 'info'
    | 'magic-wand-blue'
    | 'pdf-white';
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 16 }) => {
  const icons = {
    'chevron-down': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'map-pin': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.5 10.5 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'briefcase': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 13H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'arrow-right': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'arrow-left': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'check': <img src={CheckmarkIconUrl} alt="Check" width={size} height={size} className={className} />,
    'upload': <img src={UploadIconUrl} alt="Upload" width={size} height={size} className={className} />,
    'pdf': <img src={PdfIconUrl} alt="PDF" width={size} height={size} className={className} />,
    'word': <img src={WordIconUrl} alt="Word" width={size} height={size} className={className} />,
    'pencil': <img src={PencilIconUrl} alt="Pencil" width={size} height={size} className={className} />,
    'luggage': <img src={LuggageIconUrl} alt="Luggage" width={size} height={size} className={className} />,
    'drop': <img src={DropIconUrl} alt="Drop" width={size} height={size} className={className} />,
    'magic-wand': <img src={MagicWandIconUrl} alt="Magic Wand" width={size} height={size} className={className} />,
    'skills-match': <img src={SkillsMatchIconUrl} alt="Skills Match" width={size} height={size} className={className} />,
    'experience': <img src={ExperienceIconUrl} alt="Experience" width={size} height={size} className={className} />,
    'qualifications': <img src={QualificationsIconUrl} alt="Qualifications" width={size} height={size} className={className} />,
    'keywords': <img src={KeywordsIconUrl} alt="Keywords" width={size} height={size} className={className} />,
    'missing-skills': <img src={MissingSkillsIconUrl} alt="Missing Skills" width={size} height={size} className={className} />,
    'ats': <img src={ATSIconUrl} alt="ATS" width={size} height={size} className={className} />,
    'priority': <img src={PriorityIconUrl} alt="Priority" width={size} height={size} className={className} />,
    'ready-to-perfect': <img src={ReadyToPerfectIconUrl} alt="Ready to Perfect" width={size} height={size} className={className} />,
    'info': <img src={InfoIconUrl} alt="Info" width={size} height={size} className={className} />,
    'magic-wand-blue': <img src={MagicWandBlueIconUrl} alt="Magic Wand Blue" width={size} height={size} className={className} />,
    'pdf-white': <img src={PdfWhiteIconUrl} alt="PDF White" width={size} height={size} className={className} />,
  };

  return <div className={`inline-flex items-center justify-center ${className}`}>{icons[name]}</div>;
};

