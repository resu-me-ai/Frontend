import type { ResumeDocumentData } from '@/types/resume';

export const mockResumeDocument: ResumeDocumentData = {
  resume_overview: {
    full_name: 'RALPH BAUTISTA',
    contact_line: 'Toronto, ON | (416) 555-0123 | ralph@email.com | linkedin.com/in/ralphb',
    parsed_contact: {
      location: 'Toronto, ON',
      phone: '(416) 555-0123',
      email: 'ralph@email.com',
      linkedin_url: 'linkedin.com/in/ralphb',
    },
  },
  resume_sections: [
    {
      header: 'PROFESSIONAL SUMMARY',
      section_type: 'summary',
      section_index: 0,
      content: [
        { bullet_index: 0, text: '15 years of product management experience in high profile B2B/B2C products with $50M-$1B in yearly revenue' },
        { bullet_index: 1, text: 'Advanced skillset in converting university students into banking customers via Instagram advertisements, student-friendly copywriting, student journey mapping & educational lead magnets & online financial tools.' },
        { bullet_index: 2, text: 'CEO Leadership Award winner at XYZ Corp for developing brand leaders & managing cross-functional teams to define brand strategy, collaboration process & success metrics for flawless execution of top brand priorities.' },
        { bullet_index: 3, text: 'Education: Bachelor of Commerce (University of Toronto, 2006, 3.85 GPA)' },
      ],
    },
    {
      header: 'CAREER EXPERIENCE & ACHIEVEMENTS',
      section_type: 'experience',
      section_index: 1,
      content: [
        {
          role_index: 0,
          title: 'Director, Product Management',
          company: 'StreamTech Inc.',
          company_context: 'e-commerce Platform, Baseball Live, Disney Now',
          date_range: 'March 2019-Present',
          achievements_line: 'Built product/engineering organization of 30 personnel; increased revenue by 200% ($45MM)',
          bullets: [
            { bullet_index: 0, text: 'Manage $25M portfolio of high-profile sports-stream products to serve 8M monthly users of StreamTech platform.' },
            { bullet_index: 1, text: 'Launched & manage e-commerce subscription platform with five cross-functional engineering teams to build 80+ features across the entire customer journey for internal stakeholders & external partners.' },
            { bullet_index: 2, text: 'Hired, developed, and mentored seven high-performing brand managers and built a highly collaborative product/engineering organization, & team culture that raises the performance bar for the rest of the company.' },
            { bullet_index: 3, text: 'Increase product-portfolio revenue by 300%, decreased customer complaints by 8X and churn by 60% YoY.' },
            { bullet_index: 4, text: 'Launched & manage Strategy Steerco, Brand Innovation Think Tank, Data Steerco & Product Forums to drive cross-functional platform roadmaps & flawless product execution on company\'s top product priorities.' },
          ],
        },
        {
          role_index: 1,
          title: 'Senior Product Manager',
          company: 'MediaCorp',
          company_context: 'e-commerce Platform, Sports Live, Streaming Services',
          date_range: 'March 2016-February 2019',
          achievements_line: 'Launched Major world cup streaming experience; improved engagement rate by 45%; reduced cost by 15%',
          bullets: [
            { bullet_index: 0, text: 'Manage Brand name partnership at SVP executive level; built brand roadmap, product strategy & product development of major sports streaming apps across web, mobile (iOS, Android) & connected devices (consoles).' },
            { bullet_index: 1, text: 'Gained buy-in of product priorities from executive team; led four agile technical teams, 8 direct reports, two UX research teams & 10+ cross-functional teams to define brand strategy, collaboration process & success metrics.' },
            { bullet_index: 2, text: 'Envisioned & launched 15 features to increase NPS Score by 17 points YoY and daily engagement rate by 45%.' },
          ],
        },
        {
          role_index: 2,
          title: 'Head of Product and Partnerships',
          company: 'GrowthLab',
          company_context: 'B2B, B2C products',
          date_range: 'March 2014-March 2016',
          achievements_line: 'Increased user adoption by 30%; grew sales from $12MM per year to $20MM per year in 18 months',
          bullets: [
            { bullet_index: 0, text: 'Built end-to-end billing platform to enable internal teams, Revamped product strategy and led 3 direct reports to increase user adoption by 50% MoM and revenue by 65% YoY while improving gross margins by 25%.' },
            { bullet_index: 1, text: 'Launched new market verticals & features, conducted ethnographic research, A/B tested to reduce user churn while increasing annual revenue by 65% ($8MM), user adoption across mobile apps by 30%, and DAU by 20%.' },
          ],
        },
        {
          role_index: 3,
          title: 'Startup Founder/CEO',
          company: 'LaunchPad Technologies',
          company_context: 'Sold at $4M valuation',
          date_range: 'March 2010-February 2014',
          achievements_line: 'Pivoted start-up from a failing product to an innovative B2C product with a multi-million-dollar exit',
          bullets: [
            { bullet_index: 0, text: 'Launched the world\'s first social commerce platform for e-commerce businesses. Scaled to 15M monthly end users & 1,000+ monthly paid clients. Led a team of 40 startup employees and sold the company to a digital media conglomerate.' },
            { bullet_index: 1, text: 'Increased conversions, engagements, retention rate, and revenue per month & user by conducting A/B testing on the user experience path, competitive analysis & sales funnel and building in-product engagement loops.' },
          ],
        },
      ],
    },
    {
      header: 'EARLY WORK EXPERIENCES (2006-2012)',
      section_type: 'early_experience',
      section_index: 2,
      content: [
        { bullet_index: 0, text: '2008-2012: Served as a consultant to launched New York\'s first transit card (hardware/ecommerce) for 5M users.' },
        { bullet_index: 1, text: '2006-2008: Launched helpline for teenagers in America. Grew to 500 calls/day & 20 therapists in 18 months.' },
      ],
    },
  ],
};
