# Resume Document Spacing Reference

Spacing values derived from the near-perfect-resume-template.pdf.
These apply to the HTML resume rendering path (`ResumeDocument` and its children).

## Document Container

| Property | Value | Notes |
|---|---|---|
| Document width | `816px` | US Letter at 96 DPI (8.5" x 96) |
| Padding | `40px` all sides | Content area = 736px |
| Scale behavior | `transform: scale()` | Scales up/down to fill container, text wrapping fixed at 816px |

## Text Properties

| Element | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Name (h1) | `30px` | bold | default | default |
| Contact line | `14px` (text-sm) | normal | default | default |
| Section header | `20px` | bold | default | default |
| Role header (title:company:date) | `14px` (text-sm) | mixed* | `18px` | `tracking-tight` |
| Achievements line | `14px` (text-sm) | mixed** | `18px` | `tracking-tight` |
| Bullet text | `14px` (text-sm) | normal | `18px` | `tracking-tight` |

\* Role header: title=bold, company=normal gray, context=italic gray, date=italic gray
\** Achievements: "Achievements:" prefix = semibold orange, rest = normal

## Vertical Spacing

### Between text-lines (within a section)

| Gap | Tailwind | Pixels | Component |
|---|---|---|---|
| Bullet → Bullet | `space-y-0.5` | 2px | `BulletList` |
| Role header → Achievements | `marginTop: 1` | 1px | `ExperienceRole` |
| Achievements → Bullets | `mt-px` | 1px | `ExperienceRole` |

### Between headers and sections (structural gaps)

| Gap | Tailwind | Pixels | Component |
|---|---|---|---|
| Name → Contact line | `mb-1` | 4px | `ResumeHeader h1` |
| Contact block → first section | `mb-3` | 12px | `ResumeHeader div` |
| Section header padding-bottom | `pb-1` | 4px | `ResumeSectionHeader` |
| Section header → content | `mb-2` | 8px | `ResumeSectionHeader` |
| Between sections | `mb-3` | 12px | `ResumeSection` |
| Between roles | `mb-2.5` | 10px | `ExperienceRole` |

## Date Range Formatting

Role headers use progressive date shortening to fit on one line:

1. **Full:** "March 2016-February 2019"
2. **Abbreviated:** "Mar 2016-Feb 2019"
3. **Numeric:** "03/2016-02/2019"

Measured imperatively in `useLayoutEffect` — tries each format, picks first that keeps `scrollHeight <= 20px`.

## Color Palette

| Use | Color |
|---|---|
| Primary text | `#111827` |
| Body text | `#374151` |
| Secondary text | `#6b7280` |
| Tertiary text | `#4b5563` |
| Links | `#2563eb` |
| Achievements prefix | `#ea580c` (orange) |
| Section border | `#e5e7eb` |
| Bullet dot | `#6b7280` |
