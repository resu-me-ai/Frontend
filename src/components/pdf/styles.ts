import { StyleSheet } from '@react-pdf/renderer';

// US Letter: 612pt × 792pt. 0.5" margins = 36pt.
// Content area: 540pt × 720pt.
// Scaling: PDF pt ≈ CSS px × 0.75

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#374151',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 36,
    paddingRight: 36,
  },

  // Header — centered name + contact
  headerContainer: {
    textAlign: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 10,
    color: '#4b5563',
  },
  contactSeparator: {
    marginHorizontal: 6,
  },
  contactLink: {
    color: '#2563eb',
    textDecoration: 'none',
  },

  // Section
  sectionContainer: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 700,
    color: '#111827',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 8,
  },

  // Experience role
  roleContainer: {
    marginBottom: 10,
  },
  roleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#111827',
  },
  roleCompany: {
    fontSize: 10,
    fontWeight: 500,
    color: '#6b7280',
    marginLeft: 6,
  },
  roleContext: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6b7280',
    marginLeft: 4,
  },
  roleDate: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6b7280',
  },

  // Achievements line (orange prefix)
  achievementsLine: {
    fontSize: 10,
    color: '#374151',
    marginTop: 3,
    paddingLeft: 12,
  },
  achievementsPrefix: {
    fontWeight: 600,
    color: '#ea580c',
  },

  // Bullet list
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 12,
  },
  bulletDot: {
    width: 12,
    fontSize: 10,
    color: '#6b7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
  },
  boldPrefix: {
    fontWeight: 600,
    color: '#111827',
  },
  orangePrefix: {
    fontWeight: 600,
    color: '#ea580c',
  },
});
