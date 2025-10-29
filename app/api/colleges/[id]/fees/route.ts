import { NextRequest, NextResponse } from 'next/server';

// GET /api/colleges/[id]/fees
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collegeId = params.id;

    // TODO: Replace with actual database call
    const data = {
      tuition: '₹2,50,000',
      hostel: '₹25,000',
      other: '₹15,000',
      total: '₹2,90,000'
    };

    return NextResponse.json({
      status: true,
      data
    });
  } catch (error) {
    console.error('Error fetching fees:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch fees',
        data: null
      },
      { status: 500 }
    );
  }
}
