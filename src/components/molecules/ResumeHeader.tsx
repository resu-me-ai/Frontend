import React from 'react';
import type { ResumeOverview } from '@/types/resume';

export interface ResumeHeaderProps {
  overview: ResumeOverview;
  className?: string;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  overview,
  className = '',
}) => {
  const { full_name, contact_line, parsed_contact } = overview;

  const contactItems: React.ReactNode[] = [];

  if (parsed_contact) {
    if (parsed_contact.location) {
      contactItems.push(
        <span key="location">{parsed_contact.location}</span>,
      );
    }
    if (parsed_contact.phone) {
      contactItems.push(
        <span key="phone">{parsed_contact.phone}</span>,
      );
    }
    if (parsed_contact.email) {
      contactItems.push(
        <a
          key="email"
          href={`mailto:${parsed_contact.email}`}
          className="text-action-primary hover:underline"
        >
          {parsed_contact.email}
        </a>,
      );
    }
    if (parsed_contact.linkedin_url) {
      const href = parsed_contact.linkedin_url.startsWith('http')
        ? parsed_contact.linkedin_url
        : `https://${parsed_contact.linkedin_url}`;
      contactItems.push(
        <a
          key="linkedin"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-action-primary hover:underline"
        >
          {parsed_contact.linkedin_url}
        </a>,
      );
    }
  }

  return (
    <div className={`text-center mb-3 ${className}`}>
      <h1 className="text-[30px] font-bold text-text-heading mb-1">
        {full_name}
      </h1>
      {contactItems.length > 0 ? (
        <p className="text-sm text-text-subtle">
          {contactItems.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="mx-2">|</span>}
              {item}
            </React.Fragment>
          ))}
        </p>
      ) : (
        <p className="text-sm text-text-subtle">{contact_line}</p>
      )}
    </div>
  );
};
