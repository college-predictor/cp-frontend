import { NextRequest, NextResponse } from 'next/server';

// GET /api/colleges/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collegeId = params.id;

    // TODO: Replace with actual database call
    // const college = await db.colleges.findById(collegeId);

    // Mock data for demonstration
    const data = {
      id: parseInt(collegeId),
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      established: 1961,
      type: 'Public' as const,
      category: 'Engineering',
      location: {
        address: 'Hauz Khas, New Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110016',
        coordinates: { lat: 28.5449, lng: 77.1929 }
      },
      contact: {
        phone: ['+91-11-2659-1999', '+91-11-2659-1000'],
        email: ['info@iitd.ac.in', 'admissions@iitd.ac.in'],
        website: 'https://www.iitd.ac.in',
        admissionHelpline: '+91-11-2659-1945'
      }
    };

    return NextResponse.json({
      status: true,
      data
    });
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch college data',
        data: null
      },
      { status: 500 }
    );
  }
}
