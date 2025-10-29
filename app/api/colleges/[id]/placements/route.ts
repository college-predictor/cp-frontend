import { NextRequest, NextResponse } from 'next/server';

// GET /api/colleges/[id]/placements
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collegeId = params.id;

    // TODO: Replace with actual database call
    const data = {
      averagePackage: '₹25 LPA',
      highestPackage: '₹2.1 Cr',
      placementRate: 95,
      medianPackage: '₹23 LPA',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Flipkart'],
      internationalOffers: 32,
      salaryTrends: [
        { year: 2024, average: '₹25 LPA', highest: '₹2.1 Cr', placementRate: 95 },
        { year: 2023, average: '₹24 LPA', highest: '₹1.8 Cr', placementRate: 94 },
        { year: 2022, average: '₹22 LPA', highest: '₹1.6 Cr', placementRate: 92 },
        { year: 2021, average: '₹20 LPA', highest: '₹1.4 Cr', placementRate: 90 }
      ],
      sectorDistribution: [
        { sector: 'Technology & Product', percentage: 42 },
        { sector: 'Consulting & Strategy', percentage: 21 },
        { sector: 'Finance & Analytics', percentage: 16 },
        { sector: 'Core Engineering', percentage: 14 },
        { sector: 'Research & Higher Studies', percentage: 7 }
      ],
      internshipStats: {
        totalInternships: 780,
        ppoRate: 68,
        globalInternships: 94,
        averageStipend: '₹1.5 LPM'
      },
      placementProcess: [
        'Pre-placement talks and company registrations open in August.',
        'Students shortlist companies and submit resumes for profile-based shortlisting.',
        'Aptitude tests, group discussions, and technical interviews run from November.',
        'Final placement interviews are conducted in multiple slots through December and January.'
      ],
      successStories: [
        {
          name: 'Ishaan Malhotra',
          company: 'Google Mountain View',
          package: '$265K',
          role: 'Software Engineer',
          story: 'Secured a role through the international placement drive after leading projects at the Analytics Club and winning the ACM ICPC regionals.'
        },
        {
          name: 'Megha Rao',
          company: 'McKinsey & Company',
          package: '₹42 LPA',
          role: 'Business Analyst',
          story: 'Converted a pre-placement offer following a summer internship where she co-authored a digital transformation roadmap for a Fortune 100 client.'
        }
      ]
    };

    return NextResponse.json({
      status: true,
      data
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch placement data',
        data: null
      },
      { status: 500 }
    );
  }
}
