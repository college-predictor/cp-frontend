import { NextRequest, NextResponse } from 'next/server';

// GET /api/colleges/[id]/placements/branches
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collegeId = params.id;

    // TODO: Replace with actual database call
    const data = {
      branches: [
        {
          name: 'Computer Science & Engineering',
          averagePackage: '₹32 LPA',
          medianPackage: '₹29 LPA',
          highestPackage: '₹2.1 Cr',
          placementRate: 99,
          offers: 210,
          topRoles: ['Software Engineer', 'AI/ML Engineer', 'Product Manager'],
          recruiters: ['Google', 'Microsoft', 'Apple', 'LinkedIn']
        },
        {
          name: 'Electrical Engineering',
          averagePackage: '₹24 LPA',
          medianPackage: '₹22 LPA',
          highestPackage: '₹78 LPA',
          placementRate: 96,
          offers: 185,
          topRoles: ['Hardware Engineer', 'Energy Consultant', 'Analog Design Engineer'],
          recruiters: ['Texas Instruments', 'Qualcomm', 'Samsung', 'GE']
        },
        {
          name: 'Mechanical Engineering',
          averagePackage: '₹18 LPA',
          medianPackage: '₹16 LPA',
          highestPackage: '₹52 LPA',
          placementRate: 93,
          offers: 160,
          topRoles: ['Manufacturing Engineer', 'Automotive R&D Engineer', 'Supply Chain Analyst'],
          recruiters: ['Bosch', 'Mahindra', 'Rolls-Royce', 'Tata Motors']
        }
      ]
    };

    return NextResponse.json({
      status: true,
      data
    });
  } catch (error) {
    console.error('Error fetching branch placements:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch branch placement data',
        data: null
      },
      { status: 500 }
    );
  }
}
