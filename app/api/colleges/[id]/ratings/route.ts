import { NextRequest, NextResponse } from 'next/server';

// GET /api/colleges/[id]/ratings
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collegeId = params.id;

    // TODO: Replace with actual database call
    // const ratings = await db.ratings.findByCollegeId(collegeId);

    const data = {
      overall: 4.8,
      academics: 4.9,
      infrastructure: 4.7,
      faculty: 4.8,
      placement: 4.9,
      hostelLife: 4.5,
      socialLife: 4.6,
      totalReviews: 2453
    };

    return NextResponse.json({
      status: true,
      data
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch ratings',
        data: null
      },
      { status: 500 }
    );
  }
}
