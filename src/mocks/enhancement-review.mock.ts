/**
 * Mock data for the Enhancement Review page (MVP Flow Step 7).
 *
 * Dimension labels match the real P1-P4 pipeline principles +
 * rescore dimensions (SKILLS FIT, ATS MATCH).
 * Bullet originals come from the pre-enhancement resume;
 * enhanced versions reflect AI-generated alternatives.
 */

// ── Types ──────────────────────────────────────────────────

export interface MockDimensionScore {
  label: string;
  delta: number;
}

export interface MockBulletVersion {
  version: number;
  text: string;
  score: number;
  isBest: boolean;
}

export interface MockBulletReview {
  id: string;
  bulletNumber: number;
  dimension: string;
  deltaPercent: number;
  company: string;
  originalText: string;
  versions: MockBulletVersion[];
  selectedVersion: number;
}

// ── Dimension scores ───────────────────────────────────────

export const mockDimensionScores: MockDimensionScore[] = [
  { label: 'QUANTIFICATION', delta: 3.3 },
  { label: 'HIGH-PRESSURE', delta: 2.3 },
  { label: 'ACTION VERBS', delta: 2.4 },
  { label: 'STRATEGIC IMPACT', delta: 2.5 },
  { label: 'SKILLS FIT', delta: 2.4 },
  { label: 'ATS MATCH', delta: 2.9 },
];

// ── Bullet reviews ─────────────────────────────────────────

export const mockBulletReviews: MockBulletReview[] = [
  {
    id: 'b1',
    bulletNumber: 1,
    dimension: 'QUANTIFICATION',
    deltaPercent: 60,
    company: 'StreamTech Inc.',
    originalText:
      'Manage $25M portfolio of high-profile sports-stream products to serve 8M monthly users of StreamTech platform.',
    versions: [
      {
        version: 1,
        text: 'Directed $25M product portfolio spanning 3 sports-streaming verticals, driving 8M MAU and achieving 200% revenue growth through strategic feature prioritization and cross-team alignment.',
        score: 9.2,
        isBest: true,
      },
      {
        version: 2,
        text: 'Led strategic management of $25M sports-streaming product portfolio, growing monthly active users to 8M while optimizing engagement metrics across the StreamTech platform.',
        score: 8.4,
        isBest: false,
      },
    ],
    selectedVersion: 1,
  },
  {
    id: 'b2',
    bulletNumber: 2,
    dimension: 'HIGH-PRESSURE',
    deltaPercent: 45,
    company: 'StreamTech Inc.',
    originalText:
      'Hired, developed, and mentored seven high-performing brand managers and built a highly collaborative product/engineering organization, & team culture that raises the performance bar for the rest of the company.',
    versions: [
      {
        version: 1,
        text: 'Built and mentored a 7-person product management team, establishing a culture of cross-functional collaboration that elevated engineering velocity by 40% and became the organizational benchmark for high performance.',
        score: 9.0,
        isBest: true,
      },
      {
        version: 2,
        text: 'Recruited and developed 7 brand managers into high-performing product leaders, creating a collaborative team culture recognized company-wide for raising the performance bar.',
        score: 8.1,
        isBest: false,
      },
    ],
    selectedVersion: 1,
  },
  {
    id: 'b3',
    bulletNumber: 3,
    dimension: 'QUANTIFICATION',
    deltaPercent: 55,
    company: 'StreamTech Inc.',
    originalText:
      'Increase product-portfolio revenue by 300%, decreased customer complaints by 8X and churn by 60% YoY.',
    versions: [
      {
        version: 1,
        text: 'Drove 300% revenue growth ($15M→$45M) across product portfolio while reducing customer complaints by 8× and annual churn by 60%, translating to $12M in retained revenue.',
        score: 9.5,
        isBest: true,
      },
      {
        version: 2,
        text: 'Increased portfolio revenue by 300% and improved customer satisfaction metrics, including an 8× reduction in complaints and 60% decrease in year-over-year churn.',
        score: 8.0,
        isBest: false,
      },
    ],
    selectedVersion: 1,
  },
  {
    id: 'b4',
    bulletNumber: 4,
    dimension: 'STRATEGIC IMPACT',
    deltaPercent: 35,
    company: 'MediaCorp',
    originalText:
      'Manage Brand name partnership at SVP executive level; built brand roadmap, product strategy & product development of major sports streaming apps across web, mobile (iOS, Android) & connected devices (consoles).',
    versions: [
      {
        version: 1,
        text: 'Owned SVP-level brand partnership and product strategy for flagship sports streaming apps across 5 platforms (web, iOS, Android, console, connected TV), aligning roadmap to $100M+ revenue targets.',
        score: 8.8,
        isBest: true,
      },
      {
        version: 2,
        text: 'Managed executive-level brand partnerships and directed product development of sports streaming applications across web, mobile, and connected device platforms.',
        score: 7.6,
        isBest: false,
      },
    ],
    selectedVersion: 1,
  },
  {
    id: 'b5',
    bulletNumber: 5,
    dimension: 'ACTION VERBS',
    deltaPercent: 50,
    company: 'MediaCorp',
    originalText:
      'Envisioned & launched 15 features to increase NPS Score by 17 points YoY and daily engagement rate by 45%.',
    versions: [
      {
        version: 1,
        text: 'Conceptualized and shipped 15 product features that lifted NPS by 17 points and daily engagement by 45% YoY, directly contributing to a 30% reduction in subscriber churn.',
        score: 9.1,
        isBest: true,
      },
      {
        version: 2,
        text: 'Launched 15 engagement-driving features that improved NPS Score by 17 points year-over-year and increased daily user engagement rate by 45%.',
        score: 8.2,
        isBest: false,
      },
    ],
    selectedVersion: 1,
  },
  {
    id: 'b6',
    bulletNumber: 6,
    dimension: 'QUANTIFICATION',
    deltaPercent: 40,
    company: 'GrowthLab',
    originalText:
      'Built end-to-end billing platform to enable internal teams, Revamped product strategy and led 3 direct reports to increase user adoption by 50% MoM and revenue by 65% YoY while improving gross margins by 25%.',
    versions: [
      {
        version: 1,
        text: 'Architected end-to-end billing platform and revamped product strategy with a 3-person team, driving 50% MoM user adoption growth, 65% YoY revenue increase ($8M), and 25% gross margin improvement.',
        score: 9.3,
        isBest: true,
      },
      {
        version: 2,
        text: 'Built a billing platform from scratch and led product strategy overhaul, resulting in 50% monthly user adoption growth and 65% annual revenue increase while improving gross margins by 25%.',
        score: 8.5,
        isBest: false,
      },
    ],
    selectedVersion: 1,
  },
];

// ── Aggregate scores ───────────────────────────────────────

export const mockOriginalScore = 6.2;
export const mockEnhancedScore = 8.9;
