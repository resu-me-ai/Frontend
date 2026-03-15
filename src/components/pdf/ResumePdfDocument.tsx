import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Link,
} from '@react-pdf/renderer';
import type {
  ResumeDocumentData,
  ResumeOverview,
  ResumeSection,
  ExperienceRoleData,
  BulletItem,
} from '@/types/resume';
import { isExperienceSection } from '@/types/resume';
import { parseBoldPrefix } from '@/utils/parseBoldPrefix';
import { styles } from './styles';
import './fonts';

// ── Header ──────────────────────────────────────────────

interface PdfResumeHeaderProps {
  overview: ResumeOverview;
}

const PdfResumeHeader: React.FC<PdfResumeHeaderProps> = ({ overview }) => {
  const { full_name, contact_line, parsed_contact } = overview;

  const contactParts: React.ReactNode[] = [];

  if (parsed_contact) {
    if (parsed_contact.location) {
      contactParts.push(
        <Text key="location">{parsed_contact.location}</Text>,
      );
    }
    if (parsed_contact.phone) {
      contactParts.push(
        <Text key="phone">{parsed_contact.phone}</Text>,
      );
    }
    if (parsed_contact.email) {
      contactParts.push(
        <Link key="email" src={`mailto:${parsed_contact.email}`} style={styles.contactLink}>
          {parsed_contact.email}
        </Link>,
      );
    }
    if (parsed_contact.linkedin_url) {
      const href = parsed_contact.linkedin_url.startsWith('http')
        ? parsed_contact.linkedin_url
        : `https://${parsed_contact.linkedin_url}`;
      contactParts.push(
        <Link key="linkedin" src={href} style={styles.contactLink}>
          {parsed_contact.linkedin_url}
        </Link>,
      );
    }
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.name}>{full_name}</Text>
      {contactParts.length > 0 ? (
        <Text style={styles.contactLine}>
          {contactParts.map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Text style={styles.contactSeparator}> | </Text>}
              {part}
            </React.Fragment>
          ))}
        </Text>
      ) : (
        <Text style={styles.contactLine}>{contact_line}</Text>
      )}
    </View>
  );
};

// ── Bullet List ─────────────────────────────────────────

interface PdfBulletListProps {
  bullets: BulletItem[];
}

const PdfBulletList: React.FC<PdfBulletListProps> = ({ bullets }) => (
  <View>
    {bullets
      .filter((b) => b?.text)
      .map((bullet) => {
        const { prefix, rest, isOrangePrefix } = parseBoldPrefix(bullet.text);

        return (
          <View key={bullet.bullet_index} style={styles.bulletItem}>
            <Text style={styles.bulletDot}>{'\u2022'}</Text>
            <Text style={styles.bulletText}>
              {prefix && (
                <Text style={isOrangePrefix ? styles.orangePrefix : styles.boldPrefix}>
                  {prefix}{' '}
                </Text>
              )}
              {rest}
            </Text>
          </View>
        );
      })}
  </View>
);

// ── Experience Role ─────────────────────────────────────

interface PdfExperienceRoleProps {
  role: ExperienceRoleData;
}

const PdfExperienceRole: React.FC<PdfExperienceRoleProps> = ({ role }) => (
  <View style={styles.roleContainer} wrap={false}>
    <View style={styles.roleHeaderRow}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', flex: 1 }}>
        <Text style={styles.roleTitle}>{role.title}</Text>
        <Text style={styles.roleCompany}>{role.company}</Text>
        {role.company_context && (
          <Text style={styles.roleContext}>({role.company_context})</Text>
        )}
      </View>
      <Text style={styles.roleDate}>{role.date_range}</Text>
    </View>

    {role.achievements_line && (
      <Text style={styles.achievementsLine}>
        <Text style={styles.achievementsPrefix}>Achievements:</Text>
        {' '}{role.achievements_line}
      </Text>
    )}

    {(role.bullets?.length ?? 0) > 0 && (
      <PdfBulletList bullets={role.bullets} />
    )}
  </View>
);

// ── Section ─────────────────────────────────────────────

interface PdfResumeSectionProps {
  section: ResumeSection;
}

const PdfResumeSection: React.FC<PdfResumeSectionProps> = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>{section.header}</Text>

    {isExperienceSection(section)
      ? (section.content ?? []).map((role) => (
          <PdfExperienceRole key={role.role_index} role={role} />
        ))
      : <PdfBulletList bullets={section.content ?? []} />
    }
  </View>
);

// ── Document ────────────────────────────────────────────

export interface ResumePdfDocumentProps {
  data: ResumeDocumentData;
}

export const ResumePdfDocument: React.FC<ResumePdfDocumentProps> = ({ data }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <PdfResumeHeader overview={data.resume_overview} />
      {(data.resume_sections ?? []).map((section, i) => (
        <PdfResumeSection
          key={section.section_index ?? i}
          section={section}
        />
      ))}
    </Page>
  </Document>
);
